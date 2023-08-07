package com.axis.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.axis.enummodel.AccountStatus;
import com.axis.enummodel.AccountType;
import com.axis.model.Account;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AccountRepositoryTest {

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	TestEntityManager testEntityManager;

	public Account account;

	@BeforeEach
	public void setUp() {

		account = new Account();
		account.setAccountNumber(997788255L);
		account.setAccountStatus(AccountStatus.ACTIVE);
		account.setAccountType(AccountType.SAVINGS_ACCOUNT);
		account.setAvailableBalance(20000);

	}

	@AfterEach
	public void tearDown() {
		account = null;
		accountRepo.deleteAll();
	}

	@Test
	public void testSave() {
		accountRepo.save(account);
		Account test = accountRepo.findById(account.getAccountId()).get();
		assertEquals(account.getAccountId(), test.getAccountId());
	}

	@Test
	public void testFindAll() {
		accountRepo.save(account);
		assertEquals(false, accountRepo.findAll().isEmpty());
	}

	@Test
	public void testFindById() {
		accountRepo.save(account);
		Account test = accountRepo.findById(account.getAccountId()).get();
		assertEquals(account.getAccountId(), test.getAccountId());
	}

	@Test
	public void testDelete() {
		accountRepo.save(account);
		accountRepo.delete(account);
		Optional<Account> test = accountRepo.findById(account.getAccountId());
		assertEquals(true, test.isEmpty());
	}

}
