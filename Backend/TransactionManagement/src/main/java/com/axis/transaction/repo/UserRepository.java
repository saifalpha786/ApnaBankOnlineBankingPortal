package com.axis.transaction.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.transaction.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByEmailId(String emailId);
}
