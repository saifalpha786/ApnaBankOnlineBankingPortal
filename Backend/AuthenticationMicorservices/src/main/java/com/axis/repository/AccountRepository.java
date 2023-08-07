package com.axis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.model.Account;
import com.axis.model.User;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
	
	public Account findByUserAccount(User userAccount);

}
