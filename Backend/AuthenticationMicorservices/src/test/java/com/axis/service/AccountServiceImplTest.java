package com.axis.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
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

import com.axis.enummodel.AccountStatus;
import com.axis.enummodel.AccountType;
import com.axis.enummodel.UserStatus;
import com.axis.exception.AccountAlreadyExistsException;
import com.axis.exception.AccountNotFoundException;
import com.axis.model.Account;
import com.axis.model.Roles;
import com.axis.model.User;
import com.axis.repository.AccountRepository;
import com.axis.repository.UserRepository;

@ExtendWith(MockitoExtension.class)
public class AccountServiceImplTest {

	@Autowired
	@InjectMocks
	private AccountServiceImpl accountService;
	@Mock
	@Autowired
	private AccountRepository accountRepo;
	@Mock
	@Autowired
	private UserRepository userRepo;

	public Account account;
	public User user;
	Optional<User> userOptions;
	Optional<Account> accountOptions;

	Optional<List<Account>> options1;

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
		account = new Account();
		account.setAccountId(123);
		account.setAccountNumber(98798482L);
		account.setAccountStatus(AccountStatus.ACTIVE);
		account.setAccountType(AccountType.SAVINGS_ACCOUNT);
		account.setAvailableBalance(20000);
		account.setUserAccount(user);
		userOptions = Optional.of(user);
		accountOptions = Optional.of(account);

	}

	@AfterEach
	public void tearDown() throws Exception {
		account = null;
	}

	@Test
	public void testcreateManagerAccountSuccess() throws AccountAlreadyExistsException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleId(11);
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(userOptions);
		when(accountRepo.save(any())).thenReturn(account);
		Account test = accountService.createManagerAccount(account);
		assertEquals(account, test);
	}

	@Test
	public void testcreateManagerAccountFailure() throws AccountAlreadyExistsException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleId(11);
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(userOptions);
		when(accountRepo.save(any())).thenReturn(account);
		Account test1 = accountService.createManagerAccount(account);
		Account account1 = new Account();
		account1.setAccountId(123);
		account1.setAccountNumber(98798482L);
		account1.setAccountStatus(AccountStatus.ACTIVE);
		account1.setAccountType(AccountType.SAVINGS_ACCOUNT);
		account1.setAvailableBalance(20000);
		account1.setUserAccount(user);
		when(accountRepo.save(any())).thenReturn(account1);
		Account test2 = accountService.createManagerAccount(account1);
		boolean status = true;
		if (test1.getAccountNumber().equals(test2.getAccountNumber())) {
			status = false;
		}
		assertFalse(status, "AccountAlreadyExistsException");
	}

	@Test
	public void testcreateCustomerAccountSuccess() throws AccountAlreadyExistsException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleId(11);
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(userOptions);
		when(accountRepo.save(any())).thenReturn(account);
		Account test = accountService.createCustomerAccount(account);
		assertEquals(account, test);
	}

	@Test
	public void testcreateCustomerAccountFailure() throws AccountAlreadyExistsException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleId(11);
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(userOptions);
		when(accountRepo.save(any())).thenReturn(account);
		Account test1 = accountService.createCustomerAccount(account);
		Account account1 = new Account();
		account1.setAccountId(123);
		account1.setAccountNumber(98798482L);
		account1.setAccountStatus(AccountStatus.ACTIVE);
		account1.setAccountType(AccountType.SAVINGS_ACCOUNT);
		account1.setAvailableBalance(20000);
		account1.setUserAccount(user);
		when(accountRepo.save(any())).thenReturn(account1);
		Account test2 = accountService.createCustomerAccount(account1);
		boolean status = true;
		if (test1.getAccountNumber().equals(test2.getAccountNumber())) {
			status = false;
		}
		assertFalse(status, "AccountAlreadyExistsException");
	}

	@Test
	public void testcreateEmployeeAccountSuccess() throws AccountAlreadyExistsException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleId(11);
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(userOptions);
		when(accountRepo.save(any())).thenReturn(account);
		Account test = accountService.createEmployeeAccount(account);
		assertEquals(account, test);
	}

	@Test
	public void testcreateEmployeeAccountFailure() throws AccountAlreadyExistsException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleId(11);
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(userRepo.findById(user.getUserId())).thenReturn(userOptions);
		when(accountRepo.save(any())).thenReturn(account);
		Account test1 = accountService.createEmployeeAccount(account);
		Account account1 = new Account();
		account1.setAccountId(123);
		account1.setAccountNumber(98798482L);
		account1.setAccountStatus(AccountStatus.ACTIVE);
		account1.setAccountType(AccountType.SAVINGS_ACCOUNT);
		account1.setAvailableBalance(20000);
		account1.setUserAccount(user);
		when(accountRepo.save(any())).thenReturn(account1);
		Account test2 = accountService.createEmployeeAccount(account1);
		boolean status = true;
		if (test1.getAccountNumber().equals(test2.getAccountNumber())) {
			status = false;
		}
		assertFalse(status, "AccountAlreadyExistsException");
	}

	@Test
	public void deleteManagerAccountTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		boolean flag = accountService.deleteManagerAccount(account.getAccountId());
		assertEquals(true, flag);
	}

	@Test
	public void deleteCustomerAccountTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		boolean flag = accountService.deleteCustomerAccount(account.getAccountId());
		assertEquals(true, flag);
	}

	@Test
	public void deleteEmployeeAccountTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		boolean flag = accountService.deleteEmployeeAccount(account.getAccountId());
		assertEquals(true, flag);
	}

	@Test
	public void updateManagerAccountTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		account.setAccountStatus(AccountStatus.BLOCKED);
		account.setAccountType(AccountType.SAVINGS_ACCOUNT);
		user.setUserStatus(UserStatus.BLOCKED);
		Account fetchedAccount = accountService.updateManagerAccount(account, account.getAccountId());
		assertEquals(account, fetchedAccount);
	}

	@Test
	public void updateCustomerAccountTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		account.setAccountStatus(AccountStatus.ACTIVE);
		account.setAccountType(AccountType.CURRENT_ACCOUNT);
		user.setUserStatus(UserStatus.ACTIVE);
		Account fetchedAccount = accountService.updateCustomerAccount(account, account.getAccountId());
		assertEquals(account, fetchedAccount);
	}

	@Test
	public void updateEmployeeAccountTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		account.setAccountStatus(AccountStatus.BLOCKED);
		account.setAccountType(AccountType.SAVINGS_ACCOUNT);
		user.setUserStatus(UserStatus.BLOCKED);
		Account fetchedAccount = accountService.updateEmployeeAccount(account, account.getAccountId());
		assertEquals(account, fetchedAccount);
	}

	@Test
	public void getAllAccountTest() {
		List<Account> listofAccount = new ArrayList<>();
		listofAccount.add(account);
		when(accountRepo.findAll()).thenReturn(listofAccount);
		List<Account> fetchedAccount = accountService.getAllAccount();
		assertEquals(1, fetchedAccount.size());
	}

	@Test
	public void getManagerAccountByIdTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_MANAGER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		Account fetchedAccount = accountService.getManagerAccountById(account.getAccountId());
		assertEquals(account, fetchedAccount);
	}

	@Test
	public void getCustomerAccountByIdTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_CUSTOMER");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		Account fetchedAccount = accountService.getCustomerAccountById(account.getAccountId());
		assertEquals(account, fetchedAccount);
	}

	@Test
	public void getEmployeeAccountByIdTest() throws AccountNotFoundException {
		Set<Roles> roleSet = new HashSet<>();
		Roles role = new Roles();
		role.setRoleName("ROLE_EMPLOYEE");
		roleSet.add(role);
		user.setRoles(roleSet);
		when(accountRepo.findById(account.getAccountId())).thenReturn(accountOptions);
		Account fetchedAccount = accountService.getEmployeeAccountById(account.getAccountId());
		assertEquals(account, fetchedAccount);
	}

}
