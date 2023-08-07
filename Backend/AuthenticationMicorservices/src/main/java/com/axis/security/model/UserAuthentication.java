package com.axis.security.model;

public class UserAuthentication {

	private String userName;
	private String password;

	public UserAuthentication() {
		super();

	}

	public UserAuthentication(String userName, String password) {
		super();
		this.userName = userName;
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
