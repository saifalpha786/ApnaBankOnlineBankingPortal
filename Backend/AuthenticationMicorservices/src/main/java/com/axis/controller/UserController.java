package com.axis.controller;

import java.util.HashSet;

import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.enummodel.UserStatus;
import com.axis.exception.EmailError;
import com.axis.exception.InvalidOTP;
import com.axis.exception.PasswordError;
import com.axis.exception.UserAlreadyExistsException;
import com.axis.exception.UserNotFoundException;
import com.axis.model.OTPValidationRequest;
import com.axis.model.Roles;
import com.axis.model.User;
import com.axis.repository.UserRepository;
import com.axis.security.model.UserAuthentication;
import com.axis.service.UserService;
import com.axis.util.JwtUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
	
	private static final Logger LOG = Logger.getLogger(UserController.class.getName());

	@Autowired
	UserService service;

	@Autowired
	UserRepository userRepo;

	@Autowired
	JwtUtil jwtUtil;

	@Autowired
	AuthenticationManager authenticationManager;

	BCryptPasswordEncoder bCryptPasswordEncoder;

	public UserController(UserService service, BCryptPasswordEncoder bCryptPasswordEncoder) {
		super();
		this.service = service;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@PostMapping("/authenticate")
	public ResponseEntity<String> authenticate(@RequestBody UserAuthentication userAuthentication) {
		UserStatus userStatus = userRepo.findByEmailId(userAuthentication.getUserName()).getUserStatus();
		if (userStatus.equals(UserStatus.ACTIVE)) {
			if (authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(userAuthentication.getUserName(),
							userAuthentication.getPassword()))
					.isAuthenticated()) {
				LOG.log(Level.INFO, "/authenticate - > " + userAuthentication.getUserName());
				return new ResponseEntity<String>(jwtUtil.generateToken(userAuthentication.getUserName()),
						HttpStatus.ACCEPTED);
				

			} else {
				throw new UsernameNotFoundException("UserName Not Found");
			}
		} else {
			return new ResponseEntity<String>("User dont have Authority to Create a Token", HttpStatus.UNAUTHORIZED);
		}
	}

	@GetMapping("/getCurrentUserName")
	public String currentUserName() {
		String userName = SecurityContextHolder.getContext().getAuthentication().getName();
		return userName;
	}

//	@GetMapping("/getCurrentUsername")
//    public String currentUserName(@RequestBody Principal principal) {
//        return principal.getName();
//    }
//	
//	@GetMapping("/getCurrentUserDetail/{userName}")
//	public User getCurrentUser(String userName) {
//		return userRepo.findByEmailId(userName);
//	}

// We are creating new Customer with default role as a customer.
	@PostMapping("/addCustomer")
	public ResponseEntity<String> createCustomer(@RequestBody User user) throws EmailError {
		try {
			String encode = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encode);
			Set<Roles> roleSet = new HashSet<>();
			Roles role = new Roles();
			role.setRoleName("ROLE_CUSTOMER");
			roleSet.add(role);
			user.setRoles(roleSet);
			user.setUserStatus(UserStatus.PENDING);
			service.createUser(user);
			LOG.log(Level.INFO, "/addCustomer - > " + "Customer: "+user.getEmailId()+"Account Created");
			return new ResponseEntity<String>("Created", HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	// We are creating new Manager with default role as a Manager.
	@PostMapping("/addManager")
	public ResponseEntity<String> createManager(@RequestBody User user) throws EmailError {
		try {
			String encode = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encode);
			user.setAccountTypeRequest("SAVINGS_ACCOUNT");
			Set<Roles> roleSet = new HashSet<>();
			Roles role = new Roles();
			role.setRoleName("ROLE_MANAGER");
			roleSet.add(role);
			user.setRoles(roleSet);
			user.setUserStatus(UserStatus.PENDING);
			service.createUser(user);
			LOG.log(Level.INFO, "/addManager - > " + "Manager: "+user.getEmailId()+" Account Created");
			return new ResponseEntity<String>("Created", HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	// We are creating new Employee with default role as a Employee.
	@PostMapping("/addEmployee")
	public ResponseEntity<String> createEmployee(@RequestBody User user) throws EmailError {
		try {
			String encode = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encode);
			user.setAccountTypeRequest("SAVINGS_ACCOUNT");
			Set<Roles> roleSet = new HashSet<>();
			Roles role = new Roles();
			role.setRoleName("ROLE_EMPLOYEE");
			roleSet.add(role);
			user.setRoles(roleSet);
			user.setUserStatus(UserStatus.PENDING);
			service.createUser(user);
			LOG.log(Level.INFO, "/addEmployee - > " + "Employee: "+user.getEmailId()+" Account Created");
			return new ResponseEntity<String>("Created", HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/addContentWriter")
	public ResponseEntity<String> createContentWriter(@RequestBody User user) throws PasswordError, EmailError {
		try {
			String encode = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encode);
			user.setAccountTypeRequest("SAVINGS_ACCOUNT");
			Set<Roles> roleSet = new HashSet<>();
			Roles role = new Roles();
			role.setRoleName("ROLE_CONTENTWRITER");
			roleSet.add(role);
			user.setRoles(roleSet);
			user.setUserStatus(UserStatus.PENDING);
			service.createUser(user);
			LOG.log(Level.INFO, "/addContentWriter - > " + "ContentWriter: "+user.getEmailId()+" Account Created");
			return new ResponseEntity<String>("Created", HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	
	

	@PostMapping("/addAdmin")
	public ResponseEntity<String> createAdmin(@RequestBody User user) throws PasswordError, EmailError {
		try {
			String encode = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encode);
			Set<Roles> roleSet = new HashSet<>();
			Roles role = new Roles();
			role.setRoleName("ROLE_ADMIN");
			roleSet.add(role);
			user.setRoles(roleSet);
			user.setUserStatus(UserStatus.ACTIVE);
			service.createUser(user);
			return new ResponseEntity<String>("Created", HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	/*
	 * This Method only accessed by Manager and we are fetching all users details by
	 * its Status.
	 */
	@GetMapping("/getManagerByStatus/{userStatus}")
	public ResponseEntity<?> getManagerDetailsByStatus(@PathVariable("userStatus") UserStatus userStatus) {
		try {
			List<User> users = service.getManagerDetailsByStatus(userStatus);
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/getEmployeeByStatus/{userStatus}")
	public ResponseEntity<?> getEmployeeDetailsByStatus(@PathVariable("userStatus") UserStatus userStatus) {
		try {
			List<User> users = service.getEmployeeDetailsByStatus(userStatus);
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/getCustomerByStatus/{userStatus}")
	public ResponseEntity<?> getCustomerDetailsByStatus(@PathVariable("userStatus") UserStatus userStatus) {
		try {
			List<User> users = service.getCustomerDetailsByStatus(userStatus);
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping("/getContentWriterByStatus/{userStatus}")
	public ResponseEntity<?> getContentWriterByStatus(@PathVariable("userStatus") UserStatus userStatus) {
		try {
			List<User> users = service.getContentWriterDetailsByStatus(userStatus);
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/getManagerById/{userId}")
	public ResponseEntity<?> getManagerById(@PathVariable("userId") int userId) {

		try {
			if (service.getManagerById(userId) != null) {
				
				return new ResponseEntity<User>(service.getManagerById(userId), HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid manager userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/getEmployeeById/{userId}")
	public ResponseEntity<?> getEmployeeById(@PathVariable("userId") int userId) {

		try {
			if (service.getEmployeeById(userId) != null) {
				
				return new ResponseEntity<User>(service.getEmployeeById(userId), HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/getCustomerById/{userId}")
	public ResponseEntity<?> getCustomerById(@PathVariable("userId") int userId) {

		try {
			if (service.getCustomerById(userId) != null) {
				
				return new ResponseEntity<User>(service.getCustomerById(userId), HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid customer userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}
	
	@GetMapping("/getContentWriterById/{userId}")
	public ResponseEntity<?> getContentWriterById(@PathVariable("userId") int userId) {

		try {
			if (service.getContentWriterById(userId) != null) {
				
				return new ResponseEntity<User>(service.getCustomerById(userId), HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid ContentWriter userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}

	@PutMapping("/updatePassword/{userName}")
	public ResponseEntity<?> updateAdmin(@PathVariable("userName") String userName, @RequestBody User user) {
		try {
			String encode = bCryptPasswordEncoder.encode(user.getPassword());
			user.setPassword(encode);
			if (service.updatePassword(user, userName) != null) {
				LOG.log(Level.INFO, "/updatePassword/{userName} - > " + "Password is Updated for: "+userName);

				return new ResponseEntity<User>(service.updatePassword(user, userName), HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid Admin userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteManager/{userId}")
	public ResponseEntity<?> deleteManager(@PathVariable("userId") int userId) {
		try {
			boolean deleteManager = service.deleteManager(userId);
			if (deleteManager == true) {
				LOG.log(Level.INFO, "/deleteManager/{userId} - > " + "Successfully Deleted User with id: " + userId);

				return new ResponseEntity<String>("Successfully Deleted User with id: " + userId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid manager userId: ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteEmployee/{userId}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("userId") int userId) {
		try {
			boolean deleteEmployee = service.deleteEmployee(userId);
			if (deleteEmployee == true) {
				
				LOG.log(Level.INFO, "/deleteEmployee/{userId} - > " + "Successfully Deleted User with id: " + userId);

				return new ResponseEntity<String>("Successfully Deleted User with id: " + userId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid employee userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/deleteCustomer/{userId}")
	public ResponseEntity<?> deleteCustomer(@PathVariable("userId") int userId) {
		try {
			boolean deleteCustomer = service.deleteCustomer(userId);
			if (deleteCustomer == true) {
				
				LOG.log(Level.INFO, "/deleteCustomer/{userId} - > " + "Successfully Deleted User with id: " + userId);

				return new ResponseEntity<String>("Successfully Deleted User with id: " + userId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid customer userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	
	@DeleteMapping("/deleteContentWriter/{userId}")
	public ResponseEntity<?> deleteContentWriter(@PathVariable("userId") int userId) {
		try {
			boolean deleteCustomer = service.deleteContentWriter(userId);
			if (deleteCustomer == true) {
				
				LOG.log(Level.INFO, "/deleteContentWriter/{userId} - > " + "Successfully Deleted User with id: " + userId);

				return new ResponseEntity<String>("Successfully Deleted User with id: " + userId, HttpStatus.OK);
			} else {
				return new ResponseEntity<String>("Please provide valid ContentWriter userId ", HttpStatus.BAD_REQUEST);
			}
		} catch (UserNotFoundException exception) {
			return new ResponseEntity<String>(exception.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	

	@GetMapping("/getRoleByUserName/{userName}")
	public ResponseEntity<String> getRoleByUserName(@PathVariable("userName") String UserName) {
		try {
			
			String response = service.getRoleByUserName(UserName);
			LOG.log(Level.INFO, "/getRoleByUserName/{userName} - > " + response);
			return new ResponseEntity<String>(response, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@GetMapping("/getUserByUserName/{userName}")
	public ResponseEntity<?> getUserByUserName(@PathVariable("userName") String UserName) {
		try {
			
			return new ResponseEntity<User>(service.getUserByUserName(UserName), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/sendOtpToEmail/{email}")
	public ResponseEntity<?> sendOtpToEmail(@PathVariable("email") String email) {
		try {
			
			LOG.log(Level.INFO, "/sendOtpToEmail/{email} - > " + email);

			return new ResponseEntity<String>(service.sendOtpEmail(email), HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping("/validateOTP")
	public ResponseEntity<?> validateOTP(@RequestBody OTPValidationRequest validateOtp) throws InvalidOTP, UserNotFoundException{
		try {
			return new ResponseEntity<String>(service.validateOTP(validateOtp),HttpStatus.OK);
		}catch (InvalidOTP e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

}