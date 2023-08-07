package com.axis.creditcard.controller;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.axis.creditcard.exception.AccountNotExist;
import com.axis.creditcard.exception.CreditCardNotExist;
import com.axis.creditcard.model.CreditCard;
import com.axis.creditcard.model.CreditCardTransaction;
import com.axis.creditcard.service.CreditCardService;
import com.axis.enumcreditcard.CreditCardStatus;
import com.axis.enumcreditcard.CreditCardType;

@Controller
@RequestMapping("/creditcard")
public class CreditCardController {

	@Autowired
	private CreditCardService creditCardService;

	private Random random;

	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		return new ResponseEntity<String>(creditCardService.getCurrentLoginUser(), HttpStatus.ACCEPTED);
	}

	@PostMapping("/applyForNewCreditCard")
	public ResponseEntity<?> applyForNewCreditCard(@RequestBody CreditCard creditCard) {
		try {
			random = new Random();
			long creditCardId = random.nextInt(1000000);
			creditCard.setCreditCardId(creditCardId);
			String result = creditCardService.applyForNewCreditCard(creditCard);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getListOfCreditCardForCurrentUser")
	public ResponseEntity<?> getListOfCreditCard() throws CreditCardNotExist {

		try {
			return new ResponseEntity<List<CreditCard>>(creditCardService.getListOfCreditCard(), HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>("Credit Card Does Not Exists!!!!", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getCreditCardById/{creditCardId}")
	public ResponseEntity<?> getCreditCardById(@PathVariable("creditCardId") Long creditCardId) {
		try {

			return new ResponseEntity<CreditCard>(creditCardService.getCreditCardById(creditCardId), HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getCreditCardByType/{creditCardType}")
	public ResponseEntity<?> getCreditCardByType(@PathVariable("creditCardType") CreditCardType creditCardType) {
		try {

			return new ResponseEntity<List<CreditCard>>(creditCardService.getCreditCardByType(creditCardType),
					HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getCreditCardByStatus/{creditCardStatus}")
	public ResponseEntity<?> getCreditCardByStatus(
			@PathVariable("creditCardStatus") CreditCardStatus creditCardStatus) {
		try {

			return new ResponseEntity<List<CreditCard>>(creditCardService.getCreditCardByStatus(creditCardStatus),
					HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/approveOrRejectOrBlockedOrClosedCreditCard/{creditCardId}")
	public ResponseEntity<?> approveOrRejectOrClosedLoan(@PathVariable("creditCardId") Long creditCardId,
			@RequestBody CreditCard creditCard) {
		try {
			return new ResponseEntity<String>(
					creditCardService.approveOrRejectOrBlockedOrClosed(creditCard, creditCardId), HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/withdrawFromCreditCard/{amount}")
	public ResponseEntity<?> withdrawFromCreditCard(@PathVariable("amount") double amount,
			@RequestBody CreditCard creditCard) {
		try {
			return new ResponseEntity<String>(creditCardService.withdrawFromCreditCard(creditCard, amount),
					HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/repaymentOfCreditCard/{cardNumber}/{customAmount}")
	public ResponseEntity<?> repaymentOfCreditCard(@PathVariable("cardNumber") String cardNumber,
			@PathVariable("customAmount") double customAmount) {
		try {
			return new ResponseEntity<String>(creditCardService.repaymentOfCreditCard(cardNumber, customAmount),
					HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getListOfTransaction/{cardNumber}")
	public ResponseEntity<?> getListOfTransaction(@PathVariable("cardNumber") String cardNumber) {
		try {
			return new ResponseEntity<List<CreditCardTransaction>>(creditCardService.getListOfTransaction(cardNumber),
					HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}

	@GetMapping("/getListOfAllTransaction")
	public ResponseEntity<?> getListOfAllTransaction() {
		try {
			return new ResponseEntity<List<CreditCardTransaction>>(creditCardService.getListOfAllTransaction(),
					HttpStatus.OK);
		} catch (CreditCardNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}
