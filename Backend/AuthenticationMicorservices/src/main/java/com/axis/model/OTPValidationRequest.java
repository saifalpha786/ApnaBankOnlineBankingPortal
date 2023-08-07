package com.axis.model;

public class OTPValidationRequest {

	private String email;
	private String otp;

	public OTPValidationRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OTPValidationRequest(String email, String otp) {
		super();
		this.email = email;
		this.otp = otp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	@Override
	public String toString() {
		return "OTPValidationRequest [email=" + email + ", otp=" + otp + "]";
	}

}
