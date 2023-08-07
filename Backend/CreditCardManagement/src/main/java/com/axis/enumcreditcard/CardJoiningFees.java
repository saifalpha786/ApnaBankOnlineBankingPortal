package com.axis.enumcreditcard;

public enum CardJoiningFees {
	
	IndianOil_Credit_Card(500), Flipkart_Credit_Card(500), Vistara_Credit_Card(500), Platinum_Credit_Card(0),
	Airtel_Credit_Card(200), MyZone_Credit_Card(500);
	
	private double joiningFees;

	private CardJoiningFees(double joiningFees) {
		this.joiningFees = joiningFees;
	}

	public double getJoiningFees() {
		return joiningFees;
	}

	public void setJoiningFees(double joiningFees) {
		this.joiningFees = joiningFees;
	}
	
	

}
