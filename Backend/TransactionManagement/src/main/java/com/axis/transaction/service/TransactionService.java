package com.axis.transaction.service;

import java.util.List;

import com.axis.enumtransaction.AccountType;
import com.axis.enumtransaction.TransactionStatus;
import com.axis.transaction.exception.AccountNotExist;
import com.axis.transaction.exception.TransactionNotFoundException;
import com.axis.transaction.model.Transaction;

public interface TransactionService {
	
	String getCurrentLoginUser();
	
//	Transaction deposit(Transaction transaction,Long accountNumber);
	
	double getCurrentBalance(Long accountNumber)throws AccountNotExist;
	
	String withdrawBalance(Transaction transaction)throws AccountNotExist;
	
	AccountType getAccountType(Long accountNumber);
	
	List<Transaction> getTransactionByStatus(TransactionStatus transactionStatus) throws TransactionNotFoundException;
	
	String approvePendingTransaction(long transactionId) throws TransactionNotFoundException;
	
	String transferAmount(Transaction transaction)throws AccountNotExist,Exception; 
	
	String requestToDepositAmount(Transaction transaction)throws AccountNotExist;
	
	List<Transaction> getAllTransaction() throws TransactionNotFoundException;
	
	List<Transaction> getTransactionsForCurrentUser();
	
	List<Transaction> getTransactionsDataForCurrentUser()throws TransactionNotFoundException;
	
	String creditRedeemPointToUserAccount(Long accountNumber, double redeemPoint) throws AccountNotExist;
	

}