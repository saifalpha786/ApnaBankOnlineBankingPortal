package com.axis.loan.exception;

public class AccountNotExist extends Exception {

	private static final long serialVersionUID = 1L;

	public AccountNotExist(String message) {
		super(message);
	}
}
