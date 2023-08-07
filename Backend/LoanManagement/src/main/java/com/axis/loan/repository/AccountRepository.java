package com.axis.loan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.loan.model.Account;
import com.axis.loan.model.User;



@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    
	
	public List<Account> findByUserAccount(User user);
	
	public Account findByAccountNumber(Long accountNumber);
}
