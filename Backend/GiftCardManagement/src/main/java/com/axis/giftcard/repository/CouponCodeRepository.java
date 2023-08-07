package com.axis.giftcard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.giftcard.model.CouponCode;

@Repository
public interface CouponCodeRepository extends JpaRepository<CouponCode, Integer>{

	
	public CouponCode findByCouponCode(String couponCode); 
}
