package com.axis.lockerenum;

public enum LockerSizePrice {

	SMALL(500), MEDIUM(1000), LARGE(1500);

	private double lockerSizePrice;

	private LockerSizePrice(double lockerSizePrice) {
		this.lockerSizePrice = lockerSizePrice;
	}

	public double getLockerSizePrice() {
		return lockerSizePrice;
	}

	public void setLockerSizePrice(double lockerSizePrice) {
		this.lockerSizePrice = lockerSizePrice;
	}

}
