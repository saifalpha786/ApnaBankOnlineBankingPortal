package com.axis.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import com.axis.enummodel.AccountType;
import com.axis.enummodel.UserStatus;
import com.axis.exception.EmailError;
import com.axis.exception.UserAlreadyExistsException;
import com.axis.exception.UserNotFoundException;
import com.axis.model.Roles;
import com.axis.model.User;
import com.axis.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

	@Autowired
	@InjectMocks
	private UserServiceImpl userService;
	@Mock
	@Autowired
	private UserRepository userRepo;
	public User user;
	Optional<User> options;

	@SuppressWarnings("deprecation")
	@BeforeEach
	public void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
		user = new User();
		user.setUserId(101);
		user.setUserFirstName("John");
		user.setUserLastName("Doe");
		user.setUserPhoneNumber("8707683323");
		user.setEmailId("johndoe@example.com");
		user.setPassword("password123");
		user.setAccountTypeRequest(AccountType.SAVINGS_ACCOUNT.toString());
		user.setUserStatus(UserStatus.PENDING);
		options = Optional.of(user);

	}

	@AfterEach
	public void tearDown() throws Exception {
		user = null;
	}

//	@Test
//	public void testCreateUserSuccess() throws UserAlreadyExistsException, EmailError {
//		when(userRepo.save(any())).thenReturn(user);
//		User test = userService.createUser(user);
//		assertEquals(user, test);
//	}

//	@Test
//	public void testRegisterUserFailure() throws UserAlreadyExistsException, EmailError {
//		when(userRepo.save(any())).thenReturn(user);
//		User test1 = userService.createUser(user);
//		User user2 = new User();
//		user2.setUserId(101);
//        user2.setUserFirstName("John");
//        user2.setUserLastName("Doe");
//        user2.setUserPhoneNumber("8707683323");
//        user2.setEmailId("johndoe@example.com");
//        user2.setPassword("password123");
//        user2.setAccountTypeRequest(AccountType.SAVINGS_ACCOUNT.toString());
//        user2.setUserStatus(UserStatus.PENDING);
//        when(userRepo.save(any())).thenReturn(user2);
//        User test2 = userService.createUser(user2);
//        boolean status = true;
//        if(test1.getEmailId().equals(test2.getEmailId())) {
//        	status = false;
//        }
//        assertFalse(status, "UserAlreadyExistsException");
//        
//	}

	@Test
	public void deleteCustomerTest() throws UserNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(options);
		boolean flag = userService.deleteCustomer(user.getUserId());
		assertEquals(true, flag);
	}

	@Test
	public void deleteManagerTest() throws UserNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(options);
		boolean flag = userService.deleteManager(user.getUserId());
		assertEquals(true, flag);
	}

	@Test
	public void deleteEmployeeTest() throws UserNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(options);
		boolean flag = userService.deleteEmployee(user.getUserId());
		assertEquals(true, flag);
	}

	

//	@Test
//	public void updateEmployeeTestSuccess() throws UserNotFoundException, UserAlreadyExistsException, EmailError {
//		Set<Roles> roleSet = new HashSet<>();
//		Roles role = new Roles();
//		role.setRoleName("ROLE_EMPLOYEE");
//		roleSet.add(role);
//		user.setRoles(roleSet);
//		when(userRepo.findById(user.getUserId())).thenReturn(options);
//		user.setEmailId("vijay34@gmail.com");
//		user.setPassword("Mumbai@12345");
//		User fetchedUser = userService.updatePassword(user, user.getEmailId());
//		assertEquals(user, fetchedUser);
//
//	}

	@Test
	public void getCustomerDetailsByStatusTestSuccess() throws UserNotFoundException {
		List<User> listOfCustomerDetailsByStatus = new ArrayList<>();
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		listOfCustomerDetailsByStatus.add(user);
		when(userRepo.findByUserStatus(user.getUserStatus())).thenReturn(listOfCustomerDetailsByStatus);
		List<User> fetchedUser = userService.getCustomerDetailsByStatus(user.getUserStatus());
		assertEquals(listOfCustomerDetailsByStatus, fetchedUser);

	}

	@Test
	public void getManagerDetailsByStatusTestSuccess() throws UserNotFoundException {
		List<User> listOfManagerDetailsByStatus = new ArrayList<>();
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		listOfManagerDetailsByStatus.add(user);
		when(userRepo.findByUserStatus(user.getUserStatus())).thenReturn(listOfManagerDetailsByStatus);
		List<User> fetchedUser = userService.getManagerDetailsByStatus(user.getUserStatus());
		assertEquals(listOfManagerDetailsByStatus, fetchedUser);

	}

	@Test
	public void getEmployeeDetailsByStatusSuccess() throws UserNotFoundException {
		List<User> listOfEmployeeDetailsByStatus = new ArrayList<>();
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		listOfEmployeeDetailsByStatus.add(user);
		when(userRepo.findByUserStatus(user.getUserStatus())).thenReturn(listOfEmployeeDetailsByStatus);
		List<User> fetchedUser = userService.getEmployeeDetailsByStatus(user.getUserStatus());
		assertEquals(listOfEmployeeDetailsByStatus, fetchedUser);

	}

}