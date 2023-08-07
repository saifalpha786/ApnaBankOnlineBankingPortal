package com.axis.creditcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.creditcard.model.Account;
import com.axis.creditcard.model.User;




@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    
	
	public List<Account> findByUserAccount(User user);
	
	public Account findByAccountNumber(Long accountNumber);
}
