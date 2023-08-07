package com.axis.loan.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.axis.enumloan.TransactionStatus;
import com.axis.enumloan.TransactionType;



@Entity
@Table(name = "Transaction")
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TransactionId")
	private long transactionId;

	@Column(name = "CustomerAccountNumber")
	private long customerAccountNumber;

	@Column(name = "CustomerUserName")
	private String customerUserName;

	@Column(name = "TargetAccountNumber")
	private long targetAccountNumber;

	@Column(name = "TargetIFSCCode")
	private String targetIFSCCode;

	@Column(name = "TargetOwnerName")
	private String targetOwnerName;

	@Column(name = "Amount")
	private double amount;

	@Column(name = "InitiationDate")
	private LocalDateTime initiationDate;

	@Enumerated(EnumType.STRING)
	@Column(name = "transactionType")
	private TransactionType transactionType;

	@Enumerated(EnumType.STRING)
	@Column(name = "transactionStatus")
	private TransactionStatus transactionStatus;

	@Column(name = "TransactionNote")
	private String transactionNote;

	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Transaction(long transactionId, long customerAccountNumber, String customerUserName,
			long targetAccountNumber, String targetIFSCCode, String targetOwnerName, double amount,
			LocalDateTime initiationDate, TransactionType transactionType, TransactionStatus transactionStatus,
			String transactionNote) {
		super();
		this.transactionId = transactionId;
		this.customerAccountNumber = customerAccountNumber;
		this.customerUserName = customerUserName;
		this.targetAccountNumber = targetAccountNumber;
		this.targetIFSCCode = targetIFSCCode;
		this.targetOwnerName = targetOwnerName;
		this.amount = amount;
		this.initiationDate = initiationDate;
		this.transactionType = transactionType;
		this.transactionStatus = transactionStatus;
		this.transactionNote = transactionNote;
	}

	public long getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(long transactionId) {
		this.transactionId = transactionId;
	}

	public long getCustomerAccountNumber() {
		return customerAccountNumber;
	}

	public void setCustomerAccountNumber(long customerAccountNumber) {
		this.customerAccountNumber = customerAccountNumber;
	}

	public String getCustomerUserName() {
		return customerUserName;
	}

	public void setCustomerUserName(String customerUserName) {
		this.customerUserName = customerUserName;
	}

	public long getTargetAccountNumber() {
		return targetAccountNumber;
	}

	public void setTargetAccountNumber(long targetAccountNumber) {
		this.targetAccountNumber = targetAccountNumber;
	}

	public String getTargetIFSCCode() {
		return targetIFSCCode;
	}

	public void setTargetIFSCCode(String targetIFSCCode) {
		this.targetIFSCCode = targetIFSCCode;
	}

	public String getTargetOwnerName() {
		return targetOwnerName;
	}

	public void setTargetOwnerName(String targetOwnerName) {
		this.targetOwnerName = targetOwnerName;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public LocalDateTime getInitiationDate() {
		return initiationDate;
	}

	public void setInitiationDate(LocalDateTime initiationDate) {
		this.initiationDate = initiationDate;
	}

	public TransactionType getTransactionType() {
		return transactionType;
	}

	public void setTransactionType(TransactionType transactionType) {
		this.transactionType = transactionType;
	}

	public TransactionStatus getTransactionStatus() {
		return transactionStatus;
	}

	public void setTransactionStatus(TransactionStatus transactionStatus) {
		this.transactionStatus = transactionStatus;
	}

	public String getTransactionNote() {
		return transactionNote;
	}

	public void setTransactionNote(String transactionNote) {
		this.transactionNote = transactionNote;
	}

	@Override
	public String toString() {
		return "Transaction [transactionId=" + transactionId + ", customerAccountNumber=" + customerAccountNumber
				+ ", customerUserName=" + customerUserName + ", targetAccountNumber=" + targetAccountNumber
				+ ", targetIFSCCode=" + targetIFSCCode + ", targetOwnerName=" + targetOwnerName + ", amount=" + amount
				+ ", initiationDate=" + initiationDate + ", transactionType=" + transactionType + ", transactionStatus="
				+ transactionStatus + ", transactionNote=" + transactionNote + "]";
	}

}
