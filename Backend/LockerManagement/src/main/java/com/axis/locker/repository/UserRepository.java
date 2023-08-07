package com.axis.locker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.locker.model.User;






@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByEmailId(String emailId);
}
