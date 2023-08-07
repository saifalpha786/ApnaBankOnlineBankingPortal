package com.axis.giftcard.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CouponCode")
public class CouponCode {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "couponId")
	private int couponId;
	@Column(name = "couponCode")
	private String couponCode;
	@Column(name = "discountOnCode")
	private int discountOnCode;

	public CouponCode() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CouponCode(int couponId, String couponCode, int discountOnCode) {
		super();
		this.couponId = couponId;
		this.couponCode = couponCode;
		this.discountOnCode = discountOnCode;
	}

	public int getCouponId() {
		return couponId;
	}

	public void setCouponId(int couponId) {
		this.couponId = couponId;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public int getDiscountOnCode() {
		return discountOnCode;
	}

	public void setDiscountOnCode(int discountOnCode) {
		this.discountOnCode = discountOnCode;
	}

	@Override
	public String toString() {
		return "CouponCode [couponId=" + couponId + ", couponCode=" + couponCode + ", discountOnCode=" + discountOnCode
				+ "]";
	}

}
