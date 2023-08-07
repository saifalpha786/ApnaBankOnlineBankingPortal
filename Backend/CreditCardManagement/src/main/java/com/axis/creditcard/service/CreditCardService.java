package com.axis.creditcard.service;

import java.util.List;

import com.axis.creditcard.exception.AccountNotExist;
import com.axis.creditcard.exception.CreditCardNotExist;
import com.axis.creditcard.model.CreditCard;
import com.axis.creditcard.model.CreditCardTransaction;
import com.axis.enumcreditcard.CreditCardStatus;
import com.axis.enumcreditcard.CreditCardType;

public interface CreditCardService {

	String getCurrentLoginUser();

	String applyForNewCreditCard(CreditCard creditCard) throws AccountNotExist;

	CreditCard getCreditCardById(Long creditCardId) throws CreditCardNotExist;

	List<CreditCard> getListOfCreditCard() throws CreditCardNotExist;

	List<CreditCard> getCreditCardByType(CreditCardType creditCardType) throws CreditCardNotExist;

	List<CreditCard> getCreditCardByStatus(CreditCardStatus creditCardStatus) throws CreditCardNotExist;

	String approveOrRejectOrBlockedOrClosed(CreditCard creditCard, Long creditCardId) throws CreditCardNotExist;

	String withdrawFromCreditCard(CreditCard creditCard, double amount) throws CreditCardNotExist;

	String repaymentOfCreditCard(String creditCardNumber, double customAmount) throws CreditCardNotExist;

	List<CreditCardTransaction> getListOfTransaction(String creditCardNumber) throws CreditCardNotExist;

	List<CreditCardTransaction> getListOfAllTransaction() throws CreditCardNotExist;

}
