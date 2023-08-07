package com.axis.enummodel;

public enum AccountMinBalance {

	SAVING_ACCOUNT_MIN_BALANCE(1000),

	CURRENT_ACCOUNT_MIN_BALANCE(10000);

	private final double accountMinBalance;

	private AccountMinBalance(double accountMinBalance) {
		this.accountMinBalance = accountMinBalance;
	}

	public double getAccountMinBalance() {
		return accountMinBalance;
	}

}
