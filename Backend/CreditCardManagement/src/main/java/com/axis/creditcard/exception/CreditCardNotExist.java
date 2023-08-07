package com.axis.creditcard.exception;

public class CreditCardNotExist extends Exception {

	private static final long serialVersionUID = 1L;

	public CreditCardNotExist(String message) {
		super(message);
	}
}
