package com.axis.creditcard.model;

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

import com.axis.enumcreditcard.WorkType;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "CreditCardRequiredDocument")
public class CreditCardRequiredDocument {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "DocumentId")
	private int documentId;
	@Column(name = "CustomerFirstName")
	private String customerFirstName;
	@Column(name = "CustomerLastName")
	private String customerLastName;
	@Column(name = "CustomerEmailId")
	private String customerEmailId;
	@Column(name = "customerPhoneNumber")
	private String customerPhoneNumber;
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
	@Column(name = "userCreditCard")
	private List<CreditCard> userCreditCard;

	public CreditCardRequiredDocument() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreditCardRequiredDocument(int documentId, String customerFirstName, String customerLastName,
			String customerEmailId, String customerPhoneNumber, long customerAccountNumber, String aadharCardNumber,
			String panCard, WorkType workType, double monthlyEarning, List<CreditCard> userCreditCard) {
		super();
		this.documentId = documentId;
		this.customerFirstName = customerFirstName;
		this.customerLastName = customerLastName;
		this.customerEmailId = customerEmailId;
		this.customerPhoneNumber = customerPhoneNumber;
		this.customerAccountNumber = customerAccountNumber;
		this.aadharCardNumber = aadharCardNumber;
		this.panCard = panCard;
		this.workType = workType;
		this.monthlyEarning = monthlyEarning;
		this.userCreditCard = userCreditCard;
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

	public String getCustomerEmailId() {
		return customerEmailId;
	}

	public void setCustomerEmailId(String customerEmailId) {
		this.customerEmailId = customerEmailId;
	}

	public String getCustomerPhoneNumber() {
		return customerPhoneNumber;
	}

	public void setCustomerPhoneNumber(String customerPhoneNumber) {
		this.customerPhoneNumber = customerPhoneNumber;
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

	public List<CreditCard> getUserCreditCard() {
		return userCreditCard;
	}

	public void setUserCreditCard(List<CreditCard> userCreditCard) {
		this.userCreditCard = userCreditCard;
	}

	@Override
	public String toString() {
		return "CreditCardRequiredDocument [documentId=" + documentId + ", customerFirstName=" + customerFirstName
				+ ", customerLastName=" + customerLastName + ", customerEmailId=" + customerEmailId
				+ ", customerPhoneNumber=" + customerPhoneNumber + ", customerAccountNumber=" + customerAccountNumber
				+ ", aadharCardNumber=" + aadharCardNumber + ", panCard=" + panCard + ", workType=" + workType
				+ ", monthlyEarning=" + monthlyEarning + ", userCreditCard=" + userCreditCard + "]";
	}

}
