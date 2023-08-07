package com.axis.transaction.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.transaction.model.Account;
import com.axis.transaction.model.User;


@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    
	
	public List<Account> findByUserAccount(User user);
	
	public Account findByAccountNumber(Long accountNumber);
}
