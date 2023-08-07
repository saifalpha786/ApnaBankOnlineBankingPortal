package com.axis.locker.exception;

public class LockerNotExist extends Exception {

	private static final long serialVersionUID = 1L;

	public LockerNotExist(String message) {
		super(message);
	}
}
