package com.axis.loan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.loan.model.User;




@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByEmailId(String emailId);
}
