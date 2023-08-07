package com.axis.loan.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.axis.enumloan.WorkType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "LoanRequiredDocument")
public class LoanRequiredDocument {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DocumentId")
	private int documentId;
	@Column(name = "CustomerFirstName")
	private String customerFirstName;
	@Column(name = "CustomerLastName")
	private String customerLastName;
	@Column(name = "customerPhoneNumber")
	private String customerPhoneNumber;
	@Column(name = "CustomerEmailId")
	private String customerEmailId;
	@Column(name = "CustomerAccountNumber")
	private long customerAccountNumber;
	@Column(name = "AadharCardNumber")
	private String aadharCardNumber;
	@Column(name = "PanCard")
	private String panCard;
	@Enumerated(EnumType.STRING)
	@Column(name = "WorkType")
	private WorkType workType;
	@Column(name = "MonthlyEarning")
	private double monthlyEarning;
	@JsonIgnore
	@OneToMany(mappedBy = "requiredDocument", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@Column(name = "userLoan")
	private List<Loan> userLoan;

	public LoanRequiredDocument() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LoanRequiredDocument(int documentId, String customerFirstName, String customerLastName,
			String customerPhoneNumber, String customerEmailId, long customerAccountNumber, String aadharCardNumber,
			String panCard, WorkType workType, double monthlyEarning, List<Loan> userLoan) {
		super();
		this.documentId = documentId;
		this.customerFirstName = customerFirstName;
		this.customerLastName = customerLastName;
		this.customerPhoneNumber = customerPhoneNumber;
		this.customerEmailId = customerEmailId;
		this.customerAccountNumber = customerAccountNumber;
		this.aadharCardNumber = aadharCardNumber;
		this.panCard = panCard;
		this.workType = workType;
		this.monthlyEarning = monthlyEarning;
		this.userLoan = userLoan;
	}

	public int getDocumentId() {
		return documentId;
	}

	public void setDocumentId(int documentId) {
		this.documentId = documentId;
	}

	public String getCustomerFirstName() {
		return customerFirstName;
	}

	public void setCustomerFirstName(String customerFirstName) {
		this.customerFirstName = customerFirstName;
	}

	public String getCustomerLastName() {
		return customerLastName;
	}

	public void setCustomerLastName(String customerLastName) {
		this.customerLastName = customerLastName;
	}

	public String getCustomerPhoneNumber() {
		return customerPhoneNumber;
	}

	public void setCustomerPhoneNumber(String customerPhoneNumber) {
		this.customerPhoneNumber = customerPhoneNumber;
	}

	public String getCustomerEmailId() {
		return customerEmailId;
	}

	public void setCustomerEmailId(String customerEmailId) {
		this.customerEmailId = customerEmailId;
	}

	public long getCustomerAccountNumber() {
		return customerAccountNumber;
	}

	public void setCustomerAccountNumber(long customerAccountNumber) {
		this.customerAccountNumber = customerAccountNumber;
	}

	public String getAadharCardNumber() {
		return aadharCardNumber;
	}

	public void setAadharCardNumber(String aadharCardNumber) {
		this.aadharCardNumber = aadharCardNumber;
	}

	public String getPanCard() {
		return panCard;
	}

	public void setPanCard(String panCard) {
		this.panCard = panCard;
	}

	public WorkType getWorkType() {
		return workType;
	}

	public void setWorkType(WorkType workType) {
		this.workType = workType;
	}

	public double getMonthlyEarning() {
		return monthlyEarning;
	}

	public void setMonthlyEarning(double monthlyEarning) {
		this.monthlyEarning = monthlyEarning;
	}

	public List<Loan> getUserLoan() {
		return userLoan;
	}

	public void setUserLoan(List<Loan> userLoan) {
		this.userLoan = userLoan;
	}

	@Override
	public String toString() {
		return "LoanRequiredDocument [documentId=" + documentId + ", customerFirstName=" + customerFirstName
				+ ", customerLastName=" + customerLastName + ", customerPhoneNumber=" + customerPhoneNumber
				+ ", customerEmailId=" + customerEmailId + ", customerAccountNumber=" + customerAccountNumber
				+ ", aadharCardNumber=" + aadharCardNumber + ", panCard=" + panCard + ", workType=" + workType
				+ ", monthlyEarning=" + monthlyEarning + ", userLoan=" + userLoan + "]";
	}

}
