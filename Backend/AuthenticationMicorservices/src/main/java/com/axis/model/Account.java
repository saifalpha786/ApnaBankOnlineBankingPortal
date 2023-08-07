package com.axis.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.axis.enummodel.AccountStatus;
import com.axis.enummodel.AccountType;

@Entity
@Table(name = "Account")
public class Account {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "AccountId")
	private int accountId;
	@Column(name = "AccountNumber",unique=true)
	private Long accountNumber;
	@Column(name = "AvailableBalance")
	private double availableBalance;
	@Enumerated(EnumType.STRING)
	@Column(name = "AccountType")
	private AccountType accountType;
	@Enumerated(EnumType.STRING)
	@Column(name = "AccountStatus")
	private AccountStatus accountStatus;
	@ManyToOne
	@JoinColumn(name = "UserId")
	private User userAccount;

	public Account() {
		super();

	}

	public Account(int accountId, Long accountNumber, double availableBalance, AccountType accountType,
			AccountStatus accountStatus, User userAccount) {
		super();
		this.accountId = accountId;
		this.accountNumber = accountNumber;
		this.availableBalance = availableBalance;
		this.accountType = accountType;
		this.accountStatus = accountStatus;
		this.userAccount = userAccount;
	}

	public int getAccountId() {
		return accountId;
	}

	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}

	public Long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(Long accountNumber) {
		this.accountNumber = accountNumber;
	}

	public double getAvailableBalance() {
		return availableBalance;
	}

	public void setAvailableBalance(double availableBalance) {
		this.availableBalance = availableBalance;
	}

	public AccountType getAccountType() {
		return accountType;
	}

	public void setAccountType(AccountType accountType) {
		this.accountType = accountType;
	}

	public AccountStatus getAccountStatus() {
		return accountStatus;
	}

	public void setAccountStatus(AccountStatus accountStatus) {
		this.accountStatus = accountStatus;
	}

	public User getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(User userAccount) {
		this.userAccount = userAccount;
	}

	@Override
	public String toString() {
		return "Account [accountId=" + accountId + ", accountNumber=" + accountNumber + ", availableBalance="
				+ availableBalance + ", accountType=" + accountType + ", accountStatus=" + accountStatus
				+ ", userAccount=" + userAccount + "]";
	}

	

}
