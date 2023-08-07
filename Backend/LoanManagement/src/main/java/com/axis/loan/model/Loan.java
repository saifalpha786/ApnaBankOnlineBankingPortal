package com.axis.loan.model;

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
import com.axis.enumloan.LoanStatus;
import com.axis.enumloan.LoanType;

@Entity
@Table(name = "Loan")
public class Loan {
	@Id
	@Column(name = "LoanId")
	private Long loanId;
	@Column(name = "ApplicationDate")
	private LocalDateTime applicationDate;
	@Column(name = "ApprovalDate")
	private LocalDateTime approvalDate;
	@Enumerated(EnumType.STRING)
	@Column(name = "LoanStatus")
	private LoanStatus loanStatus;
	@Enumerated(EnumType.STRING)
	@Column(name = "LoanType")
	private LoanType loanType;
	@Column(name = "LoanAmount")
	private double loanAmount;
	@Column(name = "RemainingLoanAmount")
	private double remainingLoanAmount;
	@Column(name = "MonthyEMI")
	private double monthyEMI;
	@Column(name = "RateOfInterest")
	private double rateOfInterest;
	@Column(name = "LoanStartDate")
	private LocalDate loanStartDate;
	@Column(name = "LoanEndDate")
	private String loanEndDate;
	@Column(name = "NoOfInstallements")
	private int noOfInstallements;
	@ManyToOne
	@JoinColumn(name = "DocumentId")
	private LoanRequiredDocument requiredDocument;

	public Loan() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Loan(Long loanId, LocalDateTime applicationDate, LocalDateTime approvalDate, LoanStatus loanStatus,
			LoanType loanType, double loanAmount, double remainingLoanAmount, double monthyEMI, double rateOfInterest,
			LocalDate loanStartDate, String loanEndDate, int noOfInstallements, LoanRequiredDocument requiredDocument) {
		super();
		this.loanId = loanId;
		this.applicationDate = applicationDate;
		this.approvalDate = approvalDate;
		this.loanStatus = loanStatus;
		this.loanType = loanType;
		this.loanAmount = loanAmount;
		this.remainingLoanAmount = remainingLoanAmount;
		this.monthyEMI = monthyEMI;
		this.rateOfInterest = rateOfInterest;
		this.loanStartDate = loanStartDate;
		this.loanEndDate = loanEndDate;
		this.noOfInstallements = noOfInstallements;
		this.requiredDocument = requiredDocument;
	}

	public Long getLoanId() {
		return loanId;
	}

	public void setLoanId(Long loanId) {
		this.loanId = loanId;
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

	public LoanStatus getLoanStatus() {
		return loanStatus;
	}

	public void setLoanStatus(LoanStatus loanStatus) {
		this.loanStatus = loanStatus;
	}

	public LoanType getLoanType() {
		return loanType;
	}

	public void setLoanType(LoanType loanType) {
		this.loanType = loanType;
	}

	public double getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(double loanAmount) {
		this.loanAmount = loanAmount;
	}

	public double getRemainingLoanAmount() {
		return remainingLoanAmount;
	}

	public void setRemainingLoanAmount(double remainingLoanAmount) {
		this.remainingLoanAmount = remainingLoanAmount;
	}

	public double getMonthyEMI() {
		return monthyEMI;
	}

	public void setMonthyEMI(double monthyEMI) {
		this.monthyEMI = monthyEMI;
	}

	public double getRateOfInterest() {
		return rateOfInterest;
	}

	public void setRateOfInterest(double rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}

	public LocalDate getLoanStartDate() {
		return loanStartDate;
	}

	public void setLoanStartDate(LocalDate loanStartDate) {
		this.loanStartDate = loanStartDate;
	}

	public String getLoanEndDate() {
		return loanEndDate;
	}

	public void setLoanEndDate(String loanEndDate) {
		this.loanEndDate = loanEndDate;
	}

	public int getNoOfInstallements() {
		return noOfInstallements;
	}

	public void setNoOfInstallements(int noOfInstallements) {
		this.noOfInstallements = noOfInstallements;
	}

	public LoanRequiredDocument getRequiredDocument() {
		return requiredDocument;
	}

	public void setRequiredDocument(LoanRequiredDocument requiredDocument) {
		this.requiredDocument = requiredDocument;
	}

	@Override
	public String toString() {
		return "Loan [loanId=" + loanId + ", applicationDate=" + applicationDate + ", approvalDate=" + approvalDate
				+ ", loanStatus=" + loanStatus + ", loanType=" + loanType + ", loanAmount=" + loanAmount
				+ ", remainingLoanAmount=" + remainingLoanAmount + ", monthyEMI=" + monthyEMI + ", rateOfInterest="
				+ rateOfInterest + ", loanStartDate=" + loanStartDate + ", loanEndDate=" + loanEndDate
				+ ", noOfInstallements=" + noOfInstallements + ", requiredDocument=" + requiredDocument + "]";
	}

	
}
