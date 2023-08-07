package com.axis.loan.model;

import java.time.LocalDate;

public class LoanEMI {

	private Long loanId;
	private LocalDate date;
	private double principal;
	private double interest;
	private double totalPayment;
	private double remainingBalance;

	public LoanEMI() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LoanEMI(Long loanId, LocalDate date, double principal, double interest, double totalPayment,
			double remainingBalance) {
		super();
		this.loanId = loanId;
		this.date = date;
		this.principal = principal;
		this.interest = interest;
		this.totalPayment = totalPayment;
		this.remainingBalance = remainingBalance;
	}

	public Long getLoanId() {
		return loanId;
	}

	public void setLoanId(Long loanId) {
		this.loanId = loanId;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public double getPrincipal() {
		return principal;
	}

	public void setPrincipal(double principal) {
		this.principal = principal;
	}

	public double getInterest() {
		return interest;
	}

	public void setInterest(double interest) {
		this.interest = interest;
	}

	public double getTotalPayment() {
		return totalPayment;
	}

	public void setTotalPayment(double totalPayment) {
		this.totalPayment = totalPayment;
	}

	public double getRemainingBalance() {
		return remainingBalance;
	}

	public void setRemainingBalance(double remainingBalance) {
		this.remainingBalance = remainingBalance;
	}

	@Override
	public String toString() {
		return "LoanEMI [loanId=" + loanId + ", date=" + date + ", principal=" + principal + ", interest=" + interest
				+ ", totalPayment=" + totalPayment + ", remainingBalance=" + remainingBalance + "]";
	}


}
