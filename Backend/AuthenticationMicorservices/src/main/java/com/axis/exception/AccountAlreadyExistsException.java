package com.axis.exception;

public class AccountAlreadyExistsException extends Exception {

	private static final long serialVersionUID = 1L;

	public AccountAlreadyExistsException(String message) {
		super(message);
	}

}
