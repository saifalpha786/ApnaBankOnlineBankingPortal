package com.axis.giftcard.service;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import com.axis.giftcard.exception.AccountNotExist;
import com.axis.giftcard.exception.CouponCodeNotFoundException;
import com.axis.giftcard.exception.GiftCardNotFound;
import com.axis.giftcard.model.Account;
import com.axis.giftcard.model.CouponCode;
import com.axis.giftcard.model.GiftCard;
import com.axis.giftcard.model.Transaction;
import com.axis.giftcard.model.User;
import com.axis.giftcard.repository.AccountRepository;
import com.axis.giftcard.repository.CouponCodeRepository;
import com.axis.giftcard.repository.GiftCardRepository;
import com.axis.giftcard.repository.TransactionRepository;
import com.axis.giftcard.repository.UserRepository;
import com.axis.giftcardenum.AccountType;
import com.axis.giftcardenum.GiftCardStatus;
import com.axis.giftcardenum.TransactionStatus;
import com.axis.giftcardenum.TransactionType;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class GiftCardImpl implements GiftCardService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private TransactionRepository transactionRepo;

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

	@Autowired
	private GiftCardRepository giftCardRepo;

	@Autowired
	private CouponCodeRepository couponRepo;

	public String createRandomCode(int codeLength) {
		char[] chars = "abcdefghijklmnopqrstuvwxyz1234567890".toCharArray();
		StringBuilder sb = new StringBuilder();
		Random random = new SecureRandom();
		for (int i = 0; i < codeLength; i++) {
			char c = chars[random.nextInt(chars.length)];
			sb.append(c);
		}
		String output = sb.toString();
		System.out.println(output);
		return output;
	}

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

	@Override
	public String purchaseGiftCard(GiftCard giftCard) throws AccountNotExist {
		boolean accountCheck = checkValidAccount(giftCard.getUserAccountNumber());
		if (accountCheck == true) {
			Account userAccount = accountRepo.findByAccountNumber(giftCard.getUserAccountNumber());
			Transaction userTransaction = new Transaction();
			int value = 0;
			CouponCode coupon = couponRepo.findByCouponCode(giftCard.getCouponCode());
			if (coupon == null) {
				value = 0;
			} else {
				value = coupon.getDiscountOnCode();
			}

			double discount = (Double) (giftCard.getGiftCardAmount() - ((giftCard.getGiftCardAmount() * value) / 100));
			if (userAccount.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)
					&& (userAccount.getAvailableBalance() > giftCard.getGiftCardAmount()
							&& userAccount.getAvailableBalance() - giftCard.getGiftCardAmount() >= 1000)) {

				random = new Random();
				Long giftCardNumber = random.nextLong(100000000);
				giftCard.setGiftCardNumber(giftCardNumber);
				giftCard.setGiftCardStatus(GiftCardStatus.DELIVERED);
				giftCard.setPurchaseDate(LocalDateTime.now());
				giftCard.setUserName(getCurrentLoginUser());
				giftCard.setValidFrom(LocalDate.now());
				giftCard.setValidTo(LocalDate.now().plusMonths(12));
				giftCard.setReedemCode(createRandomCode(16));
				userAccount.setAvailableBalance(userAccount.getAvailableBalance() - discount);
				userTransaction.setAmount(discount);
				userTransaction.setCustomerAccountNumber(giftCard.getUserAccountNumber());
				userTransaction.setCustomerUserName(getCurrentLoginUser());
				userTransaction.setInitiationDate(LocalDateTime.now());
				userTransaction.setTargetAccountNumber(11210067);
				userTransaction.setTargetIFSCCode("APNA0000667");
				userTransaction.setTargetOwnerName("APNA_BANK");
				userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
				userTransaction.setTransactionType(TransactionType.DEBITED);
				userTransaction.setTransactionNote("Gift Card Purchase Amount for:" + giftCard.getGiftCardName());
				accountRepo.save(userAccount);
				transactionRepo.save(userTransaction);
				giftCardRepo.save(giftCard);

			} else if (userAccount.getAccountType().equals(AccountType.CURRENT_ACCOUNT)
					&& (userAccount.getAvailableBalance() > giftCard.getGiftCardAmount()
							&& userAccount.getAvailableBalance() - giftCard.getGiftCardAmount() >= 10000)) {

				random = new Random();
				Long giftCardNumber = random.nextLong(100000000);
				giftCard.setGiftCardNumber(giftCardNumber);
				giftCard.setGiftCardStatus(GiftCardStatus.DELIVERED);
				giftCard.setPurchaseDate(LocalDateTime.now());
				giftCard.setUserName(getCurrentLoginUser());
				giftCard.setValidFrom(LocalDate.now());
				giftCard.setValidTo(LocalDate.now().plusMonths(12));
				giftCard.setReedemCode(createRandomCode(16));
				userAccount.setAvailableBalance(userAccount.getAvailableBalance() - discount);
				userTransaction.setAmount(discount);
				userTransaction.setCustomerAccountNumber(giftCard.getUserAccountNumber());
				userTransaction.setCustomerUserName(getCurrentLoginUser());
				userTransaction.setInitiationDate(LocalDateTime.now());
				userTransaction.setTargetAccountNumber(11210067);
				userTransaction.setTargetIFSCCode("APNA0000667");
				userTransaction.setTargetOwnerName("APNA_BANK");
				userTransaction.setTransactionStatus(TransactionStatus.SUCCESSFULL);
				userTransaction.setTransactionType(TransactionType.DEBITED);
				userTransaction.setTransactionNote("Gift Card Purchase Amount for:" + giftCard.getGiftCardName());
				accountRepo.save(userAccount);
				transactionRepo.save(userTransaction);
				giftCardRepo.save(giftCard);

			} else {
				return "Insufficient Balance!!!";
			}
			sendMail(getCurrentLoginUser(), "Debit Notification From Apna Bank!", "Dear "
					+ userAccount.getUserAccount().getUserFirstName() + ",\r\n" + "\r\n" + "INR " + discount
					+ " has been debited from A/C No. " + userAccount.getAccountNumber() + " on " + LocalDateTime.now()
					+ " IST. Info-Purchasing Gift Card of  " + giftCard.getGiftCardName() + ".\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			sendWhatsAppMessage("+91" + userAccount.getUserAccount().getUserPhoneNumber(), "+14155238886", "Dear "
					+ userAccount.getUserAccount().getUserFirstName() + ",\r\n" + "\r\n" + "INR " + discount
					+ " has been debited from A/C No. " + userAccount.getAccountNumber() + " on " + LocalDateTime.now()
					+ " IST. Info-Purchasing Gift Card of  " + giftCard.getGiftCardName() + ".\r\n" + "\r\n"
					+ "For any concerns regarding this transaction, please contact us on 18001035577 / 18604195555. To immediately block UPI services, SMS BLOCKUPI Cust ID to +91 8691000002 from your registered mobile number.\r\n"
					+ "\r\n" + "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
			if (giftCard.getTargetUserName() != "") {

				sendMail(giftCard.getTargetUserName(), "Apna Bank-" + giftCard.getGiftCardName() + " Notification",
						"Hi \r\n" + "\r\n" + "You Have Recived a Gift Card: " + giftCard.getGiftCardName() + " From "
								+ userAccount.getUserAccount().getUserFirstName() + " .\r\n" + "\r\n" + "The "
								+ giftCard.getGiftCardName() + "with Details as follows : "
								+ giftCard.getGiftCardNumber() + " with Reedem Code :   "
								+ (giftCard.getReedemCode()).toUpperCase() + "  of Rs: " + giftCard.getGiftCardAmount()
								+ " For further details on your application, please contact your Apna Bank Representative for "
								+ giftCard.getGiftCardNumber() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
								+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");
			} else {

				sendMail(getCurrentLoginUser(), "Apna Bank-" + giftCard.getGiftCardName() + " Notification", "Dear "
						+ userAccount.getUserAccount().getUserFirstName() + " ,\r\n" + "\r\n"
						+ "Thank you for Purchasing Gift Card: " + giftCard.getGiftCardName() + " .\r\n" + "\r\n"
						+ "The " + giftCard.getGiftCardName() + "with Details as follows : "
						+ giftCard.getGiftCardNumber() + " with Reedem Code : "
						+ (giftCard.getReedemCode()).toUpperCase() + "  of Rs: " + giftCard.getGiftCardAmount()
						+ " For further details on your application, please contact your Apna Bank Representative for "
						+ giftCard.getGiftCardNumber() + " or visit the nearest Apna Bank Branch.\r\n" + "\r\n"
						+ "Sincerely,\r\n" + "\r\n" + "Team Apna Bank");
			}
			return "Purchased " + giftCard.getGiftCardName() + " Successfully....";
		} else {
			throw new AccountNotExist("Account Number Does Not Exists!!!!");
		}
	}

	@Override
	public List<GiftCard> getAllGiftCardForCurrentUser() throws GiftCardNotFound {
		List<GiftCard> giftCardByUsername = giftCardRepo.getGiftCardByUserName(getCurrentLoginUser());
		return giftCardByUsername;

	}

	@Override
	public String addCouponCode(CouponCode couponCode) throws CouponCodeNotFoundException {
		if (couponCode == null) {
			throw new CouponCodeNotFoundException("Coupon Code Not Found!!");
		}
		couponRepo.save(couponCode);
		return "Coupon Added Successfully...";
	}

	@Override
	public int discountOnCouponCode(String couponCode) {
		// TODO Auto-generated method stub
		CouponCode coupon = couponRepo.findByCouponCode(couponCode);
		if (coupon == null) {
			return 0;
		}

		return coupon.getDiscountOnCode();
	}

	@Override
	public List<CouponCode> getListOfCouponCode() throws CouponCodeNotFoundException {
		if (couponRepo.findAll() == null) {
			throw new CouponCodeNotFoundException("Coupon Code Not Found!!");
		}
		return couponRepo.findAll();
	}

	@Override
	public String deleteCouponCode(String couponCode) throws CouponCodeNotFoundException {
		CouponCode coupon = couponRepo.findByCouponCode(couponCode);
		if (couponCode == null) {
			throw new CouponCodeNotFoundException("Coupon Code Not Found!!");
		}
		couponRepo.delete(coupon);

		return "Deleted Successfully...";
	}

}
