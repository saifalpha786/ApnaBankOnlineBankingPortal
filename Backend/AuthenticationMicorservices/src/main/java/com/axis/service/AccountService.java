package com.axis.service;

import java.util.List;

import com.axis.exception.AccountAlreadyExistsException;
import com.axis.exception.AccountNotFoundException;
import com.axis.model.Account;

public interface AccountService {
	String getCurrentLoginUser();

	public Account createManagerAccount(Account account) throws AccountAlreadyExistsException;

	public Account createEmployeeAccount(Account account) throws AccountAlreadyExistsException;

	public Account createCustomerAccount(Account account) throws AccountAlreadyExistsException;
	
	public Account createContentWriterAccount(Account account) throws AccountAlreadyExistsException;

	public boolean deleteManagerAccount(int accountId) throws AccountNotFoundException;

	public boolean deleteEmployeeAccount(int accountId) throws AccountNotFoundException;

	public boolean deleteCustomerAccount(int accountId) throws AccountNotFoundException;
	
	public boolean deleteContentWriterAccount(int accountId) throws AccountNotFoundException;

	public Account updateManagerAccount(Account account, int accountId) throws AccountNotFoundException;

	public Account updateEmployeeAccount(Account account, int accountId) throws AccountNotFoundException;

	public Account updateCustomerAccount(Account account, int accountId) throws AccountNotFoundException;
	
	public Account updateContentWriterAccount(Account account, int accountId) throws AccountNotFoundException;

	public List<Account> getAllAccount() throws AccountNotFoundException;

	public Account getManagerAccountById(int accountId) throws AccountNotFoundException;

	public Account getEmployeeAccountById(int accountId) throws AccountNotFoundException;

	public Account getCustomerAccountById(int accountId) throws AccountNotFoundException;
	
	public Account getContentWriterAccountById(int accountId) throws AccountNotFoundException; 
	
	public Account getUserAccountByUserName(String userName) throws AccountNotFoundException; 

}
