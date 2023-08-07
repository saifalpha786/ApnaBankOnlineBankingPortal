package com.axis.creditcard.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.axis.enumcreditcard.CreditCardStatus;
import com.axis.enumcreditcard.CreditCardType;

@Entity
@Table(name = "CreditCard")
public class CreditCard {

	@Id
	@Column(name = "CreditCardId")
	private Long creditCardId;
	@Column(name = "ApplicationDate")
	private LocalDateTime applicationDate;
	@Column(name = "ApprovalDate")
	private LocalDateTime approvalDate;
	@Enumerated(EnumType.STRING)
	@Column(name = "CreditCardStatus")
	private CreditCardStatus creditCardStatus;
	@Enumerated(EnumType.STRING)
	@Column(name = "CreditCardType")
	private CreditCardType creditCardType;
	@Column(name = "CardJoiningFees")
	private double cardJoiningFees;
	@Column(name = "CardAnnualFees")
	private double cardAnnualFees;
	@Column(name = "creditCardNumber", unique = true)
	private String creditCardNumber;
	@Column(name = "ValidFrom")
	private LocalDate validFrom;
	@Column(name = "ValidTo")
	private LocalDate validTo;
	@Column(name = "CVV")
	private int cardVerificationValue;
	@Column(name = "creditCardLimit")
	private double creditCardLimit;
	@Column(name = "totalOutstanding")
	private double totalOutstanding;
	@ManyToOne
	@JoinColumn(name = "DocumentId")
	private CreditCardRequiredDocument requiredDocument;

	public CreditCard() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreditCard(Long creditCardId, LocalDateTime applicationDate, LocalDateTime approvalDate,
			CreditCardStatus creditCardStatus, CreditCardType creditCardType, double cardJoiningFees,
			double cardAnnualFees, String creditCardNumber, LocalDate validFrom, LocalDate validTo,
			int cardVerificationValue, double creditCardLimit, double totalOutstanding,
			CreditCardRequiredDocument requiredDocument) {
		super();
		this.creditCardId = creditCardId;
		this.applicationDate = applicationDate;
		this.approvalDate = approvalDate;
		this.creditCardStatus = creditCardStatus;
		this.creditCardType = creditCardType;
		this.cardJoiningFees = cardJoiningFees;
		this.cardAnnualFees = cardAnnualFees;
		this.creditCardNumber = creditCardNumber;
		this.validFrom = validFrom;
		this.validTo = validTo;
		this.cardVerificationValue = cardVerificationValue;
		this.creditCardLimit = creditCardLimit;
		this.totalOutstanding = totalOutstanding;
		this.requiredDocument = requiredDocument;
	}

	public Long getCreditCardId() {
		return creditCardId;
	}

	public void setCreditCardId(Long creditCardId) {
		this.creditCardId = creditCardId;
	}

	public LocalDateTime getApplicationDate() {
		return applicationDate;
	}

	public void setApplicationDate(LocalDateTime applicationDate) {
		this.applicationDate = applicationDate;
	}

	public LocalDateTime getApprovalDate() {
		return approvalDate;
	}

	public void setApprovalDate(LocalDateTime approvalDate) {
		this.approvalDate = approvalDate;
	}

	public CreditCardStatus getCreditCardStatus() {
		return creditCardStatus;
	}

	public void setCreditCardStatus(CreditCardStatus creditCardStatus) {
		this.creditCardStatus = creditCardStatus;
	}

	public CreditCardType getCreditCardType() {
		return creditCardType;
	}

	public void setCreditCardType(CreditCardType creditCardType) {
		this.creditCardType = creditCardType;
	}

	public double getCardJoiningFees() {
		return cardJoiningFees;
	}

	public void setCardJoiningFees(double cardJoiningFees) {
		this.cardJoiningFees = cardJoiningFees;
	}

	public double getCardAnnualFees() {
		return cardAnnualFees;
	}

	public void setCardAnnualFees(double cardAnnualFees) {
		this.cardAnnualFees = cardAnnualFees;
	}

	public String getCreditCardNumber() {
		return creditCardNumber;
	}

	public void setCreditCardNumber(String creditCardNumber) {
		this.creditCardNumber = creditCardNumber;
	}

	public LocalDate getValidFrom() {
		return validFrom;
	}

	public void setValidFrom(LocalDate validFrom) {
		this.validFrom = validFrom;
	}

	public LocalDate getValidTo() {
		return validTo;
	}

	public void setValidTo(LocalDate validTo) {
		this.validTo = validTo;
	}

	public int getCardVerificationValue() {
		return cardVerificationValue;
	}

	public void setCardVerificationValue(int cardVerificationValue) {
		this.cardVerificationValue = cardVerificationValue;
	}

	public double getCreditCardLimit() {
		return creditCardLimit;
	}

	public void setCreditCardLimit(double creditCardLimit) {
		this.creditCardLimit = creditCardLimit;
	}

	public double getTotalOutstanding() {
		return totalOutstanding;
	}

	public void setTotalOutstanding(double totalOutstanding) {
		this.totalOutstanding = totalOutstanding;
	}

	public CreditCardRequiredDocument getRequiredDocument() {
		return requiredDocument;
	}

	public void setRequiredDocument(CreditCardRequiredDocument requiredDocument) {
		this.requiredDocument = requiredDocument;
	}

	@Override
	public String toString() {
		return "CreditCard [creditCardId=" + creditCardId + ", applicationDate=" + applicationDate + ", approvalDate="
				+ approvalDate + ", creditCardStatus=" + creditCardStatus + ", creditCardType=" + creditCardType
				+ ", cardJoiningFees=" + cardJoiningFees + ", cardAnnualFees=" + cardAnnualFees + ", creditCardNumber="
				+ creditCardNumber + ", validFrom=" + validFrom + ", validTo=" + validTo + ", cardVerificationValue="
				+ cardVerificationValue + ", creditCardLimit=" + creditCardLimit + ", totalOutstanding="
				+ totalOutstanding + ", requiredDocument=" + requiredDocument + "]";
	}

}
