package com.axis.loan.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.core.io.ByteArrayResource;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.axis.enumloan.AccountType;
import com.axis.enumloan.InterestOnLoanType;
import com.axis.enumloan.LoanStatus;
import com.axis.enumloan.LoanType;
import com.axis.enumloan.TransactionStatus;
import com.axis.enumloan.TransactionType;
import com.axis.enumloan.WorkType;
import com.axis.loan.exception.AccountNotExist;
import com.axis.loan.exception.LoanNotExist;
import com.axis.loan.exception.UserNotFoundException;
import com.axis.loan.model.Account;
import com.axis.loan.model.Loan;
import com.axis.loan.model.LoanEMI;
import com.axis.loan.model.LoanEmiPdfExporter;
import com.axis.loan.model.LoanRequiredDocument;
import com.axis.loan.model.Transaction;
import com.axis.loan.model.User;
import com.axis.loan.repository.AccountRepository;
import com.axis.loan.repository.LoanDocumentRepository;
import com.axis.loan.repository.LoanRepository;
import com.axis.loan.repository.TransactionRepository;
import com.axis.loan.repository.UserRepository;
import com.lowagie.text.DocumentException;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
@Transactional
public class LoanServiceImpl implements LoanService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private HttpServletResponse response;

	@Autowired
	private LoanRepository loanRepo;

	@Autowired
	private LoanDocumentRepository documentRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private TransactionRepository transactionRepo;

	private final static String ACCOUNT_SID = "AC1cecd3ef71a992f701ac479d5a5fc29e";
	private final static String AUTH_TOKEN = "05f8cf53e8a21586700e7005f0da9085";

	static {
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}

	public String sendWhatsAppMessage(String to, String from, String message) {
		System.out.println(to);
		System.out.println(from);
		System.out.println(message);
		Message.creator(new PhoneNumber("whatsapp:" + to), new PhoneNumber("whatsapp:" + from), message).create();
		return "Message sent Successfully....";
	}

	@Autowired
	private JavaMailSender mailSender;
	@Value("${spring.mail.username}")
	private String sender;

	public String sendMail(String toEmail, String subject, String body) {
		try {

			// Creating a simple mail message object
			SimpleMailMessage emailMessage = new SimpleMailMessage();

			// Setting up necessary details of mail
			emailMessage.setFrom(sender);
			emailMessage.setTo(toEmail);
			emailMessage.setSubject(subject);
			emailMessage.setText(body);

			// Sending the email
			mailSender.send(emailMessage);
			return "Email has been sent successfully...";
		}

		// Catch block to handle the exceptions
		catch (Exception e) {
			return "Error while Sending email!!!";
		}
	}

	public String sendEmailWithAttachment(String recipientEmail, String subject, String message,
			String attachmentFilePath) {
		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

			helper.setTo(recipientEmail);
			helper.setSubject(subject);
			helper.setText(message);

			Path path = Paths.get(attachmentFilePath);
			String fileName = path.getFileName().toString();
			byte[] attachmentBytes = Files.readAllBytes(path);

			helper.addAttachment(fileName, new ByteArrayResource(attachmentBytes));

			mailSender.send(mimeMessage);
			return "Email has been sent successfully...";
		} catch (Exception e) {
			return "Error while Sending email!!!";
		}
	}

	@Override
	public String getCurrentLoginUser() {

		return (String) request.getAttribute("username");
	}

	public boolean checkValidAccount(Long accountNumber) {

		User fecthedUser = userRepo.findByEmailId(getCurrentLoginUser());
		List<Account> fecthedAccount = accountRepo.findByUserAccount(fecthedUser);
		for (Account account : fecthedAccount) {
			if (account.getAccountNumber().equals(accountNumber)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public String applyForNewLoan(Loan loan) throws AccountNotExist {
		boolean accountCheck = checkValidAccount(loan.getRequiredDocument().getCustomerAccountNumber());
		if (accountCheck == true) {
			User user = userRepo.findByEmailId(getCurrentLoginUser());
			LoanRequiredDocument loanDocument = new LoanRequiredDocument();
			loanDocument.setCustomerFirstName(user.getUserFirstName());
			loanDocument.setCustomerLastName(user.getUserLastName());
			loanDocument.setCustomerPhoneNumber(user.getUserPhoneNumber());
			loanDocument.setCustomerEmailId(user.getEmailId());
			loanDocument.setAadharCardNumber(loan.getRequiredDocument().getAadharCardNumber());
			loanDocument.setPanCard(loan.getRequiredDocument().getPanCard());
			loanDocument.setCustomerAccountNumber(loan.getRequiredDocument().getCustomerAccountNumber());
			loanDocument.setMonthlyEarning(loan.getRequiredDocument().getMonthlyEarning());
			if (loan.getRequiredDocument().getWorkType().equals(WorkType.SERVICE)) {
				loanDocument.setWorkType(WorkType.SERVICE);
			} else {
				loanDocument.setWorkType(WorkType.BUSINESS);
			}
			documentRepo.save(loanDocument);
			loan.setRequiredDocument(loanDocument);
			loan.setApplicationDate(LocalDateTime.now());
			loan.setLoanStatus(LoanStatus.PENDING);
			if (loan.getLoanType().equals(LoanType.CAR_LOAN)) {
				loan.setRateOfInterest(InterestOnLoanType.CAR_LOAN.getInterestRate());
			} else if (loan.getLoanType().equals(LoanType.BUSINESS_LOAN)) {
				loan.setRateOfInterest(InterestOnLoanType.BUSINESS_LOAN.getInterestRate());
			} else if (loan.getLoanType().equals(LoanType.EDUCATION_LOAN)) {
				loan.setRateOfInterest(InterestOnLoanType.EDUCATION_LOAN.getInterestRate());
			} else if (loan.getLoanType().equals(LoanType.GOLD_LOAN)) {
				loan.setRateOfInterest(InterestOnLoanType.GOLD_LOAN.getInterestRate());
			} else if (loan.getLoanType().equals(LoanType.HOME_LOAN)) {
				loan.setRateOfInterest(InterestOnLoanType.HOME_LOAN.getInterestRate());
			} else {
				return "Loan Type Does Not Available Right Now!!";
			}
			loanRepo.save(loan);
			sendMail(getCurrentLoginUser(), "Apna Bank-" + loan.getLoanType() + " Notification", "Dear "
					+ loan.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
					+ "Thank you for applying for Apna Bank " + loan.getLoanType() + " .\r\n" + "\r\n" + "The "
					+ loan.getLoanType() + " Application form " + loan.getLoanId()
					+ " has been accepted and sent for further processing. The application will be processed within <2> days of receipt of completed application form along with mandatory documents as per checklist.\r\n"
					+ "For further details on your application, please contact your Apna Bank Representative for "
					+ loan.getLoanType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n" + "Sincerely,\r\n"
					+ "\r\n" + "Team Apna Bank");
			sendWhatsAppMessage("+91" + loan.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886", "Dear "
					+ loan.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
					+ "Thank you for applying for Apna Bank " + loan.getLoanType() + " .\r\n" + "\r\n" + "The "
					+ loan.getLoanType() + " Application form " + loan.getLoanId()
					+ " has been accepted and sent for further processing. The application will be processed within <2> days of receipt of completed application form along with mandatory documents as per checklist.\r\n"
					+ "For further details on your application, please contact your Apna Bank Representative for "
					+ loan.getLoanType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n" + "Sincerely,\r\n"
					+ "\r\n" + "Team Apna Bank");

			return "Applied Successfully";
		} else {
			throw new AccountNotExist("Account Does Not Exists!!!");
		}

	}

	@Override
	public Loan getLoanById(Long loanId) throws LoanNotExist {
		Loan loan = loanRepo.findById(loanId).get();
		boolean accountCheck = checkValidAccount(loan.getRequiredDocument().getCustomerAccountNumber());
		if (accountCheck == false) {
			throw new LoanNotExist("Loan Does Not Exists!!!");
		}
		return loan;
	}

	@Override
	public List<Loan> getLoanByStatus(LoanStatus loanStatus) throws LoanNotExist {
		List<Loan> loan = loanRepo.findByLoanStatus(loanStatus);
		if (loan == null) {
			throw new LoanNotExist("Loan Does Not Exists!!!");
		}
		return loan;
	}

	@Override
	public String approveOrRejectOrClosedLoan(Loan loan, Long loanId)
			throws LoanNotExist, DocumentException, IOException {
		Loan userLoan = loanRepo.findById(loanId).get();
		if (userLoan == null) {
			throw new LoanNotExist("Loan Does Not Exists!!!");
		}
		if (loan.getLoanStatus().equals(LoanStatus.REJECTED)) {
			userLoan.setLoanStatus(LoanStatus.REJECTED);
			loanRepo.save(userLoan);
			return "Rejected";
		} else if (loan.getLoanStatus().equals(LoanStatus.PENDING)) {
			userLoan.setLoanStatus(LoanStatus.PENDING);
			loanRepo.save(userLoan);
			return "We will consider your Loan Application in Future!!";
		} else if (loan.getLoanStatus().equals(LoanStatus.CLOSED)) {
			userLoan.setLoanStatus(LoanStatus.CLOSED);
			loanRepo.save(userLoan);
			return "Loan Closed";
		} else {
			userLoan.setApprovalDate(LocalDateTime.now());
			userLoan.setLoanStatus(LoanStatus.ACTIVE);
			userLoan.setLoanAmount(loan.getLoanAmount());
			userLoan.setRemainingLoanAmount(loan.getLoanAmount());
			userLoan.setLoanStartDate(LocalDate.now());
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			LocalDate dateFromString = LocalDate.parse(loan.getLoanEndDate(), formatter);

			LocalDate currentDate = LocalDate.now();

			int monthDifference = (int) ChronoUnit.MONTHS.between(currentDate, dateFromString);

			userLoan.setLoanEndDate(loan.getLoanEndDate());

			double rate = loan.getRateOfInterest() / (12 * 100);
			int time = monthDifference;
			double emi = (loan.getLoanAmount() * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
			userLoan.setMonthyEMI((int) emi);
			userLoan.setNoOfInstallements(monthDifference);
			userLoan.setRateOfInterest(loan.getRateOfInterest());
			loanRepo.save(userLoan);
//			List<LoanEMI> emiHistory = new ArrayList<>();
//
//	        double monthlyInterestRate =  loan.getRateOfInterest() / 100 / 12;
//	        double emiOfLoan = (loan.getLoanAmount() * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthDifference))
//	                / (Math.pow(1 + monthlyInterestRate, monthDifference) - 1);
//
//	        double remainingBalance = loan.getLoanAmount();
//	        for (int month = 1; month <= monthDifference; month++) {
//	            double interest = remainingBalance * monthlyInterestRate;
//	            double principal = loan.getLoanAmount() ;
//	            double totalPayment = (int)emiOfLoan;
//	            remainingBalance -= totalPayment;
//
//	            LoanEMI emiEntry = new LoanEMI(userLoan.getLoanId(),month, (int)principal, (int)interest, (int)totalPayment, (int)remainingBalance);
//	            emiHistory.add(emiEntry);
//	        }
//			for(LoanEMI emiList : emiHistory) {
//				System.out.println(emiList);
//			}
			

		}
		response.setContentType("application/pdf");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=users_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);

		List<LoanEMI> listofLoanEmi = getPdfOfLoanByLoanId(userLoan.getLoanId());

		LoanEmiPdfExporter exporter = new LoanEmiPdfExporter(listofLoanEmi);
		File exportedFile = exporter.export();
		System.out.println(exportedFile.getAbsolutePath());
		sendEmailWithAttachment(userLoan.getRequiredDocument().getCustomerEmailId(),
				"Apna Bank-" + userLoan.getLoanType() + " Notification",
				"Dear " + userLoan.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
						+ "Thank you for applying for Apna Bank " + userLoan.getLoanType() + " .\r\n" + "\r\n"
						+ "The " + userLoan.getLoanType() + " Application form " + userLoan.getLoanId()
						+ " for Amount " + loan.getLoanAmount() + " has been Approved."
						+ "For further details on your application, please contact your Apna Bank Representative for "
						+ userLoan.getLoanType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
						+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank",
				exportedFile.getAbsolutePath());
		exportedFile.delete();
		sendWhatsAppMessage("+91" + userLoan.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886",
				"Dear " + userLoan.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
						+ "Thank you for applying for Apna Bank " + userLoan.getLoanType() + " .\r\n" + "\r\n" + "The "
						+ userLoan.getLoanType() + " Application form " + userLoan.getLoanId() + " for Amount "
						+ loan.getLoanAmount() + " has been Approved."
						+ "For further details on your application, please contact your Apna Bank Representative for "
						+ userLoan.getLoanType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
						+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");
		return userLoan.getLoanType() + " Approved";
	}

	public List<Loan> getLoanByType(LoanType loanType) throws LoanNotExist {
		List<Loan> loan = loanRepo.findByLoanType(loanType);
		if (loan == null) {
			throw new LoanNotExist("Loan Does Not Exists!!!");
		}
		return loan;
	}

	@Override
	public String loanRepayment(Long loanId) throws LoanNotExist {
		try {
			Loan loan = loanRepo.findById(loanId).get();
			boolean accountCheck = checkValidAccount(loan.getRequiredDocument().getCustomerAccountNumber());
			if (accountCheck == true) {
				Transaction userTransaction = new Transaction();
				Account userAccount = accountRepo
						.findByAccountNumber(loan.getRequiredDocument().getCustomerAccountNumber());
				if (userAccount.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)
						&& (userAccount.getAvailableBalance() > loan.getMonthyEMI()
								&& userAccount.getAvailableBalance() - loan.getMonthyEMI() >= 1000)) {
					loan.setRemainingLoanAmount(loan.getRemainingLoanAmount() - loan.getMonthyEMI());
					loan.setNoOfInstallements(loan.getNoOfInstallements() - 1);
					System.out.println();
					userAccount.setAvailableBalance(userAccount.getAvailableBalance() - loan.getMonthyEMI());
					userTransaction.setAmount(loan.getMonthyEMI());
					userTransaction.setCustomerAccountNumber(loan.getRequiredDocument().getCustomerAccountNumber());
					userTransaction.setCustomerUserName(getCurrentLoginUser());
					userTransaction.setInitiationDate(LocalDateTime.now());
					userTransaction.setTargetAccountNumber(11210067);
					userTransaction.setTargetOwnerName("APNA_BANK");
					userTransaction.setTargetIFSCCode("APNA0000667");
					userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
					userTransaction.setTransactionType(TransactionType.DEBITED);
					userTransaction.setTransactionNote(loan.getLoanType().toString());
					transactionRepo.save(userTransaction);
					accountRepo.save(userAccount);
					loanRepo.save(loan);
				} else if (userAccount.getAccountType().equals(AccountType.CURRENT_ACCOUNT)
						&& (userAccount.getAvailableBalance() > loan.getMonthyEMI()
								&& userAccount.getAvailableBalance() - loan.getMonthyEMI() >= 10000)) {
					loan.setRemainingLoanAmount(loan.getLoanAmount() - loan.getMonthyEMI());
					loan.setNoOfInstallements(loan.getNoOfInstallements() - 1);
					userAccount.setAvailableBalance(userAccount.getAvailableBalance() - loan.getMonthyEMI());
					userTransaction.setAmount(loan.getMonthyEMI());
					userTransaction.setCustomerAccountNumber(loan.getRequiredDocument().getCustomerAccountNumber());
					userTransaction.setCustomerUserName(getCurrentLoginUser());
					userTransaction.setInitiationDate(LocalDateTime.now());
					userTransaction.setTargetAccountNumber(11210067);
					userTransaction.setTargetOwnerName("APNA_BANK");
					userTransaction.setTargetIFSCCode("APNA0000667");
					userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
					userTransaction.setTransactionType(TransactionType.DEBITED);
					userTransaction.setTransactionNote(loan.getLoanType().toString());
					transactionRepo.save(userTransaction);
					accountRepo.save(userAccount);
					loanRepo.save(loan);
				} else {
					return "Insufficient Balance";
				}
				sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear "
						+ loan.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
						+ loan.getMonthyEMI() + " has been debited from A/c no. "
						+ loan.getRequiredDocument().getCustomerAccountNumber() + " on " + LocalDateTime.now()
						+ " IST. Info- " + loan.getLoanType() + ".\r\n" + "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
				sendWhatsAppMessage("+91" + loan.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886", "Dear "
						+ loan.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
						+ loan.getMonthyEMI() + " has been debited from A/c no. "
						+ loan.getRequiredDocument().getCustomerAccountNumber() + " on " + LocalDateTime.now()
						+ " IST. Info- " + loan.getLoanType() + ".\r\n" + "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
				return "Loan Payment Successfull.....";
			} else {
				throw new LoanNotExist("Loan Does Not Exists!!!");
			}

		} catch (LoanNotExist e) {
			throw new LoanNotExist("Loan Does Not Exists!!!");
		}
	}

//	@Override
//	public List<Loan> getListOfLoan() throws LoanNotExist {
//		try {
//			LoanRequiredDocument userDocument = documentRepo.findByCustomerEmailId(getCurrentLoginUser());
//			List<Loan> listOfLoan = loanRepo.findByRequiredDocument(userDocument);
//			return listOfLoan;
//
//		} catch (Exception e) {
//			throw new LoanNotExist("Loan Does Not Exists!!!!");
//		}
//	}

	@Override
	public List<Loan> getListOfLoanForCurrentUser() throws LoanNotExist {
		try {
			List<LoanRequiredDocument> userDocuments = documentRepo.findByCustomerEmailId(getCurrentLoginUser());
			if (userDocuments.isEmpty()) {

				throw new LoanNotExist("No Loan Required Documents found for the current user!");
			}

			List<Loan> listOfLoans = new ArrayList();

			for (LoanRequiredDocument userDocument : userDocuments) {
				List<Loan> loanForDocument = loanRepo.findByRequiredDocument(userDocument);
				listOfLoans.addAll(loanForDocument);
			}

			return listOfLoans;
		} catch (Exception e) {
			throw new LoanNotExist("Loans Does Not Exist!!!!");
		}
	}

	@Override
	public List<LoanEMI> getPdfOfLoanByLoanId(long loanId) throws LoanNotExist {
		Loan loan = loanRepo.findById(loanId).get();
		List<LoanEMI> emiHistory = new ArrayList<>();

		double monthlyInterestRate = loan.getRateOfInterest() / 100 / 12;
		double rate = loan.getRateOfInterest() / (12 * 100);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate loanEndDate = LocalDate.parse(loan.getLoanEndDate(), formatter);
		LocalDate loanStartDate = loan.getLoanStartDate();
		int monthDifference = (int) ChronoUnit.MONTHS.between(loanStartDate, loanEndDate);
		int time = monthDifference;
		double emiOfLoan = (loan.getLoanAmount() * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
		

		double remainingBalance = loan.getLoanAmount();
		for (int month = 0; month < monthDifference; month++) {
			double interest = remainingBalance * monthlyInterestRate;
			double principal = emiOfLoan -interest;
			double totalPayment = (int) emiOfLoan;
			remainingBalance -= principal;

			LoanEMI emiEntry = new LoanEMI(loan.getLoanId(), loan.getLoanStartDate().plusMonths((long)month), (int) principal, (int) interest, (int) totalPayment,
					(int) remainingBalance);
			emiHistory.add(emiEntry);
		}

		return emiHistory;

	}

}
