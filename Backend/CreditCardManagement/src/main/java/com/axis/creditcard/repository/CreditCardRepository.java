package com.axis.creditcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.creditcard.model.CreditCard;
import com.axis.creditcard.model.CreditCardRequiredDocument;
import com.axis.enumcreditcard.CreditCardStatus;
import com.axis.enumcreditcard.CreditCardType;

@Repository
public interface CreditCardRepository extends JpaRepository<CreditCard, Long>{

	public List<CreditCard> findByRequiredDocument(CreditCardRequiredDocument requiredDocument);
	
	public List<CreditCard> findByCreditCardType(CreditCardType creditCardType);
	
	public List<CreditCard> findByCreditCardStatus(CreditCardStatus creditCardStatus);
	
	public CreditCard findByCreditCardNumber(String creditCardNumber);
}
