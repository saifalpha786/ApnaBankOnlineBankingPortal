package com.axis.transaction.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.enumtransaction.TransactionStatus;
import com.axis.transaction.exception.AccountNotExist;
import com.axis.transaction.exception.TransactionNotFoundException;
import com.axis.transaction.model.Transaction;
import com.axis.transaction.pdfexporter.TransactionPDFExporter;
import com.axis.transaction.repo.AccountRepository;
import com.axis.transaction.repo.UserRepository;
import com.axis.transaction.service.TransactionService;
import com.lowagie.text.DocumentException;

@RestController
@RequestMapping("/transaction")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TransactionController {

	@Autowired
	private AccountRepository accountRepo;

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private UserRepository userRepo;

	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		return new ResponseEntity<String>(transactionService.getCurrentLoginUser(), HttpStatus.ACCEPTED);
	}

	@GetMapping("/getCurrentBalance/{accountNumber}")
	public ResponseEntity<?> getCurrentBalance(@PathVariable("accountNumber") Long accountNumber) {
		try {
			return new ResponseEntity<Double>(transactionService.getCurrentBalance(accountNumber), HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/withdrawAmount")
	public ResponseEntity<?> withdrawBalance(@RequestBody Transaction transaction) {
		try {
			String result = transactionService.withdrawBalance(transaction);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/transferAmount")
	public ResponseEntity<?> transferAmount(@RequestBody Transaction transaction) throws Exception {
		try {
			String result = transactionService.transferAmount(transaction);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getTransactionStatus/{transactionStatus}")
	public ResponseEntity<?> getTransactionByStatus(
			@PathVariable("transactionStatus") TransactionStatus transactionStatus) {
		try {
			List<Transaction> fetchedTransaction = transactionService.getTransactionByStatus(transactionStatus);
			return new ResponseEntity<List<Transaction>>(fetchedTransaction, HttpStatus.OK);
		} catch (TransactionNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/approveTransaction/{transactionId}")
	public ResponseEntity<?> approvePendingTransaction(@PathVariable("transactionId") long transactionId) {
		try {
			return new ResponseEntity<String>(transactionService.approvePendingTransaction(transactionId),
					HttpStatus.ACCEPTED);
		} catch (TransactionNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/requestToDepositAmount")
	public ResponseEntity<?> requestToDepositAmount(@RequestBody Transaction transaction) {
		try {
			String result = transactionService.requestToDepositAmount(transaction);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getAllTransactions/pdf")
	public void getAllTransaction(HttpServletResponse response)
			throws DocumentException, IOException, TransactionNotFoundException {
		response.setContentType("application/pdf");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=users_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);

		List<Transaction> listofTransactions = transactionService.getAllTransaction();

		TransactionPDFExporter exporter = new TransactionPDFExporter(listofTransactions);
		exporter.export(response);

	}

	@GetMapping("/getTransactionsForCurrentUser/pdf")
	public void getTransactionsForCurrentUser(HttpServletResponse response) throws DocumentException, IOException {
		response.setContentType("application/pdf");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=users_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);

		List<Transaction> listofTransactions = transactionService.getTransactionsForCurrentUser();

		TransactionPDFExporter exporter = new TransactionPDFExporter(listofTransactions);
		exporter.export(response);

	}

	@GetMapping("/getAllTransaction")
	public ResponseEntity<?> getAllTransactionData() {
		try {
			return new ResponseEntity<List<Transaction>>(transactionService.getAllTransaction(), HttpStatus.ACCEPTED);
		} catch (TransactionNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getTransactionsDataForCurrentUser")
	public ResponseEntity<?> getTransactionsDataForCurrentUser() {

		try {
			return new ResponseEntity<List<Transaction>>(transactionService.getTransactionsDataForCurrentUser(),
					HttpStatus.OK);
		} catch (TransactionNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}
	
	@PostMapping("/creditRedeemPointToUserAccount/{accountNumber}/{redeemPoint}")
	public ResponseEntity<?> creditRedeemPointToUserAccount(@PathVariable("accountNumber") Long accountNumber,  @PathVariable("redeemPoint")  double redeemPoint){
		try {
			return new ResponseEntity<String>(transactionService.creditRedeemPointToUserAccount(accountNumber, redeemPoint),HttpStatus.OK);
		}catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}
