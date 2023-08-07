package com.axis.giftcard.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.axis.giftcardenum.GiftCardStatus;
import com.axis.giftcardenum.GiftCardName;

@Entity
@Table(name = "GiftCard")
public class GiftCard {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "GiftCardId")
	private Long giftCardId;
	@Column(name = "userName")
	private String userName;
	@Column(name = "targetUserName")
	private String targetUserName;
	@Column(name = "userAccountNumber")
	private Long userAccountNumber;
	@Column(name = "PurchaseDate")
	private LocalDateTime purchaseDate;
	@Enumerated(EnumType.STRING)
	@Column(name = "GiftCardStatus")
	private GiftCardStatus giftCardStatus;
	@Enumerated(EnumType.STRING)
	@Column(name = "GiftCardName")
	private GiftCardName giftCardName;
	@Column(name = "giftCardAmount")
	private double giftCardAmount;
	@Column(name = "giftCardNumber", unique = true)
	private Long GiftCardNumber;
	@Column(name = "reedemCode")
	private String reedemCode;
	@Column(name = "ValidFrom")
	private LocalDate validFrom;
	@Column(name = "ValidTo")
	private LocalDate validTo;
	@Column(name = "couponCode")
	private String couponCode;

	public GiftCard() {
		super();
		// TODO Auto-generated constructor stub
	}

	public GiftCard(Long giftCardId, String userName, String targetUserName, Long userAccountNumber,
			LocalDateTime purchaseDate, GiftCardStatus giftCardStatus, GiftCardName giftCardName, double giftCardAmount,
			Long giftCardNumber, String reedemCode, LocalDate validFrom, LocalDate validTo, String couponCode) {
		super();
		this.giftCardId = giftCardId;
		this.userName = userName;
		this.targetUserName = targetUserName;
		this.userAccountNumber = userAccountNumber;
		this.purchaseDate = purchaseDate;
		this.giftCardStatus = giftCardStatus;
		this.giftCardName = giftCardName;
		this.giftCardAmount = giftCardAmount;
		GiftCardNumber = giftCardNumber;
		this.reedemCode = reedemCode;
		this.validFrom = validFrom;
		this.validTo = validTo;
		this.couponCode = couponCode;
	}

	public Long getGiftCardId() {
		return giftCardId;
	}

	public void setGiftCardId(Long giftCardId) {
		this.giftCardId = giftCardId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTargetUserName() {
		return targetUserName;
	}

	public void setTargetUserName(String targetUserName) {
		this.targetUserName = targetUserName;
	}

	public Long getUserAccountNumber() {
		return userAccountNumber;
	}

	public void setUserAccountNumber(Long userAccountNumber) {
		this.userAccountNumber = userAccountNumber;
	}

	public LocalDateTime getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(LocalDateTime purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public GiftCardStatus getGiftCardStatus() {
		return giftCardStatus;
	}

	public void setGiftCardStatus(GiftCardStatus giftCardStatus) {
		this.giftCardStatus = giftCardStatus;
	}

	public GiftCardName getGiftCardName() {
		return giftCardName;
	}

	public void setGiftCardName(GiftCardName giftCardName) {
		this.giftCardName = giftCardName;
	}

	public double getGiftCardAmount() {
		return giftCardAmount;
	}

	public void setGiftCardAmount(double giftCardAmount) {
		this.giftCardAmount = giftCardAmount;
	}

	public Long getGiftCardNumber() {
		return GiftCardNumber;
	}

	public void setGiftCardNumber(Long giftCardNumber) {
		GiftCardNumber = giftCardNumber;
	}

	public String getReedemCode() {
		return reedemCode;
	}

	public void setReedemCode(String reedemCode) {
		this.reedemCode = reedemCode;
	}

	public LocalDate getValidFrom() {
		return validFrom;
	}

	public void setValidFrom(LocalDate validFrom) {
		this.validFrom = validFrom;
	}

	public LocalDate getValidTo() {
		return validTo;
	}

	public void setValidTo(LocalDate validTo) {
		this.validTo = validTo;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	@Override
	public String toString() {
		return "GiftCard [giftCardId=" + giftCardId + ", userName=" + userName + ", targetUserName=" + targetUserName
				+ ", userAccountNumber=" + userAccountNumber + ", purchaseDate=" + purchaseDate + ", giftCardStatus="
				+ giftCardStatus + ", giftCardName=" + giftCardName + ", giftCardAmount=" + giftCardAmount
				+ ", GiftCardNumber=" + GiftCardNumber + ", reedemCode=" + reedemCode + ", validFrom=" + validFrom
				+ ", validTo=" + validTo + ", couponCode=" + couponCode + "]";
	}

}
