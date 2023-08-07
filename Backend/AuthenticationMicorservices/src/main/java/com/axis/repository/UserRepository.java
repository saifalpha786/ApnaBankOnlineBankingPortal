package com.axis.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.enummodel.UserStatus;
import com.axis.model.Roles;
import com.axis.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByEmailId(String emailId);
	
	public User findByUserPhoneNumber(String userPhoneNumber);
	
	public List<User> findByUserStatus(UserStatus userStatus);

	
	

}
