package com.axis.transaction.service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.springframework.data.domain.Sort;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.axis.enumtransaction.AccountType;
import com.axis.enumtransaction.TransactionStatus;
import com.axis.enumtransaction.TransactionType;
import com.axis.transaction.exception.AccountNotExist;
import com.axis.transaction.exception.TransactionNotFoundException;
import com.axis.transaction.model.Account;
import com.axis.transaction.model.Transaction;
import com.axis.transaction.model.User;
import com.axis.transaction.repo.AccountRepository;
import com.axis.transaction.repo.TransactionRepository;
import com.axis.transaction.repo.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private TransactionRepository transactionRepo;

	@Autowired
	private AccountRepository accountRepo;

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

	@Override
	public String getCurrentLoginUser() {

		return (String) request.getAttribute("username");
	}

	@Override
	public AccountType getAccountType(Long accountNumber) {
		AccountType accountType = null;
		User fecthedUser = userRepo.findByEmailId(getCurrentLoginUser());
		List<Account> fecthedAccount = accountRepo.findByUserAccount(fecthedUser);
		for (Account account : fecthedAccount) {
			if (account.getAccountNumber().equals(accountNumber)) {
				accountType = account.getAccountType();
			}
		}
		return accountType;
	}

	@Override
	public double getCurrentBalance(Long accountNumber) throws AccountNotExist {
		User fecthedUser = userRepo.findByEmailId(getCurrentLoginUser());
		List<Account> fecthedAccount = accountRepo.findByUserAccount(fecthedUser);
		double currentBalance = 0;
		for (Account account : fecthedAccount) {
			if (account.getAccountNumber().equals(accountNumber)) {
				currentBalance = account.getAvailableBalance();
			} else {
				throw new AccountNotExist("Account Number does not Exists!!!");
			}
		}
		return currentBalance;
	}

	@Override
	public String withdrawBalance(Transaction transaction) throws AccountNotExist {
		double currentBalance = getCurrentBalance(transaction.getCustomerAccountNumber());
		if (transaction.getAmount() < 100000) {
			if (currentBalance > transaction.getAmount() && transaction.getAmount() > 0) {
				if (getAccountType(transaction.getCustomerAccountNumber()).equals(AccountType.SAVINGS_ACCOUNT)
						&& (currentBalance - transaction.getAmount()) >= 1000) {
					Account fecthedAccount = accountRepo.findByAccountNumber(transaction.getCustomerAccountNumber());
					fecthedAccount.setAvailableBalance(currentBalance - transaction.getAmount());
					accountRepo.save(fecthedAccount);
					transaction.setCustomerUserName(getCurrentLoginUser());
					transaction.setInitiationDate(LocalDateTime.now());
					if (!(transaction.getTargetIFSCCode() == null)) {
						System.err.println("inside");

						Account fecthedtargetAccount = accountRepo
								.findByAccountNumber(transaction.getTargetAccountNumber());
						if (fecthedtargetAccount != null) {
							fecthedtargetAccount.setAvailableBalance(
									fecthedtargetAccount.getAvailableBalance() + transaction.getAmount());
						}
					} else {
						transaction.setTargetAccountNumber(0);
						transaction.setTargetIFSCCode("Not Required");
						transaction.setTargetOwnerName("Not Required");
					}
					transaction.setTransactionType(TransactionType.DEBITED);
					transaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
					transactionRepo.save(transaction);
					sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear Customer,\r\n" + "\r\n"
							+ "INR " + transaction.getAmount() + " has been debited from A/c no. "
							+ transaction.getCustomerAccountNumber() + " on " + transaction.getInitiationDate()
							+ " IST. Info- " + transaction.getTransactionNote() + ".\r\n" + "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
					sendWhatsAppMessage("+91" + fecthedAccount.getUserAccount().getUserPhoneNumber(), "+14155238886",
							"Dear Customer,\r\n" + "\r\n" + "INR " + transaction.getAmount()
									+ " has been debited from A/c no. " + transaction.getCustomerAccountNumber()
									+ " on " + transaction.getInitiationDate() + " IST. Info- "
									+ transaction.getTransactionNote() + ".\r\n" + "\r\n"
									+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
									+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n"
									+ "Apna Bank Ltd.");

				} else if (getAccountType(transaction.getCustomerAccountNumber()).equals(AccountType.CURRENT_ACCOUNT)
						&& (currentBalance - transaction.getAmount()) >= 10000) {
					Account fecthedAccount = accountRepo.findByAccountNumber(transaction.getCustomerAccountNumber());
					fecthedAccount.setAvailableBalance(currentBalance - transaction.getAmount());
					accountRepo.save(fecthedAccount);
					transaction.setCustomerUserName(getCurrentLoginUser());
					transaction.setInitiationDate(LocalDateTime.now());
					if (!(transaction.getTargetIFSCCode() == null)) {

						Account fecthedtargetAccount = accountRepo
								.findByAccountNumber(transaction.getTargetAccountNumber());
						if (fecthedtargetAccount != null) {
							fecthedtargetAccount.setAvailableBalance(
									fecthedtargetAccount.getAvailableBalance() + transaction.getAmount());
						}
					} else {
						transaction.setTargetAccountNumber(0);
						transaction.setTargetIFSCCode("Not Required");
						transaction.setTargetOwnerName("Not Required");
					}
					transaction.setTransactionType(TransactionType.DEBITED);
					transaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
					transactionRepo.save(transaction);
					sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear Customer,\r\n" + "\r\n"
							+ "INR " + transaction.getAmount() + " has been debited from A/c no. "
							+ transaction.getCustomerAccountNumber() + " on " + transaction.getInitiationDate()
							+ " IST. Info- " + transaction.getTransactionNote() + ".\r\n" + "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
					sendWhatsAppMessage("+91" + fecthedAccount.getUserAccount().getUserPhoneNumber(), "+14155238886",
							"Dear Customer,\r\n" + "\r\n" + "INR " + transaction.getAmount()
									+ " has been debited from A/c no. " + transaction.getCustomerAccountNumber()
									+ " on " + transaction.getInitiationDate() + " IST. Info- "
									+ transaction.getTransactionNote() + ".\r\n" + "\r\n"
									+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
									+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n"
									+ "Apna Bank Ltd.");
				} else {
					return "Warning: Minimum Balance Should be Maintain!!!!";
				}
			} else {
				return "Insufficient Balance OR Amount should be Greater than Zero!!!!";
			}
			return "Withdraw Succesfully......";
		} else {
			if (currentBalance > transaction.getAmount() && transaction.getAmount() > 0) {
				if (getAccountType(transaction.getCustomerAccountNumber()).equals(AccountType.SAVINGS_ACCOUNT)
						&& (currentBalance - transaction.getAmount()) >= 1000) {
					transaction.setCustomerUserName(getCurrentLoginUser());
					User user = userRepo.findByEmailId(getCurrentLoginUser());
					transaction.setInitiationDate(LocalDateTime.now());
					if ((transaction.getTargetIFSCCode() == null)) {
						transaction.setTargetAccountNumber(0);
						transaction.setTargetIFSCCode("Not Required");
						transaction.setTargetOwnerName("Not Required");
					}
					transaction.setTransactionType(TransactionType.DEBITED);
					transaction.setTransactionStatus(TransactionStatus.PENDING);
					transactionRepo.save(transaction);
					sendMail(getCurrentLoginUser(), "Notification From Apna Bank!", "Dear Customer,\r\n" + "\r\n"
							+ "Thank you for banking with us.\r\n" + "\r\n" + "INR " + transaction.getAmount()
							+ "  DEBITED Request has been Initiated From Axis Bank A/c no."
							+ transaction.getCustomerAccountNumber() + " on " + transaction.getInitiationDate()
							+ " Please confirm your transaction shortly our employee will connect to you..\r\n" + "\r\n"
							+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
					sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear Customer,\r\n" + "\r\n"
							+ "Thank you for banking with us.\r\n" + "\r\n" + "INR " + transaction.getAmount()
							+ "  DEBITED Request has been Initiated From Axis Bank A/c no."
							+ transaction.getCustomerAccountNumber() + " on " + transaction.getInitiationDate()
							+ " Please confirm your transaction shortly our employee will connect to you..\r\n" + "\r\n"
							+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");

				} else if (getAccountType(transaction.getCustomerAccountNumber()).equals(AccountType.CURRENT_ACCOUNT)
						&& (currentBalance - transaction.getAmount()) >= 10000) {
					transaction.setCustomerUserName(getCurrentLoginUser());
					User user = userRepo.findByEmailId(getCurrentLoginUser());
					transaction.setInitiationDate(LocalDateTime.now());
					if ((transaction.getTargetIFSCCode() == null)) {
						transaction.setTargetAccountNumber(0);
						transaction.setTargetIFSCCode("Not Required");
						transaction.setTargetOwnerName("Not Required");
					}
					transaction.setTransactionType(TransactionType.DEBITED);
					transaction.setTransactionStatus(TransactionStatus.PENDING);
					transactionRepo.save(transaction);
					sendMail(getCurrentLoginUser(), "Notification From Apna Bank!", "Dear Customer,\r\n" + "\r\n"
							+ "Thank you for banking with us.\r\n" + "\r\n" + "INR " + transaction.getAmount()
							+ "  DEBITED Request has been Initiated From Axis Bank A/c no."
							+ transaction.getCustomerAccountNumber() + " on " + transaction.getInitiationDate()
							+ " Please confirm your transaction shortly our employee will connect to you..\r\n" + "\r\n"
							+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
					sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear Customer,\r\n" + "\r\n"
							+ "Thank you for banking with us.\r\n" + "\r\n" + "INR " + transaction.getAmount()
							+ "  DEBITED Request has been Initiated From Axis Bank A/c no."
							+ transaction.getCustomerAccountNumber() + " on " + transaction.getInitiationDate()
							+ " Please confirm your transaction shortly our employee will connect to you..\r\n" + "\r\n"
							+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
				} else {
					return "Warning: Minimum Balance Should be Maintain!!!!";
				}
			} else {
				return "Insufficient Balance OR Amount should be Greater than Zero!!!!";
			}
			return "Alert : Required User Confirmation For Transaction!!!!";
		}

	}

	@Override
	public List<Transaction> getTransactionByStatus(TransactionStatus transactionStatus)
			throws TransactionNotFoundException {
		List<Transaction> fecthedTransaction = transactionRepo.findByTransactionStatus(transactionStatus);
		if (fecthedTransaction == null) {
			throw new TransactionNotFoundException("No Transaction Found with" + transactionStatus + "Status");
		}
		return fecthedTransaction;
	}

	@Override
	public String approvePendingTransaction(long transactionId) throws TransactionNotFoundException {
		Transaction fecthedTransaction = transactionRepo.findById(transactionId).get();
		if (fecthedTransaction == null) {
			throw new TransactionNotFoundException("No Transaction Found");
		}
		Account fecthedAccount = accountRepo.findByAccountNumber(fecthedTransaction.getCustomerAccountNumber());
		if (fecthedTransaction.getTransactionType().equals(TransactionType.CREDITED)) {

			fecthedAccount.setAvailableBalance(fecthedAccount.getAvailableBalance() + fecthedTransaction.getAmount());
			sendMail(fecthedTransaction.getCustomerUserName(), "Credit Notification From Apna Bank!",
					"Dear Customer,\r\n" + "\r\n" + "INR " + fecthedTransaction.getAmount()
							+ " has been credited to A/c no. " + fecthedTransaction.getCustomerAccountNumber() + " on "
							+ LocalDateTime.now() + " IST. Info- " + fecthedTransaction.getTransactionNote() + ".\r\n"
							+ "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendWhatsAppMessage("+91" + fecthedAccount.getUserAccount().getUserPhoneNumber(), "+14155238886",
					"Dear Customer,\r\n" + "\r\n" + "INR " + fecthedTransaction.getAmount()
							+ " has been credited to A/c no. " + fecthedTransaction.getCustomerAccountNumber() + " on "
							+ LocalDateTime.now() + " IST. Info- " + fecthedTransaction.getTransactionNote() + ".\r\n"
							+ "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		} else {

			fecthedAccount.setAvailableBalance(fecthedAccount.getAvailableBalance() - fecthedTransaction.getAmount());
			sendMail(fecthedTransaction.getCustomerUserName(), "Debit Notification From Apna Bank!",
					"Dear Customer,\r\n" + "\r\n" + "INR " + fecthedTransaction.getAmount()
							+ " has been debited from A/c no. " + fecthedTransaction.getCustomerAccountNumber() + " on "
							+ LocalDateTime.now() + " IST. Info- " + fecthedTransaction.getTransactionNote() + ".\r\n"
							+ "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendWhatsAppMessage("+91" + fecthedAccount.getUserAccount().getUserPhoneNumber(), "+14155238886",
					"Dear Customer,\r\n" + "\r\n" + "INR " + fecthedTransaction.getAmount()
							+ " has been debited from A/c no. " + fecthedTransaction.getCustomerAccountNumber() + " on "
							+ LocalDateTime.now() + " IST. Info- " + fecthedTransaction.getTransactionNote() + ".\r\n"
							+ "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		}
		Account fecthedtargetAccount = accountRepo.findByAccountNumber(fecthedTransaction.getTargetAccountNumber());
		if (fecthedtargetAccount != null) {
			fecthedtargetAccount
					.setAvailableBalance(fecthedtargetAccount.getAvailableBalance() + fecthedTransaction.getAmount());
		}
		fecthedTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
		transactionRepo.save(fecthedTransaction);
		accountRepo.save(fecthedAccount);

		return "Successfully Approved......";
	}

	@Override
	public String transferAmount(Transaction transaction) throws Exception {
		double currentBalance = getCurrentBalance(transaction.getCustomerAccountNumber());
		Account customerAccount = accountRepo.findByAccountNumber(transaction.getCustomerAccountNumber());
		Account fetchedAccount = accountRepo.findByAccountNumber(transaction.getTargetAccountNumber());

		if (transaction.getTargetAccountNumber() == transaction.getCustomerAccountNumber()) {
			return "TargetAccountNumber Should Not Be Same as CustomerAccountNumber";
		}

		if (fetchedAccount != null) {
			transaction.setTargetIFSCCode("Not Required");
			String targetOwnerName = fetchedAccount.getUserAccount().getEmailId();
			transaction.setTargetOwnerName(targetOwnerName);
			if (customerAccount.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)
					&& (currentBalance > transaction.getAmount() && currentBalance >= 1000)) {
				withdrawBalance(transaction);
				addTransactionForReciver(transaction);
			} else if (customerAccount.getAccountType().equals(AccountType.CURRENT_ACCOUNT)
					&& (currentBalance > transaction.getAmount() && currentBalance >= 10000)) {
				withdrawBalance(transaction);
				addTransactionForReciver(transaction);
			} else {
				return "Insufficient Balance!!!!";
			}

		} else if (!transaction.getTargetIFSCCode().isEmpty() && !transaction.getTargetOwnerName().isEmpty()) {

			if (customerAccount.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)
					&& (currentBalance > transaction.getAmount() && currentBalance >= 1000)) {
				withdrawBalance(transaction);
			} else if (customerAccount.getAccountType().equals(AccountType.CURRENT_ACCOUNT)
					&& (currentBalance > transaction.getAmount() && currentBalance >= 10000)) {
				withdrawBalance(transaction);
			} else {
				return "Insufficient Balance!!!!";
			}
		} else {
			throw new Exception("Please Provide IFSC Code And Target Owner Name!!!");
		}

		if (transaction.getAmount() > 100000) {
			return "Alert : Required User Confirmation For Transaction!!!";
		}
		return "Transfer Successfully......";

	}

	public void addTransactionForReciver(Transaction transaction) {
		Transaction addTransaction = new Transaction();
		Account fetchedAccount = accountRepo.findByAccountNumber(transaction.getTargetAccountNumber());
		if (fetchedAccount != null) {
			addTransaction.setCustomerAccountNumber(transaction.getTargetAccountNumber());
			addTransaction.setCustomerUserName(fetchedAccount.getUserAccount().getEmailId());
			addTransaction.setTargetIFSCCode(transaction.getTargetIFSCCode());
			addTransaction.setTargetAccountNumber(transaction.getCustomerAccountNumber());
			addTransaction.setTargetOwnerName(transaction.getCustomerUserName());
			addTransaction.setAmount(transaction.getAmount());
			addTransaction.setInitiationDate(LocalDateTime.now());
			addTransaction.setTransactionType(TransactionType.CREDITED);
			addTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
			addTransaction.setTransactionNote(transaction.getTransactionNote());
			transactionRepo.save(addTransaction);
			sendMail(fetchedAccount.getUserAccount().getEmailId(), "Credit Notification From Apna Bank!",
					"Dear Customer,\r\n" + "\r\n" + "INR " + transaction.getAmount() + " has been credited to A/c no. "
							+ transaction.getTargetAccountNumber() + " on " + LocalDateTime.now() + " IST. Info- "
							+ transaction.getTransactionNote() + ".\r\n" + "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendWhatsAppMessage("+91" + fetchedAccount.getUserAccount().getUserPhoneNumber(), "+14155238886",
					"Dear Customer,\r\n" + "\r\n" + "INR " + transaction.getAmount() + " has been credited to A/c no. "
							+ transaction.getTargetAccountNumber() + " on " + LocalDateTime.now() + " IST. Info- "
							+ transaction.getTransactionNote() + ".\r\n" + "\r\n"
							+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
							+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");

		} else {
			addTransaction.setCustomerAccountNumber(transaction.getTargetAccountNumber());
			addTransaction.setCustomerUserName(transaction.getTargetOwnerName());
			addTransaction.setTargetIFSCCode(transaction.getTargetIFSCCode());
			addTransaction.setTargetAccountNumber(transaction.getCustomerAccountNumber());
			addTransaction.setTargetOwnerName(transaction.getCustomerUserName());
			addTransaction.setAmount(transaction.getAmount());
			addTransaction.setInitiationDate(LocalDateTime.now());
			addTransaction.setTransactionType(TransactionType.CREDITED);
			addTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
			addTransaction.setTransactionNote(transaction.getTransactionNote());
			transactionRepo.save(addTransaction);
			sendMail(transaction.getTargetOwnerName(), "Credit Notification From Apna Bank!", "Dear Customer,\r\n"
					+ "\r\n" + "INR " + transaction.getAmount() + " has been credited to A/c no. "
					+ transaction.getTargetAccountNumber() + " on " + LocalDateTime.now() + " IST. Info- "
					+ transaction.getTransactionNote() + ".\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		}

	}

	@Override
	public String requestToDepositAmount(Transaction transaction) throws AccountNotExist {
		double currentBalance = getCurrentBalance(transaction.getCustomerAccountNumber());
		transaction.setCustomerUserName(getCurrentLoginUser());
		transaction.setInitiationDate(LocalDateTime.now());
		transaction.setTargetAccountNumber(0);
		transaction.setTargetIFSCCode("Not Required");
		transaction.setTargetOwnerName("Not Required");
		transaction.setTransactionStatus(TransactionStatus.PENDING);
		transaction.setTransactionType(TransactionType.CREDITED);
		transaction.setTransactionNote("Self-DEPOSIT");
		transactionRepo.save(transaction);
		return "Successfully Requested for Deposit......";
	}

	@Override
	public List<Transaction> getAllTransaction() {

		return transactionRepo.findAll(Sort.by("initiationDate").ascending());
	}

	@Override
	public List<Transaction> getTransactionsForCurrentUser() {
		List<Transaction> listOfTransaction = transactionRepo.findByCustomerUserName(getCurrentLoginUser());
		Collections.sort(listOfTransaction, (s1, s2) -> s1.getInitiationDate().compareTo(s2.getInitiationDate()) > 1 ? 1
				: s1.getInitiationDate().compareTo(s2.getInitiationDate()) < 1 ? -1 : 0);
		return listOfTransaction;

	}

	@Override
	public List<Transaction> getTransactionsDataForCurrentUser() throws TransactionNotFoundException {
		List<Transaction> listOfTransaction = transactionRepo.findByCustomerUserName(getCurrentLoginUser());
		if (listOfTransaction == null) {
			throw new TransactionNotFoundException("No Transaction Found!!");
		}
		Collections.sort(listOfTransaction, (s1, s2) -> s1.getInitiationDate().compareTo(s2.getInitiationDate()) > 1 ? 1
				: s1.getInitiationDate().compareTo(s2.getInitiationDate()) < 1 ? -1 : 0);
		return listOfTransaction;
	}

	@Override
	public String creditRedeemPointToUserAccount(Long accountNumber, double redeemPoint) throws AccountNotExist {
		Account fetchedAccount = accountRepo.findByAccountNumber(accountNumber);
		if(fetchedAccount == null) {
			throw new AccountNotExist("Account Number Does Not Exists!!");
		}
		fetchedAccount.setAvailableBalance(fetchedAccount.getAvailableBalance()+redeemPoint);
		accountRepo.save(fetchedAccount);
		Transaction addTransaction = new Transaction();
		addTransaction.setCustomerAccountNumber(fetchedAccount.getAccountNumber());
		addTransaction.setCustomerUserName(fetchedAccount.getUserAccount().getEmailId());
		addTransaction.setAmount(redeemPoint);
		addTransaction.setInitiationDate(LocalDateTime.now());
		addTransaction.setTransactionType(TransactionType.CREDITED);
		addTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
		addTransaction.setTransactionNote("Redeem Points Credited...");
		transactionRepo.save(addTransaction);
		sendMail(fetchedAccount.getUserAccount().getEmailId(), "Credit Notification From Apna Bank!",
				"Dear Customer,\r\n" + "\r\n" + "INR " + redeemPoint + " has been credited to A/c no. "
						+ fetchedAccount.getAccountNumber() + " on " + LocalDateTime.now() + " IST. Info- "
						+ "Redeem Points Credited....\r\n" + "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendWhatsAppMessage("+91" + fetchedAccount.getUserAccount().getUserPhoneNumber(), "+14155238886",
				"Dear Customer,\r\n" + "\r\n" + "INR " + redeemPoint + " has been credited to A/c no. "
						+ fetchedAccount.getAccountNumber() + " on " + LocalDateTime.now() + " IST. Info- "
						+ "Redeem Points Credited....\r\n" + ".\r\n" + "\r\n"
						+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
						+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		return "Points Credited";
	}

}
