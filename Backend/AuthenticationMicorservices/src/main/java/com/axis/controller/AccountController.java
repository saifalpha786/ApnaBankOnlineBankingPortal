package com.axis.controller;

import java.util.List;
import java.util.Random;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.enummodel.AccountMinBalance;
import com.axis.enummodel.AccountStatus;
import com.axis.enummodel.AccountType;
import com.axis.enummodel.UserStatus;
import com.axis.exception.AccountAlreadyExistsException;
import com.axis.exception.AccountNotFoundException;
import com.axis.exception.UserNotFoundException;
import com.axis.model.Account;
import com.axis.model.User;
import com.axis.service.AccountService;
import com.axis.service.UserService;

@RestController
@RequestMapping("/account")
public class AccountController {

	private static final Logger LOG = Logger.getLogger(AccountController.class.getName());
	private Random random;

	@Autowired
	private AccountService accountService;

	@Autowired
	private UserService userService;

	@PostMapping("/addManagerAccount")
	public ResponseEntity<String> createManagerAccount(@RequestBody Account account)
			throws AccountAlreadyExistsException, UserNotFoundException {
		try {
			random = new Random();
			long accountNumber = random.nextInt(1000000000);
			account.setAccountNumber(accountNumber);
			account.setAccountStatus(AccountStatus.ACTIVE);
			account.setAccountType(AccountType.SAVINGS_ACCOUNT);
			account.setAvailableBalance(AccountMinBalance.SAVING_ACCOUNT_MIN_BALANCE.getAccountMinBalance());
			userService.updateStatus(account.getUserAccount().getUserId(), UserStatus.ACTIVE);
			if (accountService.createManagerAccount(account) != null) {
				LOG.log(Level.INFO, "/addManagerAccount - > " + "Manager Account Added Sucessfully" );
				return new ResponseEntity<String>("Created", HttpStatus.CREATED);

			} else {
				return new ResponseEntity<String>("Please provide valid manager userId ", HttpStatus.BAD_REQUEST);
			}

		} catch (AccountAlreadyExistsException e) {
			return new ResponseEntity<String>("Account Already Exists", HttpStatus.CONFLICT);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("User Not Found", HttpStatus.CONFLICT);
		}

	}

	@PostMapping("/addEmployeeAccount")
	public ResponseEntity<String> createEmployeeAccount(@RequestBody Account account)
			throws AccountAlreadyExistsException, UserNotFoundException {
		try {
			random = new Random();
			long accountNumber = random.nextInt(1000000000);
			account.setAccountNumber(accountNumber);
			account.setAccountStatus(AccountStatus.ACTIVE);
			account.setAccountType(AccountType.SAVINGS_ACCOUNT);
			userService.updateStatus(account.getUserAccount().getUserId(), UserStatus.ACTIVE);
			account.setAvailableBalance(AccountMinBalance.SAVING_ACCOUNT_MIN_BALANCE.getAccountMinBalance());
			if (accountService.createEmployeeAccount(account) != null) {
				LOG.log(Level.INFO, "/addEmployeeAccount - > " + "Employee Account Added Sucessfully" );
				return new ResponseEntity<String>("Created", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);
			}

		} catch (AccountAlreadyExistsException e) {
			return new ResponseEntity<String>("Account Already Exists", HttpStatus.CONFLICT);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("User Not Found", HttpStatus.CONFLICT);
		}

	}
	
	@PostMapping("/addContentWriterAccount")
	public ResponseEntity<String> createContentWriterAccount(@RequestBody Account account)
			throws AccountAlreadyExistsException, UserNotFoundException {
		try {
			random = new Random();
			long accountNumber = random.nextInt(1000000000);
			account.setAccountNumber(accountNumber);
			account.setAccountStatus(AccountStatus.ACTIVE);
			account.setAccountType(AccountType.SAVINGS_ACCOUNT);
			userService.updateStatus(account.getUserAccount().getUserId(), UserStatus.ACTIVE);
			account.setAvailableBalance(AccountMinBalance.SAVING_ACCOUNT_MIN_BALANCE.getAccountMinBalance());
			if (accountService.createContentWriterAccount(account) != null) {
				LOG.log(Level.INFO, "/addContentWriterAccount - > " + "Content Writer Account Added Sucessfully" );
				return new ResponseEntity<String>("Created", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("Please provide valid Contetnt Writer userId ", HttpStatus.BAD_REQUEST);
			}

		} catch (AccountAlreadyExistsException e) {
			return new ResponseEntity<String>("Account Already Exists", HttpStatus.CONFLICT);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("User Not Found", HttpStatus.CONFLICT);
		}

	}

	@PostMapping("/addCustomerAccount")
	public ResponseEntity<String> createCustomerAccount(@RequestBody Account account)
			throws AccountAlreadyExistsException, UserNotFoundException {
		try {
			random = new Random();
			long accountNumber = random.nextInt(1000000000);
			account.setAccountNumber(accountNumber);
			account.setAccountStatus(AccountStatus.ACTIVE);
			userService.updateStatus(account.getUserAccount().getUserId(), UserStatus.ACTIVE);
			User user = userService.getCustomerById(account.getUserAccount().getUserId());
			String accountType = user.getAccountTypeRequest();
			if (accountType.equals(AccountType.SAVINGS_ACCOUNT.toString())) {
				account.setAccountType(AccountType.SAVINGS_ACCOUNT);
			} else {
				account.setAccountType(AccountType.CURRENT_ACCOUNT);
			}
			if (account.getAccountType().equals(AccountType.SAVINGS_ACCOUNT)) {
				account.setAvailableBalance(AccountMinBalance.SAVING_ACCOUNT_MIN_BALANCE.getAccountMinBalance());

			} else {
				account.setAvailableBalance(AccountMinBalance.CURRENT_ACCOUNT_MIN_BALANCE.getAccountMinBalance());

			}
			if (accountService.createCustomerAccount(account) != null) {
				LOG.log(Level.INFO, "/addCustomerAccount - > " + "Customer Account Added Sucessfully" );
				return new ResponseEntity<String>("Created", HttpStatus.CREATED);
			} else {
				return new ResponseEntity<String>("Please provide valid customer userId ", HttpStatus.BAD_REQUEST);
			}

		} catch (AccountAlreadyExistsException e) {
			return new ResponseEntity<String>("Account Already Exists", HttpStatus.CONFLICT);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>("User Not Found", HttpStatus.CONFLICT);
		}

	}

	@PutMapping("/updateManagerAccount/{accountId}")
	public ResponseEntity<?> updateManagerAccount(@PathVariable("accountId") int accountId,
			@RequestBody Account account) throws AccountNotFoundException {
		try {
			if (accountService.updateManagerAccount(account, accountId) != null) {
				LOG.log(Level.INFO, "/updateManagerAccount/{accountId} - > " + "Manager With accountID:"+accountId+" Update Sucessfully" );
				return new ResponseEntity<String>("Updated", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid manager userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>("Account Not Found", HttpStatus.NOT_FOUND);
		}

	}

	@PutMapping("/updateEmployeeAccount/{accountId}")
	public ResponseEntity<?> updateEmployeeAccount(@PathVariable("accountId") int accountId,
			@RequestBody Account account) throws AccountNotFoundException {
		try {
			if (accountService.updateEmployeeAccount(account, accountId) != null) {
				LOG.log(Level.INFO, "/updateEmployeeAccount/{accountId} - > " + "Employee With accountID:"+accountId+" Update Sucessfully" );		
				return new ResponseEntity<String>("Updated", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>("Account Not Found", HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/updateContentWriterAccount/{accountId}")
	public ResponseEntity<?> updateContentWriterAccount(@PathVariable("accountId") int accountId,
			@RequestBody Account account) throws AccountNotFoundException {
		try {
			if (accountService.updateContentWriterAccount(account, accountId) != null) {
				LOG.log(Level.INFO, "/updateContentWriterAccount/{accountId} - > " + "Content Writer With accountID:"+accountId+" Update Sucessfully" );		
				return new ResponseEntity<String>("Updated", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid Content Writer userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>("Account Not Found", HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/updateCustomerAccount/{accountId}")
	public ResponseEntity<?> updateCustomerAccount(@PathVariable("accountId") int accountId,
			@RequestBody Account account) throws AccountNotFoundException {
		try {
			if (accountService.updateCustomerAccount(account, accountId) != null) {
				LOG.log(Level.INFO, "/updateCustomerAccount/{accountId} - > " + "Customer With accountID:"+accountId+" Update Sucessfully" );	
				return new ResponseEntity<String>("Updated", HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid customer userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>("Account Not Found", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getManagerAccountById/{accountId}")
	public ResponseEntity<?> getManagerAccountById(@PathVariable("accountId") int accountId) {
		try {
			if (accountService.getManagerAccountById(accountId) != null) {
				return new ResponseEntity<Account>(accountService.getManagerAccountById(accountId), HttpStatus.OK);

			} else {
				return new ResponseEntity<String>("Please provide valid manager userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getEmployeeAccountById/{accountId}")
	public ResponseEntity<?> getEmployeeAccountById(@PathVariable("accountId") int accountId) {
		try {
			if (accountService.getEmployeeAccountById(accountId) != null) {
				return new ResponseEntity<Account>(accountService.getEmployeeAccountById(accountId), HttpStatus.OK);

			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getContentWriterAccountById/{accountId}")
	public ResponseEntity<?> getContentWriterAccountById(@PathVariable("accountId") int accountId) {
		try {
			if (accountService.getEmployeeAccountById(accountId) != null) {
				return new ResponseEntity<Account>(accountService.getContentWriterAccountById(accountId), HttpStatus.OK);

			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getCustomerAccountById/{accountId}")
	public ResponseEntity<?> getCustomerAccountById(@PathVariable("accountId") int accountId) {
		try {
			if (accountService.getCustomerAccountById(accountId) != null) {
				return new ResponseEntity<Account>(accountService.getCustomerAccountById(accountId), HttpStatus.OK);

			} else {
				return new ResponseEntity<String>("Please provide valid manager userId ", HttpStatus.BAD_REQUEST);

			}
		} catch (AccountNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteManagerAccount/{accountId}")
	public ResponseEntity<?> deleteManagerAccount(@PathVariable("accountId") int accountId)
			throws AccountNotFoundException {
		try {
			boolean deleteManagerAccount = accountService.deleteManagerAccount(accountId);
			if (deleteManagerAccount == true) {
				LOG.log(Level.INFO, "/deleteManagerAccount/{accountId} - > " + "Manager With accountID:"+accountId+" delete Sucessfully" );	
				return new ResponseEntity<String>("Successfully Deleted User with id: " + accountId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid customer userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteEmployeeAccount/{accountId}")
	public ResponseEntity<?> deleteEmployeeAccount(@PathVariable("accountId") int accountId)
			throws AccountNotFoundException {
		try {
			boolean deleteEmployeeAccount = accountService.deleteEmployeeAccount(accountId);
			if (deleteEmployeeAccount == true) {
				LOG.log(Level.INFO, "/deleteEmployeeAccount/{accountId} - > " + "Employee With accountID:"+accountId+" delete Sucessfully" );	
				return new ResponseEntity<String>("Successfully Deleted User with id: " + accountId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteContentWriterAccount/{accountId}")
	public ResponseEntity<?> deleteContentWriterAccount(@PathVariable("accountId") int accountId)
			throws AccountNotFoundException {
		try {
			boolean deleteEmployeeAccount = accountService.deleteContentWriterAccount(accountId);
			if (deleteEmployeeAccount == true) {
				LOG.log(Level.INFO, "/deleteEmployeeAccount/{accountId} - > " + "Employee With accountID:"+accountId+" delete Sucessfully" );	
				return new ResponseEntity<String>("Successfully Deleted User with id: " + accountId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid content writer userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteCustomerAccount/{accountId}")
	public ResponseEntity<?> deleteCustomerAccount(@PathVariable("accountId") int accountId)
			throws AccountNotFoundException {
		try {
			boolean deleteCustomerAccount = accountService.deleteCustomerAccount(accountId);
			if (deleteCustomerAccount == true) {
				LOG.log(Level.INFO, "/deleteCustomerAccount/{accountId} - > " + "Customer With accountID:"+accountId+" delete Sucessfully" );	
				return new ResponseEntity<String>("Successfully Deleted User with id: " + accountId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid customer userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getAllAccount")
	public ResponseEntity<?> getAllAccount() throws AccountNotFoundException {
		try {
			LOG.log(Level.INFO, "/getAllAccount - > " + "Getting List Of All Accounts" );	
			return new ResponseEntity<List<Account>>(accountService.getAllAccount(), HttpStatus.OK);
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}

	}
	@GetMapping("/getUserAccountByUserName/{userName}")
	public ResponseEntity<?> getUserAccountByUserName(@PathVariable("userName") String userName){
		try {
			return new ResponseEntity<Account>(accountService.getUserAccountByUserName(userName),HttpStatus.OK);
		} catch (AccountNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}
