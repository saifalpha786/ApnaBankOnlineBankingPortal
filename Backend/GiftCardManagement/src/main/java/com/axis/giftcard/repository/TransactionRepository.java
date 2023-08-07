package com.axis.giftcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.giftcard.model.Transaction;
import com.axis.giftcardenum.TransactionStatus;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	public Transaction findByCustomerAccountNumber(Long customerAccountNumber);

	public List<Transaction> findByTransactionStatus(TransactionStatus transactionStatus);

	public List<Transaction> findByCustomerUserName(String customerUserName);

}
