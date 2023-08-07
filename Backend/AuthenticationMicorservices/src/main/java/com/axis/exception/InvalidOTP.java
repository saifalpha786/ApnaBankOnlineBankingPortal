package com.axis.exception;

public class InvalidOTP extends Exception {

	private static final long serialVersionUID = 1L;

	public InvalidOTP(String message) {
		super(message);
	}
}
