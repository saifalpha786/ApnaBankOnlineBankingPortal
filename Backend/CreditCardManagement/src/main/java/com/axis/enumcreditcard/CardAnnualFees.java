package com.axis.enumcreditcard;

public enum CardAnnualFees {

	IndianOil_Credit_Card(1000), Flipkart_Credit_Card(2500), Vistara_Credit_Card(3500), Platinum_Credit_Card(500),
	Airtel_Credit_Card(1500), MyZone_Credit_Card(1000);

	private double annualFees;

	private CardAnnualFees(double annualFees) {
		this.annualFees = annualFees;
	}

	public double getAnnualFees() {
		return annualFees;
	}

	public void setAnnualFees(double annualFees) {
		this.annualFees = annualFees;
	}

}
