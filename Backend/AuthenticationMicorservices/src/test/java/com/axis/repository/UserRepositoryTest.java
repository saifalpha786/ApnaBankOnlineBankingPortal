package com.axis.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.axis.enummodel.AccountType;
import com.axis.enummodel.UserStatus;
import com.axis.model.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
	
	@Autowired
	private UserRepository repo;
	@Autowired
	TestEntityManager testEntityManager;
	public User user;

	@BeforeEach
	public void setUp() {

		user = new User();
		user.setUserId(101);
        user.setUserFirstName("John");
        user.setUserLastName("Doe");
        user.setUserPhoneNumber("8707683323");
        user.setEmailId("johndoe@example.com");
        user.setPassword("password123");
        user.setAccountTypeRequest(AccountType.SAVINGS_ACCOUNT.toString());
        user.setUserStatus(UserStatus.PENDING);
        
 
      
		
	}

	@AfterEach
	  public void tearDown() {
	  user=null;
	  repo.deleteAll();
	  }
	  @Test
	  public void testSave() {
		  repo.save(user);
		  User test=repo.findById(user.getUserId()).get();
		  assertEquals(user.getUserId(),test.getUserId());
	  }
	  
	  @Test
	  public void testFindAll() {
		  repo.save(user);
		  assertEquals(false,repo.findAll().isEmpty());
	  }
	  @Test 
	  public void testFindById() {
		  repo.save(user);
		  User test=repo.findById(user.getUserId()).get();
		  assertEquals(user.getUserId(),test.getUserId());  
	  }
	  
	  @Test
	  public void testfindByEmailId() {
		  repo.save(user);
		  User test = repo.findByEmailId(user.getEmailId());
		  assertEquals(user.getEmailId(), test.getEmailId());
	  }
	  @Test
	  public void testfindByUserPhoneNumber() {
		  repo.save(user);
		  User test = repo.findByUserPhoneNumber(user.getUserPhoneNumber());
		  assertEquals(user.getUserPhoneNumber(), test.getUserPhoneNumber());
	  }
	  @Test
	  public void testfindByUserStatus() {
		  repo.save(user);
		  List<User> test = repo.findByUserStatus(user.getUserStatus());
		  assertEquals(user.getUserStatus(), test.get(0).getUserStatus());
	  }
//	  @Test
//	  public void testDelete() {
//		  repo.save(user);
//		  repo.delete(user);
//		  Optional<User> test=repo.findById(user.getUserId());
//		  assertEquals(true,test.isEmpty());
//	  }

}
