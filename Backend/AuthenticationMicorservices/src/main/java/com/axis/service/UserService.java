package com.axis.service;

import java.util.List;

import com.axis.enummodel.UserStatus;
import com.axis.exception.EmailError;
import com.axis.exception.InvalidOTP;
import com.axis.exception.PasswordError;
import com.axis.exception.UserAlreadyExistsException;
import com.axis.exception.UserNotFoundException;
import com.axis.model.OTPValidationRequest;
import com.axis.model.User;

public interface UserService {

	String getCurrentLoginUser();
	
	String sendOtpEmail(String email) throws UserNotFoundException;
	
	String validateOTP(OTPValidationRequest validateOtp) throws InvalidOTP,UserNotFoundException;

	public User createUser(User user) throws UserAlreadyExistsException, EmailError;

	public boolean deleteCustomer(int userId) throws UserNotFoundException;

	public boolean deleteEmployee(int userId) throws UserNotFoundException;

	public boolean deleteManager(int userId) throws UserNotFoundException;
	
	public boolean deleteContentWriter(int userId) throws UserNotFoundException;

	public User updatePassword(User user, String userName) throws UserNotFoundException;

	public User getCustomerById(int userId) throws UserNotFoundException;

	public User getEmployeeById(int userId) throws UserNotFoundException;

	public User getManagerById(int userId) throws UserNotFoundException;
	
	public User getContentWriterById(int userId)  throws UserNotFoundException;

	public void updateStatus(int userId, UserStatus status) throws UserNotFoundException;

	public List<User> getCustomerDetailsByStatus(UserStatus userStatus) throws UserNotFoundException;

	public List<User> getManagerDetailsByStatus(UserStatus userStatus) throws UserNotFoundException;

	public List<User> getEmployeeDetailsByStatus(UserStatus userStatus) throws UserNotFoundException;
	
	public List<User> getContentWriterDetailsByStatus(UserStatus userStatus) throws UserNotFoundException;

	public String getRoleByUserName(String userName) throws UserNotFoundException;

	public User getUserByUserName(String userName) throws UserNotFoundException;

}
