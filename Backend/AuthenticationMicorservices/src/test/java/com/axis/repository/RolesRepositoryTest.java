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
import com.axis.model.Roles;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class RolesRepositoryTest {
	
	
	@Autowired
	private RolesRepository roleRepo;
	
	@Autowired
	TestEntityManager testEntityManager;
	
	public Roles role;

	@BeforeEach
	public void setUp() {
		role = new Roles();
		role.setRoleName("CUSTOMER");
	}
	
	@AfterEach
	public void tearDown() {
	    role = null;
	    roleRepo.deleteAll();
	}

	@Test
	public void testSave() {
		roleRepo.save(role);
		Roles test = roleRepo.findById(role.getRoleId()).get();
		assertEquals(role.getRoleId(), test.getRoleId());
	}

	@Test
	public void testFindAll() {
		roleRepo.save(role);
		assertEquals(false, roleRepo.findAll().isEmpty());
	}

	@Test
	public void testFindById() {
		roleRepo.save(role);
		Roles test = roleRepo.findById(role.getRoleId()).get();
		assertEquals(role.getRoleId(), test.getRoleId());
	}

	@Test
	public void testDelete() {
		roleRepo.save(role);
		roleRepo.delete(role);
		Optional<Roles> test = roleRepo.findById(role.getRoleId());
		assertEquals(true, test.isEmpty());
	}

}
