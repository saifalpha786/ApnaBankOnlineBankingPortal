package com.axis.creditcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.creditcard.model.CreditCardTransaction;

public interface CreditCardTransactionRepository extends JpaRepository<CreditCardTransaction, Long> {

	public List<CreditCardTransaction> findByCreditCardNumber(String creditCardNumber);
}
