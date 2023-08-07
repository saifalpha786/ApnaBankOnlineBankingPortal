package com.axis.enumloan;

public enum InterestOnLoanType {

	HOME_LOAN(8.25), PERSONAL_LOAN(10.25), CAR_LOAN(8.50), TWO_WHEELER_LOAN(13.0), EDUCATION_LOAN(13.0),
	GOLD_LOAN(9.75), BUSINESS_LOAN(11.0);

	private final double interestRate;

	private InterestOnLoanType(double interestRate) {
		this.interestRate = interestRate;
	}

	public double getInterestRate() {
		return interestRate;
	}
}
