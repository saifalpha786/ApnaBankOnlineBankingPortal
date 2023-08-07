package com.axis.loan.exception;

public class LoanNotExist extends Exception {

	private static final long serialVersionUID = 1L;

	public LoanNotExist(String message) {
		super(message);
	}
}
