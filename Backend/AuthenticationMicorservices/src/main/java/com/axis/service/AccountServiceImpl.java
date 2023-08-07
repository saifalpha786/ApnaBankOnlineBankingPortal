package com.axis.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.axis.enummodel.AccountStatus;
import com.axis.enummodel.UserStatus;
import com.axis.exception.AccountAlreadyExistsException;
import com.axis.exception.AccountNotFoundException;
import com.axis.exception.UserNotFoundException;
import com.axis.model.Account;
import com.axis.model.Roles;
import com.axis.model.User;
import com.axis.repository.AccountRepository;
import com.axis.repository.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class AccountServiceImpl implements AccountService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private AccountRepository AccountRepo;

	@Autowired
	private UserRepository userRepo;

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
	};

	@Override
	public Account createManagerAccount(Account account) throws AccountAlreadyExistsException {
		Account savedAccount = null;
		if (AccountRepo.existsById(account.getAccountId())) {
			throw new AccountAlreadyExistsException("Account with ID" + account.getAccountId() + "already exists");
		}
		User fecthedUser = account.getUserAccount();
		User user = userRepo.findById(fecthedUser.getUserId()).get();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = user.getRoles();
		for (Roles roles : roleOfUser) {
			if (roles.getRoleName().equals("ROLE_MANAGER")) {
				savedAccount = AccountRepo.save(account);
				savedAccount.setUserAccount(user);
			}
		}
		String accountNumber = account.getAccountNumber().toString();
		String lastFourCharacters = accountNumber.substring(accountNumber.length() - 4);
		String result = "XXXXX" + lastFourCharacters;
		sendMail(user.getEmailId(), "Notification From Apna Bank!", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");

		sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		return savedAccount;
	}

	@Override
	public Account createEmployeeAccount(Account account) throws AccountAlreadyExistsException {
		Account savedAccount = null;
		if (AccountRepo.existsById(account.getAccountId())) {
			throw new AccountAlreadyExistsException("Account with ID" + account.getAccountId() + "already exists");
		}
		User fecthedUser = account.getUserAccount();
		User user = userRepo.findById(fecthedUser.getUserId()).get();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = user.getRoles();
		for (Roles roles : roleOfUser) {
			if (roles.getRoleName().equals("ROLE_EMPLOYEE")) {
				savedAccount = AccountRepo.save(account);
				savedAccount.setUserAccount(user);
			}
		}
		String accountNumber = account.getAccountNumber().toString();
		String lastFourCharacters = accountNumber.substring(accountNumber.length() - 4);
		String result = "XXXX" + lastFourCharacters;
		sendMail(user.getEmailId(), "Notification From Apna Bank!", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		return savedAccount;
	}

	@Override
	public Account createCustomerAccount(Account account) throws AccountAlreadyExistsException {
		Account savedAccount = null;
		if (AccountRepo.existsById(account.getAccountId())) {
			throw new AccountAlreadyExistsException("Account with ID" + account.getAccountId() + "already exists");
		}
		User fecthedUser = account.getUserAccount();
		User user = userRepo.findById(fecthedUser.getUserId()).get();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = user.getRoles();
		for (Roles roles : roleOfUser) {
			if (roles.getRoleName().equals("ROLE_CUSTOMER")) {
				savedAccount = AccountRepo.save(account);
				savedAccount.setUserAccount(user);
			}
		}
		String accountNumber = account.getAccountNumber().toString();
		String lastFourCharacters = accountNumber.substring(accountNumber.length() - 4);
		String result = "XXXX" + lastFourCharacters;
		sendMail(user.getEmailId(), "Notification From Apna Bank!", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		return savedAccount;
	}

	@Override
	public boolean deleteManagerAccount(int accountId) throws AccountNotFoundException {

		boolean status = false;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();

			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedAccount != null && roles.getRoleName().equals("ROLE_MANAGER")) {
					AccountRepo.delete(fecthedAccount);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return status;
	}

	@Override
	public boolean deleteEmployeeAccount(int accountId) throws AccountNotFoundException {

		boolean status = false;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();

			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedAccount != null && roles.getRoleName().equals("ROLE_EMPLOYEE")) {
					AccountRepo.delete(fecthedAccount);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return status;
	}

	@Override
	public boolean deleteCustomerAccount(int accountId) throws AccountNotFoundException {

		boolean status = false;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();

			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedAccount != null && roles.getRoleName().equals("ROLE_CUSTOMER")) {
					AccountRepo.delete(fecthedAccount);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return status;
	}

	@Override
	public Account updateManagerAccount(Account account, int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (roles.getRoleName().equals("ROLE_MANAGER")) {
					fecthedAccount.setAccountStatus(account.getAccountStatus());
					fecthedAccount.setAccountType(account.getAccountType());
					fecthedUser.setUserStatus(account.getUserAccount().getUserStatus());
					AccountRepo.save(fecthedAccount);
					savedAccount = fecthedAccount;
					savedAccount.setUserAccount(fecthedUser);
				}

			}
		} catch (NoSuchElementException exception) {

			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return savedAccount;
	}

	@Override
	public Account updateEmployeeAccount(Account account, int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (roles.getRoleName().equals("ROLE_EMPLOYEE")) {
					fecthedAccount.setAccountStatus(account.getAccountStatus());
					fecthedAccount.setAccountType(account.getAccountType());
					fecthedUser.setUserStatus(account.getUserAccount().getUserStatus());
					AccountRepo.save(fecthedAccount);
					savedAccount = fecthedAccount;
					savedAccount.setUserAccount(fecthedUser);
				}

			}
		} catch (NoSuchElementException exception) {

			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return savedAccount;
	}

	@Override
	public Account updateCustomerAccount(Account account, int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			List<String> listOfManagerEmail = new ArrayList<>();
			List<User> userList = userRepo.findAll();
			for (User users : userList) {
				Set<Roles> rolesOfManager = new HashSet<>();
				rolesOfManager = users.getRoles();
				for (Roles roles : rolesOfManager) {
					if (roles.getRoleName().equals("ROLE_MANAGER")) {
						listOfManagerEmail.add(users.getEmailId());

					}
				}
			}

			for (Roles roles : roleOfUser) {
				if (roles.getRoleName().equals("ROLE_CUSTOMER")) {
					fecthedAccount.setAccountStatus(account.getAccountStatus());
					fecthedAccount.setAccountType(account.getAccountType());
					fecthedUser.setUserStatus(account.getUserAccount().getUserStatus());
					AccountRepo.save(fecthedAccount);
					savedAccount = fecthedAccount;
					savedAccount.setUserAccount(fecthedUser);
					if (account.getAccountStatus().equals(AccountStatus.BLOCKED)
							&& account.getUserAccount().getUserStatus().equals(UserStatus.BLOCKED)) {
						sendMail(fecthedUser.getEmailId(), "Notification From Apna Bank!",
								"Dear " + fecthedUser.getUserFirstName() + " " + fecthedUser.getUserLastName() + ",\r\n"
										+ "\r\n" + "\r\n" + "Your " + fecthedAccount.getAccountType()
										+ " is Locked.\r\n" + "\r\n"
										+ "Activate your Account once Apna Bank Employee get touch with you Soon.\r\n"
										+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
										+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
						sendMail(listOfManagerEmail.get(0), "Notification From Apna Bank!",
								"Dear Manager \r\n" + "\r\n" + "\r\n" + "for the customer with Account No:"
										+ fecthedAccount.getAccountNumber() + " and Account Type "
										+ fecthedAccount.getAccountType()
										+ " is Blocked due to multiple times Login with wrong attempt.\r\n" + "\r\n"
										+ "Kindly validate the user Account with details: .\r\n" + "User-Email : "
										+ fecthedUser.getEmailId() + "\r\n" + "User-Name : "
										+ fecthedUser.getUserFirstName() + " " + fecthedUser.getUserLastName() + "\r\n"
										+ "User-PhoneNumber : " + fecthedUser.getUserPhoneNumber() + "\r\n"
										+ "User-PanCard : " + fecthedUser.getUserPanCard() + "\r\n" + "\r\n"
										+ "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
										+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
					}
				}

			}
		} catch (NoSuchElementException exception) {

			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return savedAccount;
	}

	@Override
	public List<Account> getAllAccount() {
		// TODO Auto-generated method stub
		return AccountRepo.findAll();
	}

	@Override
	public Account getManagerAccountById(int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		Account fecthedAccount = AccountRepo.findById(accountId).get();
		if (fecthedAccount == null) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		User fecthedUser = fecthedAccount.getUserAccount();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedAccount != null && roles.getRoleName().equals("ROLE_MANAGER")) {
				savedAccount = fecthedAccount;
			}
		}
		return savedAccount;
	}

	@Override
	public Account getEmployeeAccountById(int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		Account fecthedAccount = AccountRepo.findById(accountId).get();
		if (fecthedAccount == null) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		User fecthedUser = fecthedAccount.getUserAccount();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedAccount != null && roles.getRoleName().equals("ROLE_EMPLOYEE")) {
				savedAccount = fecthedAccount;
			}
		}
		return savedAccount;
	}

	@Override
	public Account getCustomerAccountById(int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		Account fecthedAccount = AccountRepo.findById(accountId).get();
		if (fecthedAccount == null) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		User fecthedUser = fecthedAccount.getUserAccount();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedAccount != null && roles.getRoleName().equals("ROLE_CUSTOMER")) {
				savedAccount = fecthedAccount;
			}
		}
		return savedAccount;
	}

	@Override
	public Account getUserAccountByUserName(String userName) throws AccountNotFoundException {
		// TODO Auto-generated method stub
		User fetchedUser = userRepo.findByEmailId(userName);
		Account fetchedAccount = AccountRepo.findByUserAccount(fetchedUser);
		if (fetchedAccount == null) {
			throw new AccountNotFoundException("User with ID" + userName + "account does not exists");
		}
		return fetchedAccount;
	}

	@Override
	public Account updateContentWriterAccount(Account account, int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (roles.getRoleName().equals("ROLE_CONTENTWRITER")) {
					fecthedAccount.setAccountStatus(account.getAccountStatus());
					fecthedAccount.setAccountType(account.getAccountType());
					fecthedUser.setUserStatus(account.getUserAccount().getUserStatus());
					AccountRepo.save(fecthedAccount);
					savedAccount = fecthedAccount;
					savedAccount.setUserAccount(fecthedUser);
				}

			}
		} catch (NoSuchElementException exception) {

			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return savedAccount;
	}

	@Override
	public Account createContentWriterAccount(Account account) throws AccountAlreadyExistsException {
		Account savedAccount = null;
		if (AccountRepo.existsById(account.getAccountId())) {
			throw new AccountAlreadyExistsException("Account with ID" + account.getAccountId() + "already exists");
		}
		User fecthedUser = account.getUserAccount();
		User user = userRepo.findById(fecthedUser.getUserId()).get();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = user.getRoles();
		for (Roles roles : roleOfUser) {
			if (roles.getRoleName().equals("ROLE_CONTENTWRITER")) {
				savedAccount = AccountRepo.save(account);
				savedAccount.setUserAccount(user);
			}
		}
		String accountNumber = account.getAccountNumber().toString();
		String lastFourCharacters = accountNumber.substring(accountNumber.length() - 4);
		String result = "XXXX" + lastFourCharacters;
		sendMail(user.getEmailId(), "Notification From Apna Bank!", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendWhatsAppMessage("+91" + user.getUserPhoneNumber(), "+14155238886", "Dear " + user.getUserFirstName() + " "
				+ user.getUserLastName() + ",\r\n" + "\r\n" + "Welcome to Apna Bank. \r\n" + "\r\n" + "Your "
				+ account.getAccountType() + " No. " + result + " is active.\r\n" + "\r\n"
				+ "Activate your Debit Card at the nearest Apna Bank ATM to log on to Internet Banking and Apna Mobile.\r\n"
				+ "\r\n" + "Should you have any queries, please call 18001035577.\r\n" + "\r\n"
				+ "Always open to help you.\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		return savedAccount;
	}

	@Override
	public boolean deleteContentWriterAccount(int accountId) throws AccountNotFoundException {
		boolean status = false;
		try {
			Account fecthedAccount = AccountRepo.findById(accountId).get();
			User fecthedUser = fecthedAccount.getUserAccount();

			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedAccount != null && roles.getRoleName().equals("ROLE_CONTENTWRITER")) {
					AccountRepo.delete(fecthedAccount);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		return status;
	}

	@Override
	public Account getContentWriterAccountById(int accountId) throws AccountNotFoundException {
		Account savedAccount = null;
		Account fecthedAccount = AccountRepo.findById(accountId).get();
		if (fecthedAccount == null) {
			throw new AccountNotFoundException("Account with ID" + accountId + "does not exists");
		}
		User fecthedUser = fecthedAccount.getUserAccount();
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedAccount != null && roles.getRoleName().equals("ROLE_CONTENTWRITER")) {
				savedAccount = fecthedAccount;
			}
		}
		return savedAccount;
	}

}
