package com.axis.locker.service;

import java.time.LocalDate;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import java.time.LocalDateTime;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.axis.locker.exception.AccountNotExist;
import com.axis.locker.exception.LockerNotExist;
import com.axis.locker.model.Account;
import com.axis.locker.model.LocationOfLocker;
import com.axis.locker.model.Locker;

import com.axis.locker.model.Transaction;
import com.axis.locker.model.User;
import com.axis.locker.repository.AccountRepository;
import com.axis.locker.repository.LocationOfLockerRepo;

import com.axis.locker.repository.LockerRepository;
import com.axis.locker.repository.TransactionRepository;
import com.axis.locker.repository.UserRepository;
import com.axis.lockerenum.AccountType;
import com.axis.lockerenum.LockerSize;
import com.axis.lockerenum.LockerSizePrice;
import com.axis.lockerenum.TransactionStatus;
import com.axis.lockerenum.TransactionType;

@Service
public class LockerServiceImpl implements LockerService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private LockerRepository lockerRepo;

	@Autowired
	private TransactionRepository transactionRepo;

	@Autowired
	private LocationOfLockerRepo locationRepo;

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

//	@Override
//	public String updateLockerAvalability(int lockerAvalability, String lockerSize) {
//		LockerAvailability lockerAvail = lockerAvailRepo.findById(1).get();
//		if (lockerSize.equals(LockerSize.SMALL.toString())) {
//			lockerAvail.setLockerAvalabiltyForSmall(lockerAvail.getLockerAvalabiltyForSmall() + lockerAvalability);
//		} else if (lockerSize.equals(LockerSize.MEDIUM.toString())) {
//
//			lockerAvail.setLockerAvalabiltyForMedium(lockerAvail.getLockerAvalabiltyForMedium() + lockerAvalability);
//
//		} else if (lockerSize.equals(LockerSize.LARGE.toString())) {
//
//			lockerAvail.setLockerAvalabiltyForLarge(lockerAvail.getLockerAvalabiltyForLarge() + lockerAvalability);
//
//		} else {
//			return "Wrong LockerSize Please provide Correct Locker Size!!!";
//		}
//		lockerAvailRepo.save(lockerAvail);
//		return "Updated";
//	}

	@Override
	public String applyForNewLocker(Locker locker) throws AccountNotExist {
		boolean validAccount = checkValidAccount(locker.getCustomerAccountNumber());
		if (validAccount == true) {
			User fetchedUser = userRepo.findByEmailId(getCurrentLoginUser());
			Account userAccount = accountRepo.findByAccountNumber(locker.getCustomerAccountNumber());
			Transaction userTransaction = new Transaction();
//			LockerAvailability lockerAvail = lockerAvailRepo.findById(1).get();
			String result = "";
			double cost = 0;
			LocationOfLocker location = locationRepo.findByCityOfLocker(locker.getLocationForLocker());
			System.out.println("hello");
			System.out.println(location);
			if (locker.getLockerSize().equals(LockerSize.SMALL) && (location.getSmallSizeLocker() > 1)) {

				cost = LockerSizePrice.SMALL.getLockerSizePrice() * locker.getAvialLockerFormonth();
				result = "Locker Successfully Provided";
				locker.setLockerSize(LockerSize.SMALL);
			} else if (locker.getLockerSize().equals(LockerSize.MEDIUM) && (location.getMediumSizeLocker() > 1)) {

				cost = LockerSizePrice.MEDIUM.getLockerSizePrice() * locker.getAvialLockerFormonth();
				result = "Locker Successfully Provided";
				locker.setLockerSize(LockerSize.MEDIUM);
			} else if (locker.getLockerSize().equals(LockerSize.LARGE) && (location.getLargeSizeLocker() > 1)) {

				cost = LockerSizePrice.LARGE.getLockerSizePrice() * locker.getAvialLockerFormonth();
				result = "Locker Successfully Provided";
				locker.setLockerSize(LockerSize.LARGE);
			} else {
				result = "Sorry Locker is Out of Stock!!!..";
			}

			if (userAccount.getAvailableBalance() > cost
					&& userAccount.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)
					&& userAccount.getAvailableBalance() - cost >= 1000) {
				userAccount.setAvailableBalance(userAccount.getAvailableBalance() - cost);
				userTransaction.setAmount(cost);
				userTransaction.setCustomerAccountNumber(locker.getCustomerAccountNumber());
				userTransaction.setCustomerUserName(getCurrentLoginUser());
				userTransaction.setInitiationDate(LocalDateTime.now());
				userTransaction.setTargetAccountNumber(11210067);
				userTransaction.setTargetOwnerName("APNA_BANK");
				userTransaction.setTargetIFSCCode("APNA0000667");
				userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
				userTransaction.setTransactionType(TransactionType.DEBITED);
				locker.setLockerSizeCost(cost);
				locker.setValidFromDate(LocalDate.now());
				locker.setValidToDate(LocalDate.now().plusMonths(locker.getAvialLockerFormonth()));
				locker.setUserName(getCurrentLoginUser());
				if (locker.getLockerSize().equals(LockerSize.SMALL)) {
					location.setSmallSizeLocker(location.getSmallSizeLocker() - 1);

				} else if (locker.getLockerSize().equals(LockerSize.MEDIUM)) {
					location.setMediumSizeLocker(location.getMediumSizeLocker() - 1);

				} else {
					location.setLargeSizeLocker(location.getLargeSizeLocker() - 1);

				}
				transactionRepo.save(userTransaction);
				accountRepo.save(userAccount);
				lockerRepo.save(locker);
				locationRepo.save(location);

			} else if (userAccount.getAvailableBalance() > cost
					&& userAccount.getAccountType().equals(AccountType.CURRENT_ACCOUNT)
					&& userAccount.getAvailableBalance() - cost >= 10000) {
				userAccount.setAvailableBalance(userAccount.getAvailableBalance() - cost);
				userTransaction.setAmount(cost);
				userTransaction.setCustomerAccountNumber(locker.getCustomerAccountNumber());
				userTransaction.setCustomerUserName(getCurrentLoginUser());
				userTransaction.setInitiationDate(LocalDateTime.now());
				userTransaction.setTargetAccountNumber(11210067);
				userTransaction.setTargetOwnerName("APNA_BANK");
				userTransaction.setTargetIFSCCode("APNA0000667");
				userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
				userTransaction.setTransactionType(TransactionType.DEBITED);
				locker.setLockerSizeCost(cost);
				locker.setValidFromDate(LocalDate.now());
				locker.setValidToDate(LocalDate.now().plusMonths(locker.getAvialLockerFormonth()));
				locker.setUserName(getCurrentLoginUser());
				if (locker.getLockerSize().equals(LockerSize.SMALL)) {
					location.setSmallSizeLocker(location.getSmallSizeLocker() - 1);

				} else if (locker.getLockerSize().equals(LockerSize.MEDIUM)) {
					location.setMediumSizeLocker(location.getMediumSizeLocker() - 1);

				} else {
					location.setLargeSizeLocker(location.getLargeSizeLocker() - 1);

				}
				transactionRepo.save(userTransaction);
				accountRepo.save(userAccount);
				lockerRepo.save(locker);
				locationRepo.save(location);
			} else {
				return "Insufficient Balance!!!";
			}

			sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear "
					+ fetchedUser.getUserFirstName() + ",\r\n" + "\r\n" + "INR " + cost
					+ " has been debited from A/c no. " + userAccount.getAccountNumber() + " on " + LocalDateTime.now()
					+ " IST. Info- For Locker Service of Size: " + locker.getLockerSize() + ".\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendWhatsAppMessage("+91" + fetchedUser.getUserPhoneNumber(), "+14155238886", "Dear "
					+ fetchedUser.getUserFirstName() + ",\r\n" + "\r\n" + "INR " + cost
					+ " has been debited from A/c no. " + userAccount.getAccountNumber() + " on " + LocalDateTime.now()
					+ " IST. Info- For Locker Service of Size: " + locker.getLockerSize() + ".\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendMail(getCurrentLoginUser(), "Locker Service From Apna Bank!", "Dear " + fetchedUser.getUserFirstName()
					+ ",\r\n" + "\r\n" + "Your  Locker of Size: " + locker.getLockerSize()
					+ "Successfully Provided to You.\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendWhatsAppMessage("+91" + fetchedUser.getUserPhoneNumber(), "+14155238886", "Dear "
					+ fetchedUser.getUserFirstName() + ",\r\n" + "\r\n" + "Your  Locker of Size: "
					+ locker.getLockerSize() + "Successfully Provided to You.\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			return result;
		} else {
			throw new AccountNotExist("Account Does Not Exists!!!");
		}
	}

	@Override
	public List<Locker> getAllLocker() throws LockerNotExist {

		return lockerRepo.findAll();
	}

	@Override
	public List<Locker> getListOfLockerForCurrentUser() throws LockerNotExist {

		List<Locker> getLockerByUserName = lockerRepo.findByUserName(getCurrentLoginUser());
		if (getLockerByUserName == null) {
			throw new LockerNotExist("Locker Does Not Exists!!");
		}
		return getLockerByUserName;
	}

	@Override
	public String addLockerForLocation(LocationOfLocker locationOfLocker) {
		locationRepo.save(locationOfLocker);
		return "Added Successfully";
	}

	@Override
	public LocationOfLocker getLocationDetail(String city) throws LockerNotExist {
		LocationOfLocker location = locationRepo.findByCityOfLocker(city);
		if (location == null) {
			throw new LockerNotExist("Locker Does Not Exists!!");
		}
		return location;
	}

	@Override
	public List<LocationOfLocker> getListOfgetLocationDetail() {
		// TODO Auto-generated method stub
		return locationRepo.findAll();
	}

	@Override
	public String updateLocationLocker(LocationOfLocker locationOfLocker) throws LockerNotExist {
		LocationOfLocker location1 = locationRepo.findByCityOfLocker(locationOfLocker.getCityOfLocker());
		if (location1 == null) {
			throw new LockerNotExist("Locker Does Not Exists!!");
		}
		LocationOfLocker location = locationRepo.findById(location1.getLocationId()).get();
		if (location == null) {
			throw new LockerNotExist("Locker Does Not Exists!!");
		}
		location.setSmallSizeLocker(location.getSmallSizeLocker() + locationOfLocker.getSmallSizeLocker());
		location.setMediumSizeLocker(location.getMediumSizeLocker() + locationOfLocker.getMediumSizeLocker());
		location.setLargeSizeLocker(location.getLargeSizeLocker() + locationOfLocker.getLargeSizeLocker());
		locationRepo.save(location);
		return "Updated Successfull";
	}

}
