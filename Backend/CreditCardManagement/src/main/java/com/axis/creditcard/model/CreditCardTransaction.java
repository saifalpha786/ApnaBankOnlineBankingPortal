package com.axis.creditcard.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.axis.enumcreditcard.CreditCardType;
import com.axis.enumcreditcard.TransactionType;

@Entity
@Table(name = "CreditCardTransaction")
public class CreditCardTransaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "creditCardTransactionId")
	private long creditCardTransactionId;

	@Column(name = "creditCardNumber")
	private String creditCardNumber;

	@Column(name = "userName")
	private String userName;

	@Column(name = "transactionAmount")
	private double transactionAmount;

	@Column(name = "creditCardType")
	@Enumerated(EnumType.STRING)
	private CreditCardType creditCardType;

	@Column(name = "transactionTime")
	private LocalDateTime transactionTime;

	@Column(name = "transactionType")
	@Enumerated(EnumType.STRING)
	private TransactionType transactionType;

	public CreditCardTransaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreditCardTransaction(long creditCardTransactionId, String creditCardNumber, String userName,
			double transactionAmount, CreditCardType creditCardType, LocalDateTime transactionTime,
			TransactionType transactionType) {
		super();
		this.creditCardTransactionId = creditCardTransactionId;
		this.creditCardNumber = creditCardNumber;
		this.userName = userName;
		this.transactionAmount = transactionAmount;
		this.creditCardType = creditCardType;
		this.transactionTime = transactionTime;
		this.transactionType = transactionType;
	}

	public long getCreditCardTransactionId() {
		return creditCardTransactionId;
	}

	public void setCreditCardTransactionId(long creditCardTransactionId) {
		this.creditCardTransactionId = creditCardTransactionId;
	}

	public String getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(String creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public double getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(double transactionAmount) {
		this.transactionAmount = transactionAmount;
	}

	public CreditCardType getCreditCardType() {
		return creditCardType;
	}

	public void setCreditCardType(CreditCardType creditCardType) {
		this.creditCardType = creditCardType;
	}

	public LocalDateTime getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(LocalDateTime transactionTime) {
		this.transactionTime = transactionTime;
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}

	@Override
	public String toString() {
		return "CreditCardTransaction [creditCardTransactionId=" + creditCardTransactionId + ", creditCardNumber="
				+ creditCardNumber + ", userName=" + userName + ", transactionAmount=" + transactionAmount
				+ ", creditCardType=" + creditCardType + ", transactionTime=" + transactionTime + ", transactionType="
				+ transactionType + "]";
	}

}