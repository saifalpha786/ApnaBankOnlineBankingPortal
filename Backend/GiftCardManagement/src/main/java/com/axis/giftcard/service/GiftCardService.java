package com.axis.giftcard.service;

import java.util.List;

import com.axis.giftcard.exception.AccountNotExist;
import com.axis.giftcard.exception.CouponCodeNotFoundException;
import com.axis.giftcard.exception.GiftCardNotFound;
import com.axis.giftcard.model.CouponCode;
import com.axis.giftcard.model.GiftCard;

public interface GiftCardService {

	String getCurrentLoginUser();

	String purchaseGiftCard(GiftCard giftCard) throws AccountNotExist, CouponCodeNotFoundException;

	List<GiftCard> getAllGiftCardForCurrentUser() throws GiftCardNotFound;

	String addCouponCode(CouponCode couponCode) throws CouponCodeNotFoundException;

	int discountOnCouponCode(String couponCode);

	List<CouponCode> getListOfCouponCode() throws CouponCodeNotFoundException;

	String deleteCouponCode(String couponCode) throws CouponCodeNotFoundException;

}
