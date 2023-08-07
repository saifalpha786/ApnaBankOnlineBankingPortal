package com.axis.locker.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.axis.lockerenum.LockerSize;

@Entity
@Table(name = "Locker")
public class Locker {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "LockerId")
	private Long lockerId;
	@Column(name = "LockerSize")
	@Enumerated(EnumType.STRING)
	private LockerSize lockerSize;
	@Column(name = "avialLockerFormonth")
	private Long avialLockerFormonth;
	@Column(name = "ValidFromDate")
	private LocalDate validFromDate;
	@Column(name = "ValidToDate")
	private LocalDate validToDate;
	@Column(name = "LockerCost")
	private double lockerSizeCost;
	@Column(name = "UserName")
	private String userName;
	@Column(name = "customerAccountNumber")
	private Long customerAccountNumber;
	@Column(name = "locationForLocker")
	private String locationForLocker;

	public Locker() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Locker(Long lockerId, LockerSize lockerSize, Long avialLockerFormonth, LocalDate validFromDate,
			LocalDate validToDate, double lockerSizeCost, String userName, Long customerAccountNumber,
			String locationForLocker) {
		super();
		this.lockerId = lockerId;
		this.lockerSize = lockerSize;
		this.avialLockerFormonth = avialLockerFormonth;
		this.validFromDate = validFromDate;
		this.validToDate = validToDate;
		this.lockerSizeCost = lockerSizeCost;
		this.userName = userName;
		this.customerAccountNumber = customerAccountNumber;
		this.locationForLocker = locationForLocker;
	}

	public Long getLockerId() {
		return lockerId;
	}

	public void setLockerId(Long lockerId) {
		this.lockerId = lockerId;
	}

	public LockerSize getLockerSize() {
		return lockerSize;
	}

	public void setLockerSize(LockerSize lockerSize) {
		this.lockerSize = lockerSize;
	}

	public Long getAvialLockerFormonth() {
		return avialLockerFormonth;
	}

	public void setAvialLockerFormonth(Long avialLockerFormonth) {
		this.avialLockerFormonth = avialLockerFormonth;
	}

	public LocalDate getValidFromDate() {
		return validFromDate;
	}

	public void setValidFromDate(LocalDate validFromDate) {
		this.validFromDate = validFromDate;
	}

	public LocalDate getValidToDate() {
		return validToDate;
	}

	public void setValidToDate(LocalDate validToDate) {
		this.validToDate = validToDate;
	}

	public double getLockerSizeCost() {
		return lockerSizeCost;
	}

	public void setLockerSizeCost(double lockerSizeCost) {
		this.lockerSizeCost = lockerSizeCost;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Long getCustomerAccountNumber() {
		return customerAccountNumber;
	}

	public void setCustomerAccountNumber(Long customerAccountNumber) {
		this.customerAccountNumber = customerAccountNumber;
	}

	public String getLocationForLocker() {
		return locationForLocker;
	}

	public void setLocationForLocker(String locationForLocker) {
		this.locationForLocker = locationForLocker;
	}

	@Override
	public String toString() {
		return "Locker [lockerId=" + lockerId + ", lockerSize=" + lockerSize + ", avialLockerFormonth="
				+ avialLockerFormonth + ", validFromDate=" + validFromDate + ", validToDate=" + validToDate
				+ ", lockerSizeCost=" + lockerSizeCost + ", userName=" + userName + ", customerAccountNumber="
				+ customerAccountNumber + ", locationForLocker=" + locationForLocker + "]";
	}

}
