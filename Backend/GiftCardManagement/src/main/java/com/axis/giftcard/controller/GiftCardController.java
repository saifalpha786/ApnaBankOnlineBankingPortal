package com.axis.giftcard.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.giftcard.exception.AccountNotExist;
import com.axis.giftcard.exception.CouponCodeNotFoundException;
import com.axis.giftcard.exception.GiftCardNotFound;
import com.axis.giftcard.model.CouponCode;
import com.axis.giftcard.model.GiftCard;
import com.axis.giftcard.service.GiftCardService;

@RestController
@RequestMapping("/giftcard")
public class GiftCardController {

	@Autowired
	private GiftCardService giftCardService;

	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		return new ResponseEntity<String>(giftCardService.getCurrentLoginUser(), HttpStatus.ACCEPTED);
	}

	@PostMapping("/purchaseGiftCard")
	public ResponseEntity<?> purchaseGiftCard(@RequestBody GiftCard giftCard) throws CouponCodeNotFoundException {
		try {
			String result = giftCardService.purchaseGiftCard(giftCard);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	
	@GetMapping("/getAllGiftCardCurrentUser")
	public ResponseEntity<?> getGiftCardCurrentUser() throws GiftCardNotFound {
		return new ResponseEntity<List<GiftCard>>(giftCardService.getAllGiftCardForCurrentUser(), HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/addCouponCode")
	public ResponseEntity<?> addCouponCode(@RequestBody CouponCode couponCode){
		try {
			return new ResponseEntity<String>(giftCardService.addCouponCode(couponCode),HttpStatus.OK);
		}catch (CouponCodeNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getDiscountOnCouponCode/{couponCode}")
	public ResponseEntity<?> discountOnCouponCode(@PathVariable("couponCode") String couponCode){
		try {
			return new ResponseEntity<Integer>(giftCardService.discountOnCouponCode(couponCode),HttpStatus.ACCEPTED);
		}catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	
	}
	@GetMapping("/getListOfCouponCode")
	public  ResponseEntity<?> getListOfCouponCode(){
		try {
			return new ResponseEntity<List<CouponCode>>(giftCardService.getListOfCouponCode(),HttpStatus.OK);
		}catch (CouponCodeNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteCouponCode/{couponCode}")
	public  ResponseEntity<?> deleteCouponCode(@PathVariable("couponCode") String couponCode){
		try {
			return new ResponseEntity<String>(giftCardService.deleteCouponCode(couponCode),HttpStatus.OK);
		}catch (CouponCodeNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	

}