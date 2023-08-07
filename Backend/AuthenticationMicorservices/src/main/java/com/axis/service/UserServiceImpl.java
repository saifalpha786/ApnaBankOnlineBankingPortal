package com.axis.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Random;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.axis.enummodel.UserStatus;
import com.axis.exception.EmailError;
import com.axis.exception.InvalidOTP;
import com.axis.exception.UserAlreadyExistsException;
import com.axis.exception.UserNotFoundException;
import com.axis.model.OTPValidationRequest;
import com.axis.model.Roles;
import com.axis.model.User;
import com.axis.repository.UserRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private UserRepository userRepo;
	
	private String generateOtp;
	
	private final static String ACCOUNT_SID = "AC1cecd3ef71a992f701ac479d5a5fc29e";
	private final static String AUTH_TOKEN = "05f8cf53e8a21586700e7005f0da9085";

    static {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

	public String sendWhatsAppMessage(String to, String from,String message) {
		System.out.println(to);
		System.out.println(from);
		System.out.println(message);
        Message.creator(new PhoneNumber("whatsapp:"+to), new PhoneNumber("whatsapp:"+from), message).create();
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

	private String generateOtp() {
		// Generate a random 6-digit number
		Random random = new Random();
		int otp = random.nextInt(900000) + 100000; // Generates a random number between 100000 and 999999

		// Convert the number to a string and return it
		return String.valueOf(otp);
	}

	@Override
	public String getCurrentLoginUser() {

		return (String) request.getAttribute("username");
	};

	@Override
	public User createUser(User user) throws UserAlreadyExistsException, EmailError {
		User savedUser = null;
		if (userRepo.existsById(user.getUserId())) {
			throw new UserAlreadyExistsException("User with ID" + user.getUserId() + "already exists");
		} else {
			String regex1 = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
			Pattern pattern1 = Pattern.compile(regex1);
			Matcher matcher1 = pattern1.matcher(user.getEmailId());
			if (matcher1.matches() == true) {
				savedUser = userRepo.save(user);
			} else {
				throw new EmailError("Invalid email format!!!!");
			}
			if (savedUser == null) {
				throw new UserAlreadyExistsException("User with ID" + user.getUserId() + "already exists");
			}
		}
		sendMail(user.getEmailId(), "Notification From Apna Bank!",
				"Dear "+ user.getUserFirstName()+",\r\n" + "\r\n" + "Thank you for Applyig a "+user.getAccountTypeRequest() +" with us.\r\n" + "\r\n"
						+ "Your Account Opening Request successfully Recieved" + " at " + LocalDateTime.now()
						 + "\r\n"
						+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		
		sendWhatsAppMessage("+91"+user.getUserPhoneNumber(),"+14155238886","Dear "+ user.getUserFirstName()+",\r\n" + "\r\n" + "Thank you for Applyig a "+user.getAccountTypeRequest() +" with us.\r\n" + "\r\n"
				+ "Your Account Opening Request successfully Recieved" + " at " + LocalDateTime.now()
				 + "\r\n"
				+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		
		return savedUser;
	}

	@Override
	public boolean deleteManager(int userId) throws UserNotFoundException {

		boolean status = false;
		try {
			User fecthedUser = userRepo.findById(userId).get();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedUser != null && roles.getRoleName().equals("ROLE_MANAGER")) {
					userRepo.delete(fecthedUser);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		return status;
	}

	@Override
	public boolean deleteCustomer(int userId) throws UserNotFoundException {

		boolean status = false;
		try {
			User fecthedUser = userRepo.findById(userId).get();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedUser != null && roles.getRoleName().equals("ROLE_CUSTOMER")) {
					userRepo.delete(fecthedUser);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		return status;
	}

	@Override
	public boolean deleteEmployee(int userId) throws UserNotFoundException {

		boolean status = false;
		try {
			User fecthedUser = userRepo.findById(userId).get();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedUser != null && roles.getRoleName().equals("ROLE_EMPLOYEE")) {
					userRepo.delete(fecthedUser);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		return status;
	}

	@Override
	public User updatePassword(User user, String userName) throws UserNotFoundException {
		User savedUser = null;
		try {
			User fecthedUser = userRepo.findByEmailId(userName);

			if ((user.getEmailId() != null) && (user.getPassword() != null)) {
				fecthedUser.setPassword(user.getPassword());
				userRepo.save(fecthedUser);
				savedUser = fecthedUser;

			}

		} catch (NoSuchElementException exception) {

			throw new UserNotFoundException("User with ID" + userName + "does not exists");
		}
		return savedUser;
	}

	@Override
	public User getManagerById(int userId) throws UserNotFoundException {
		User savedUser = null;
		User fecthedUser = userRepo.findById(userId).get();
		if (fecthedUser == null) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedUser != null && roles.getRoleName().equals("ROLE_MANAGER")) {
				savedUser = fecthedUser;
			}
		}
		return savedUser;
	}

	@Override
	public User getEmployeeById(int userId) throws UserNotFoundException {
		User savedUser = null;
		User fecthedUser = userRepo.findById(userId).get();
		if (fecthedUser == null) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedUser != null && roles.getRoleName().equals("ROLE_EMPLOYEE")) {
				savedUser = fecthedUser;
			}
		}
		return savedUser;
	}

	@Override
	public User getCustomerById(int userId) throws UserNotFoundException {
		User savedUser = null;
		User fecthedUser = userRepo.findById(userId).get();
		if (fecthedUser == null) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedUser != null && roles.getRoleName().equals("ROLE_CUSTOMER")) {
				savedUser = fecthedUser;
			}
		}
		return savedUser;
	}

	@Override
	public void updateStatus(int userId, UserStatus status) throws UserNotFoundException {
		try {
			User fecthedUser = userRepo.findById(userId).get();
			fecthedUser.setUserStatus(status);

		} catch (NoSuchElementException exception) {

			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
	}

	@Override
	public List<User> getCustomerDetailsByStatus(UserStatus userStatus) throws UserNotFoundException {
		List<User> fecthedUser = userRepo.findByUserStatus(userStatus);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + userStatus + "Status");
		}
		List<User> customerUser = new ArrayList<>();
		for (User users : fecthedUser) {
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = users.getRoles();
			for (Roles roles : roleOfUser) {
				String roleName = roles.getRoleName();
				if (roleName.equals("ROLE_CUSTOMER")) {
					customerUser.add(users);
				}
			}
		}
		return customerUser;

	}

	@Override
	public List<User> getManagerDetailsByStatus(UserStatus userStatus) throws UserNotFoundException {
		List<User> fecthedUser = userRepo.findByUserStatus(userStatus);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + userStatus + "Status");
		}
		List<User> managerUser = new ArrayList<>();
		for (User users : fecthedUser) {
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = users.getRoles();
			for (Roles roles : roleOfUser) {
				String roleName = roles.getRoleName();
				if (roleName.equals("ROLE_MANAGER")) {
					managerUser.add(users);
				}
			}
		}
		return managerUser;

	}

	@Override
	public List<User> getEmployeeDetailsByStatus(UserStatus userStatus) throws UserNotFoundException {
		List<User> fecthedUser = userRepo.findByUserStatus(userStatus);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + userStatus + "Status");
		}
		List<User> employeeUser = new ArrayList<>();
		for (User users : fecthedUser) {
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = users.getRoles();
			for (Roles roles : roleOfUser) {
				String roleName = roles.getRoleName();
				if (roleName.equals("ROLE_EMPLOYEE")) {
					employeeUser.add(users);
				}
			}
		}
		return employeeUser;

	}

	@Override
	public String getRoleByUserName(String userName) throws UserNotFoundException {
		// TODO Auto-generated method stub
		User fecthedUser = userRepo.findByEmailId(userName);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + userName);
		}
		String roleName = "";
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			roleName = roles.getRoleName();
		}
		return roleName;
	}

	@Override
	public User getUserByUserName(String userName) throws UserNotFoundException {
		User fecthedUser = userRepo.findByEmailId(userName);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + userName);
		}
		return fecthedUser;
	}

	@Override
	public String sendOtpEmail(String email) throws UserNotFoundException {
		
		
		User fecthedUser = userRepo.findByEmailId(email);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + email);
		}
		generateOtp = generateOtp();
		sendMail(email, "Notification From Apna Bank!",
				"Dear Customer,\r\n" + "\r\n" + "Thank you for banking with us.\r\n" + "\r\n"
						+ "OTP for Password Reset: " + generateOtp + " at " + LocalDateTime.now()
						+ " Please Do not Share your OTP with anyone ..\r\n" + "\r\n"
						+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		sendWhatsAppMessage("+91"+fecthedUser.getUserPhoneNumber(), "+14155238886", "Dear Customer,\r\n" + "\r\n" + "Thank you for banking with us.\r\n" + "\r\n"
						+ "OTP for Password Reset: " + generateOtp + " at " + LocalDateTime.now()
						+ " Please Do not Share your OTP with anyone ..\r\n" + "\r\n"
						+ "Always open to help you.\r\n" + "\r\n" + "Regards,\r\n" + "Apna Bank Ltd.");
		
		return "OTP Sent Successfully....";

	}

	@Override
	public String validateOTP(OTPValidationRequest validateOtp) throws InvalidOTP, UserNotFoundException {
		String email = validateOtp.getEmail();
		String otp = validateOtp.getOtp();
		User fecthedUser = userRepo.findByEmailId(email);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + email);
		}
		if(otp.equals(generateOtp)) {
			return "Validated Successfully...";
		}
		
		throw new InvalidOTP("Invalid OTP!!");
	}

	@Override
	public boolean deleteContentWriter(int userId) throws UserNotFoundException {
		boolean status = false;
		try {
			User fecthedUser = userRepo.findById(userId).get();
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = fecthedUser.getRoles();
			for (Roles roles : roleOfUser) {
				if (fecthedUser != null && roles.getRoleName().equals("ROLE_CONTENTWRITER")) {
					userRepo.delete(fecthedUser);
					status = true;
				} else {
					return status;
				}
			}
		} catch (NoSuchElementException exception) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		return status;
	}

	@Override
	public User getContentWriterById(int userId) throws UserNotFoundException {
		User savedUser = null;
		User fecthedUser = userRepo.findById(userId).get();
		if (fecthedUser == null) {
			throw new UserNotFoundException("User with ID" + userId + "does not exists");
		}
		Set<Roles> roleOfUser = new HashSet<>();
		roleOfUser = fecthedUser.getRoles();
		for (Roles roles : roleOfUser) {
			if (fecthedUser != null && roles.getRoleName().equals("ROLE_CONTENTWRITER")) {
				savedUser = fecthedUser;
			}
		}
		return savedUser;
	}

	@Override
	public List<User> getContentWriterDetailsByStatus(UserStatus userStatus) throws UserNotFoundException {
		List<User> fecthedUser = userRepo.findByUserStatus(userStatus);
		if (fecthedUser == null) {
			throw new UserNotFoundException("No User Found with" + userStatus + "Status");
		}
		List<User> contentWriterUser = new ArrayList<>();
		for (User users : fecthedUser) {
			Set<Roles> roleOfUser = new HashSet<>();
			roleOfUser = users.getRoles();
			for (Roles roles : roleOfUser) {
				String roleName = roles.getRoleName();
				if (roleName.equals("ROLE_CONTENTWRITER")) {
					contentWriterUser.add(users);
				}
			}
		}
		return contentWriterUser;
	}

}