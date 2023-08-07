package com.axis.creditcard.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.axis.creditcard.exception.AccountNotExist;
import com.axis.creditcard.exception.CreditCardNotExist;
import com.axis.creditcard.model.Account;
import com.axis.creditcard.model.CreditCard;
import com.axis.creditcard.model.CreditCardRequiredDocument;
import com.axis.creditcard.model.CreditCardTransaction;
import com.axis.creditcard.model.Transaction;
import com.axis.creditcard.model.User;
import com.axis.creditcard.repository.AccountRepository;
import com.axis.creditcard.repository.CreditCardDocumentRepository;
import com.axis.creditcard.repository.CreditCardRepository;
import com.axis.creditcard.repository.CreditCardTransactionRepository;
import com.axis.creditcard.repository.TransactionRepository;
import com.axis.creditcard.repository.UserRepository;
import com.axis.enumcreditcard.AccountType;
import com.axis.enumcreditcard.CardAnnualFees;
import com.axis.enumcreditcard.CardJoiningFees;
import com.axis.enumcreditcard.CreditCardStatus;
import com.axis.enumcreditcard.CreditCardType;
import com.axis.enumcreditcard.TransactionStatus;
import com.axis.enumcreditcard.TransactionType;
import com.axis.enumcreditcard.WorkType;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class CreditCardServiceImpl implements CreditCardService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private CreditCardDocumentRepository documentRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private TransactionRepository transactionRepo;

	@Autowired
	private CreditCardRepository creditCardRepo;

	@Autowired
	private CreditCardTransactionRepository creditTransactionRepo;

	private Random random;

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

	public String generateRandomNumber(int length) {
		Random random = new Random();
		StringBuilder sb = new StringBuilder(length);

		for (int i = 0; i < length; i++) {
			int digit = random.nextInt(10);
			sb.append(digit);
		}

		return sb.toString();
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
	public String applyForNewCreditCard(CreditCard creditCard) throws AccountNotExist {

		boolean accountCheck = checkValidAccount(creditCard.getRequiredDocument().getCustomerAccountNumber());
		if (accountCheck == true) {
			User user = userRepo.findByEmailId(getCurrentLoginUser());
			CreditCardRequiredDocument creditCardDocument = new CreditCardRequiredDocument();
			creditCardDocument.setCustomerFirstName(user.getUserFirstName());
			creditCardDocument.setCustomerLastName(user.getUserLastName());
			creditCardDocument.setCustomerPhoneNumber(user.getUserPhoneNumber());
			creditCardDocument.setCustomerEmailId(user.getEmailId());
			creditCardDocument.setAadharCardNumber(creditCard.getRequiredDocument().getAadharCardNumber());
			creditCardDocument.setPanCard(creditCard.getRequiredDocument().getPanCard());
			creditCardDocument.setCustomerAccountNumber(creditCard.getRequiredDocument().getCustomerAccountNumber());
			creditCardDocument.setMonthlyEarning(creditCard.getRequiredDocument().getMonthlyEarning());
			if (creditCard.getRequiredDocument().getWorkType().equals(WorkType.SERVICE)) {
				creditCardDocument.setWorkType(WorkType.SERVICE);
			} else {
				creditCardDocument.setWorkType(WorkType.BUSINESS);
			}
			documentRepo.save(creditCardDocument);
			creditCard.setRequiredDocument(creditCardDocument);
			creditCard.setApplicationDate(LocalDateTime.now());
			creditCard.setCreditCardStatus(CreditCardStatus.PENDING);
			creditCardRepo.save(creditCard);
			sendMail(getCurrentLoginUser(), "Apna Bank- " + creditCard.getCreditCardType() + " Notification", "Dear "
					+ creditCard.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
					+ "Thank you for applying for Apna Bank " + creditCard.getCreditCardType() + " .\r\n" + "\r\n"
					+ "The " + creditCard.getCreditCardType() + " Application form " + creditCard.getCreditCardId()
					+ " has been accepted and sent for further processing. The application will be processed within <2> days of receipt of completed application form along with mandatory documents as per checklist.\r\n"
					+ "For further details on your application, please contact your Apna Bank Representative for "
					+ creditCard.getCreditCardType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
					+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");
			sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear "
					+ creditCard.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
					+ "Thank you for applying for Apna Bank " + creditCard.getCreditCardType() + " .\r\n" + "\r\n"
					+ "The " + creditCard.getCreditCardType() + " Application form " + creditCard.getCreditCardId()
					+ " has been accepted and sent for further processing. The application will be processed within <2> days of receipt of completed application form along with mandatory documents as per checklist.\r\n"
					+ "For further details on your application, please contact your Apna Bank Representative for "
					+ creditCard.getCreditCardType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
					+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");

			return "Applied Successfully";
		} else {
			throw new AccountNotExist("Account Does Not Exists!!!");
		}
	}

	@Override
	public CreditCard getCreditCardById(Long creditCardId) throws CreditCardNotExist {
		CreditCard creditCard = creditCardRepo.findById(creditCardId).get();
		boolean accountCheck = checkValidAccount(creditCard.getRequiredDocument().getCustomerAccountNumber());
		if (accountCheck == false) {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}
		return creditCard;
	}

	@Override
	public List<CreditCard> getCreditCardByType(CreditCardType creditCardType) throws CreditCardNotExist {
		List<CreditCard> creditCard = creditCardRepo.findByCreditCardType(creditCardType);
		if (creditCard == null) {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}
		return creditCard;
	}

	@Override
	public String approveOrRejectOrBlockedOrClosed(CreditCard creditCard, Long creditCardId) throws CreditCardNotExist {
		CreditCard userCreditCard = creditCardRepo.findById(creditCardId).get();
		double cardAvailAmount = 0;
		if (userCreditCard == null) {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}
		if (creditCard.getCreditCardStatus().equals(CreditCardStatus.REJECTED)) {
			userCreditCard.setCreditCardStatus(CreditCardStatus.REJECTED);
			creditCardRepo.save(userCreditCard);
			return "Rejected";
		} else if (creditCard.getCreditCardStatus().equals(CreditCardStatus.PENDING)) {
			userCreditCard.setCreditCardStatus(CreditCardStatus.PENDING);
			creditCardRepo.save(userCreditCard);
			return "We will consider your Credit Card Application in Future!!";
		} else if (creditCard.getCreditCardStatus().equals(CreditCardStatus.CLOSED)) {
			userCreditCard.setCreditCardStatus(CreditCardStatus.CLOSED);
			creditCardRepo.save(userCreditCard);
			return "Credit Card Successfuly Closed";
		} else if (creditCard.getCreditCardStatus().equals(CreditCardStatus.BLOCKED)) {
			userCreditCard.setCreditCardStatus(CreditCardStatus.BLOCKED);
			creditCardRepo.save(userCreditCard);
			return "Credit Card Blocked";
		} else {
			Transaction userTransaction = new Transaction();
			Account userAccount = accountRepo
					.findByAccountNumber(userCreditCard.getRequiredDocument().getCustomerAccountNumber());
			if (userCreditCard.getCreditCardType().equals(CreditCardType.Airtel_Credit_Card)) {
				userCreditCard.setCardAnnualFees(CardAnnualFees.Airtel_Credit_Card.getAnnualFees());
				userCreditCard.setCardJoiningFees(CardJoiningFees.Airtel_Credit_Card.getJoiningFees());
				cardAvailAmount = CardAnnualFees.Airtel_Credit_Card.getAnnualFees()
						+ CardJoiningFees.Airtel_Credit_Card.getJoiningFees();

			} else if (userCreditCard.getCreditCardType().equals(CreditCardType.Flipkart_Credit_Card)) {
				userCreditCard.setCardAnnualFees(CardAnnualFees.Flipkart_Credit_Card.getAnnualFees());
				userCreditCard.setCardJoiningFees(CardJoiningFees.Flipkart_Credit_Card.getJoiningFees());
				cardAvailAmount = CardAnnualFees.Flipkart_Credit_Card.getAnnualFees()
						+ CardJoiningFees.Flipkart_Credit_Card.getJoiningFees();

			} else if (userCreditCard.getCreditCardType().equals(CreditCardType.IndianOil_Credit_Card)) {
				userCreditCard.setCardAnnualFees(CardAnnualFees.IndianOil_Credit_Card.getAnnualFees());
				userCreditCard.setCardJoiningFees(CardJoiningFees.IndianOil_Credit_Card.getJoiningFees());
				cardAvailAmount = CardAnnualFees.IndianOil_Credit_Card.getAnnualFees()
						+ CardJoiningFees.IndianOil_Credit_Card.getJoiningFees();

			} else if (userCreditCard.getCreditCardType().equals(CreditCardType.MyZone_Credit_Card)) {
				userCreditCard.setCardAnnualFees(CardAnnualFees.MyZone_Credit_Card.getAnnualFees());
				userCreditCard.setCardJoiningFees(CardJoiningFees.MyZone_Credit_Card.getJoiningFees());
				cardAvailAmount = CardAnnualFees.MyZone_Credit_Card.getAnnualFees()
						+ CardJoiningFees.MyZone_Credit_Card.getJoiningFees();

			} else if (userCreditCard.getCreditCardType().equals(CreditCardType.Platinum_Credit_Card)) {
				userCreditCard.setCardAnnualFees(CardAnnualFees.Platinum_Credit_Card.getAnnualFees());
				userCreditCard.setCardJoiningFees(CardJoiningFees.Platinum_Credit_Card.getJoiningFees());
				cardAvailAmount = CardAnnualFees.Platinum_Credit_Card.getAnnualFees()
						+ CardJoiningFees.Platinum_Credit_Card.getJoiningFees();

			} else if (userCreditCard.getCreditCardType().equals(CreditCardType.Vistara_Credit_Card)) {
				userCreditCard.setCardAnnualFees(CardAnnualFees.Vistara_Credit_Card.getAnnualFees());
				userCreditCard.setCardJoiningFees(CardJoiningFees.Vistara_Credit_Card.getJoiningFees());
				cardAvailAmount = CardAnnualFees.Vistara_Credit_Card.getAnnualFees()
						+ CardJoiningFees.Vistara_Credit_Card.getJoiningFees();

			} else {
				return "Wrong Credit Card Type!!!..";
			}
			userCreditCard.setApprovalDate(LocalDateTime.now());
			userCreditCard.setCreditCardStatus(CreditCardStatus.ACTIVE);
			userCreditCard.setCreditCardLimit(creditCard.getCreditCardLimit());
			userCreditCard.setValidFrom(LocalDate.now());
			userCreditCard.setValidTo(LocalDate.now().plusYears(5));
			String creditCardNumber = generateRandomNumber(16);
			userCreditCard.setCreditCardNumber(creditCardNumber);
			random = new Random();
			int cvv = random.nextInt(1000);
			userCreditCard.setCardVerificationValue(cvv);
			userAccount.setAvailableBalance(userAccount.getAvailableBalance() - cardAvailAmount);
			userTransaction.setAmount(cardAvailAmount);
			userTransaction.setCustomerAccountNumber(userCreditCard.getRequiredDocument().getCustomerAccountNumber());
			userTransaction.setCustomerUserName(userCreditCard.getRequiredDocument().getCustomerEmailId());
			userTransaction.setInitiationDate(LocalDateTime.now());
			userTransaction.setTargetAccountNumber(11210067);
			userTransaction.setTargetIFSCCode("APNA0000667");
			userTransaction.setTargetOwnerName("APNA_BANK");
			userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
			userTransaction.setTransactionType(TransactionType.DEBITED);
			userTransaction.setTransactionNote("Joining and Annual Fees for:" + userCreditCard.getCreditCardType());
			creditCardRepo.save(userCreditCard);
		}
		sendMail(userCreditCard.getRequiredDocument().getCustomerEmailId(), "Debit Notification From Apna Bank!",
				"Dear " + userCreditCard.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
						+ cardAvailAmount + " has been debited from A/C No. "
						+ userCreditCard.getRequiredDocument().getCustomerAccountNumber() + " on " + LocalDateTime.now()
						+ " IST. Info-Joining And Annual Fees For  " + userCreditCard.getCreditCardType() + ".\r\n"
						+ "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendWhatsAppMessage("+91" + userCreditCard.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886",
				"Dear " + userCreditCard.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
						+ cardAvailAmount + " has been debited from A/C No. "
						+ userCreditCard.getRequiredDocument().getCustomerAccountNumber() + " on " + LocalDateTime.now()
						+ " IST. Info-Joining And Annual Fees For  " + userCreditCard.getCreditCardType() + ".\r\n"
						+ "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendMail(userCreditCard.getRequiredDocument().getCustomerEmailId(),
				"Apna Bank- " + userCreditCard.getCreditCardType() + " Notification",
				"Dear " + userCreditCard.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
						+ "Thank you for applying for Apna Bank " + userCreditCard.getCreditCardType() + " .\r\n"
						+ "\r\n" + "The " + userCreditCard.getCreditCardType() + " Application form "
						+ userCreditCard.getCreditCardId() + " of LIMIT: " + userCreditCard.getCreditCardLimit()
						+ " has been Approved."
						+ "For further details on your application, please contact your Apna Bank Representative for "
						+ userCreditCard.getCreditCardType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
						+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");
		sendWhatsAppMessage("+91" + userCreditCard.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886",
				"Dear " + userCreditCard.getRequiredDocument().getCustomerFirstName() + " ,\r\n" + "\r\n"
						+ "Thank you for applying for Apna Bank " + userCreditCard.getCreditCardType() + " .\r\n"
						+ "\r\n" + "The " + userCreditCard.getCreditCardType() + " Application form "
						+ userCreditCard.getCreditCardId() + " of LIMIT: " + userCreditCard.getCreditCardLimit()
						+ " has been Approved."
						+ "For further details on your application, please contact your Apna Bank Representative for "
						+ userCreditCard.getCreditCardType() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
						+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");
		return userCreditCard.getCreditCardType() + " Approved";
	}

	@Override
	public List<CreditCard> getListOfCreditCard() throws CreditCardNotExist {
		try {
			List<CreditCardRequiredDocument> userDocuments = documentRepo.findByCustomerEmailId(getCurrentLoginUser());
			if (userDocuments.isEmpty()) {

				throw new CreditCardNotExist("No Credit Card Required Documents found for the current user!");
			}

			List<CreditCard> listOfCreditCards = new ArrayList();

			for (CreditCardRequiredDocument userDocument : userDocuments) {
				List<CreditCard> creditCardsForDocument = creditCardRepo.findByRequiredDocument(userDocument);
				listOfCreditCards.addAll(creditCardsForDocument);
			}

			return listOfCreditCards;
		} catch (Exception e) {
			throw new CreditCardNotExist("Credit Card Does Not Exist!!!!");
		}
	}

	@Override
	public List<CreditCard> getCreditCardByStatus(CreditCardStatus creditCardStatus) throws CreditCardNotExist {
		List<CreditCard> creditCard = creditCardRepo.findByCreditCardStatus(creditCardStatus);
		if (creditCard == null) {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}
		return creditCard;
	}

	@Override
	public String withdrawFromCreditCard(CreditCard creditCard, double amount) throws CreditCardNotExist {
		CreditCard userCard = creditCardRepo.findByCreditCardNumber(creditCard.getCreditCardNumber());
		boolean accountCheck = checkValidAccount(userCard.getRequiredDocument().getCustomerAccountNumber());
		if (accountCheck == true) {
			if (userCard.getCreditCardLimit() >= amount) {
				if ((userCard.getCreditCardNumber().equals(creditCard.getCreditCardNumber()))
						&& (userCard.getValidTo().equals(creditCard.getValidTo()))
						&& (userCard.getCardVerificationValue() == creditCard.getCardVerificationValue())) {
					CreditCardTransaction creditTransaction = new CreditCardTransaction();
					userCard.setTotalOutstanding(userCard.getTotalOutstanding() + amount);
					userCard.setCreditCardLimit(userCard.getCreditCardLimit() - amount);
					creditTransaction.setCreditCardNumber(userCard.getCreditCardNumber());
					creditTransaction.setCreditCardNumber(userCard.getCreditCardNumber());
					creditTransaction.setCreditCardType(userCard.getCreditCardType());
					creditTransaction.setTransactionAmount(amount);
					creditTransaction.setUserName(userCard.getRequiredDocument().getCustomerEmailId());
					creditTransaction.setTransactionTime(LocalDateTime.now());
					creditTransaction.setTransactionType(TransactionType.DEBITED);
					creditCardRepo.save(userCard);
					creditTransactionRepo.save(creditTransaction);
					sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear "
							+ userCard.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR " + amount
							+ " has been debited from credit-Card no. " + userCard.getCreditCardNumber() + " on "
							+ LocalDateTime.now() + " IST. Info- " + userCard.getCreditCardType() + ".\r\n" + "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
					sendWhatsAppMessage("+91" + userCard.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886",
							"Dear " + userCard.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
									+ amount + " has been debited from credit-Card no. "
									+ userCard.getCreditCardNumber() + " on " + LocalDateTime.now() + " IST. Info- "
									+ userCard.getCreditCardType() + ".\r\n" + "\r\n"
									+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
									+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n"
									+ "Apna Bank Ltd.");
					return "Payment Successfull";
				} else {
					return "Wrong Credentials!!!...";
				}

			} else {
				return "Insufficient Card Limit";
			}
		} else {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}
	}

	@Override
	public String repaymentOfCreditCard(String creditCardNumber, double customAmount) throws CreditCardNotExist {
		try {
			CreditCard userCard = creditCardRepo.findByCreditCardNumber(creditCardNumber);
			boolean accountCheck = checkValidAccount(userCard.getRequiredDocument().getCustomerAccountNumber());
			if (accountCheck == true) {
				Transaction userTransaction = new Transaction();
				Account userAccount = accountRepo
						.findByAccountNumber(userCard.getRequiredDocument().getCustomerAccountNumber());
				if (userAccount.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)
						&& (userAccount.getAvailableBalance() - customAmount >= 1000)) {
					if (customAmount == userCard.getTotalOutstanding()) {
						userCard.setCreditCardLimit(userCard.getCreditCardLimit() + userCard.getTotalOutstanding());
						userAccount.setAvailableBalance(
								userAccount.getAvailableBalance() - userCard.getTotalOutstanding());
						userTransaction.setAmount(userCard.getTotalOutstanding());
						System.out.println(userCard.getTotalOutstanding() - customAmount);
						userCard.setTotalOutstanding(userCard.getTotalOutstanding() - customAmount);
					} else {
						userCard.setCreditCardLimit(userCard.getCreditCardLimit() + customAmount);
						userAccount.setAvailableBalance(userAccount.getAvailableBalance() - customAmount);
						userTransaction.setAmount(customAmount);
						System.out.println(userCard.getTotalOutstanding() - customAmount);
						userCard.setTotalOutstanding(userCard.getTotalOutstanding() - customAmount);
					}
					userTransaction.setCustomerAccountNumber(userCard.getRequiredDocument().getCustomerAccountNumber());
					userTransaction.setCustomerUserName(getCurrentLoginUser());
					userTransaction.setInitiationDate(LocalDateTime.now());
					userTransaction.setTargetAccountNumber(11210067);
					userTransaction.setTargetOwnerName("APNA_BANK");
					userTransaction.setTargetIFSCCode("APNA0000667");
					userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
					userTransaction.setTransactionType(TransactionType.DEBITED);
					userTransaction.setTransactionNote(userCard.getCreditCardType().toString());
					CreditCardTransaction creditTransaction = new CreditCardTransaction();
					creditTransaction.setCreditCardNumber(userCard.getCreditCardNumber());
					creditTransaction.setCreditCardType(userCard.getCreditCardType());
					creditTransaction.setTransactionAmount(customAmount);
					creditTransaction.setUserName(userCard.getRequiredDocument().getCustomerEmailId());
					creditTransaction.setTransactionTime(LocalDateTime.now());
					creditTransaction.setTransactionType(TransactionType.CREDITED);
					transactionRepo.save(userTransaction);
					accountRepo.save(userAccount);
					creditCardRepo.save(userCard);
					creditTransactionRepo.save(creditTransaction);
				} else if (userAccount.getAccountType().equals(AccountType.CURRENT_ACCOUNT)
						&& (userAccount.getAvailableBalance() - customAmount >= 10000)) {
					if (customAmount == userCard.getTotalOutstanding()) {
						userCard.setCreditCardLimit(userCard.getCreditCardLimit() + userCard.getTotalOutstanding());
						userAccount.setAvailableBalance(
								userAccount.getAvailableBalance() - userCard.getTotalOutstanding());
						userTransaction.setAmount(userCard.getTotalOutstanding());
//						System.out.println(userCard.getTotalOutstanding()-customAmount);
						userCard.setTotalOutstanding(userCard.getTotalOutstanding() - customAmount);
					} else {
						userCard.setCreditCardLimit(userCard.getCreditCardLimit() + customAmount);
						userAccount.setAvailableBalance(userAccount.getAvailableBalance() - customAmount);
						userTransaction.setAmount(customAmount);
//						System.out.println(userCard.getTotalOutstanding() - customAmount);
						userCard.setTotalOutstanding(userCard.getTotalOutstanding() - customAmount);
					}
					userCard.setCreditCardLimit(userCard.getCreditCardLimit() + userCard.getTotalOutstanding());
					userAccount.setAvailableBalance(userAccount.getAvailableBalance() - userCard.getTotalOutstanding());
					userTransaction.setAmount(userCard.getTotalOutstanding());
					userTransaction.setCustomerAccountNumber(userCard.getRequiredDocument().getCustomerAccountNumber());
					userTransaction.setCustomerUserName(getCurrentLoginUser());
					userTransaction.setInitiationDate(LocalDateTime.now());
					userTransaction.setTargetAccountNumber(11210067);
					userTransaction.setTargetOwnerName("APNA_BANK");
					userTransaction.setTargetIFSCCode("APNA0000667");
					userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
					userTransaction.setTransactionType(TransactionType.DEBITED);
					userTransaction.setTransactionNote(userCard.getCreditCardType().toString());
					CreditCardTransaction creditTransaction = new CreditCardTransaction();
					creditTransaction.setCreditCardNumber(userCard.getCreditCardNumber());
					creditTransaction.setCreditCardType(userCard.getCreditCardType());
					creditTransaction.setTransactionAmount(customAmount);
					creditTransaction.setUserName(userCard.getRequiredDocument().getCustomerEmailId());
					creditTransaction.setTransactionTime(LocalDateTime.now());
					creditTransaction.setTransactionType(TransactionType.CREDITED);
					transactionRepo.save(userTransaction);
					accountRepo.save(userAccount);
					creditCardRepo.save(userCard);
					creditTransactionRepo.save(creditTransaction);
				} else {
					return "Insufficient Balance";
				}
				sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear "
						+ userCard.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
						+ userCard.getTotalOutstanding() + " has been debited from A/c no. "
						+ userCard.getRequiredDocument().getCustomerAccountNumber() + " on " + LocalDateTime.now()
						+ " IST. Info- " + userCard.getCreditCardType() + ".\r\n" + "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
				sendWhatsAppMessage("+91" + userCard.getRequiredDocument().getCustomerPhoneNumber(), "+14155238886",
						"Dear " + userCard.getRequiredDocument().getCustomerFirstName() + ",\r\n" + "\r\n" + "INR "
								+ userCard.getTotalOutstanding() + " has been debited from A/c no. "
								+ userCard.getRequiredDocument().getCustomerAccountNumber() + " on "
								+ LocalDateTime.now() + " IST. Info- " + userCard.getCreditCardType() + ".\r\n" + "\r\n"
								+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
								+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
				return "Credit Card Payment Successfull.....";
			} else {
				throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
			}
		} catch (Exception e) {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}
	}

	@Override
	public List<CreditCardTransaction> getListOfTransaction(String creditCardNumber) throws CreditCardNotExist {
		try {
			CreditCard userCard = creditCardRepo.findByCreditCardNumber(creditCardNumber);
			boolean accountCheck = checkValidAccount(userCard.getRequiredDocument().getCustomerAccountNumber());
			if (accountCheck == true) {
				List<CreditCardTransaction> creditTransaction = creditTransactionRepo
						.findByCreditCardNumber(creditCardNumber);
				return creditTransaction;
			} else {
				throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
			}

		} catch (Exception e) {
			throw new CreditCardNotExist("Credit Card Does Not Exists!!!");
		}

	}

	@Override
	public List<CreditCardTransaction> getListOfAllTransaction() throws CreditCardNotExist {

		try {
			return creditTransactionRepo.findAll();
		} catch (Exception e) {
			throw new CreditCardNotExist("Credit Card List Does Not Exists!!!");
		}
	}
}