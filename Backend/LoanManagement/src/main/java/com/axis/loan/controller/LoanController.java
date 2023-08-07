package com.axis.loan.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.axis.enumloan.LoanStatus;
import com.axis.enumloan.LoanType;
import com.axis.loan.exception.AccountNotExist;
import com.axis.loan.exception.LoanNotExist;
import com.axis.loan.model.Loan;
import com.axis.loan.model.LoanEMI;
import com.axis.loan.model.LoanEmiPdfExporter;
import com.axis.loan.service.LoanService;
import com.lowagie.text.DocumentException;

@Controller
@RequestMapping("/loan")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class LoanController {

	@Autowired
	private LoanService loanService;

	private Random random;

	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		return new ResponseEntity<String>(loanService.getCurrentLoginUser(), HttpStatus.ACCEPTED);
	}

	@PostMapping("/applyForNewLoan")
	public ResponseEntity<?> applyForNewLoan(@RequestBody Loan loan) {
		try {
			random = new Random();
			long loanId = random.nextInt(1000000);
			loan.setLoanId(loanId);
			String result = loanService.applyForNewLoan(loan);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getLoanById/{loanId}")
	public ResponseEntity<?> getLoanById(@PathVariable("loanId") Long loanId) {
		try {

			return new ResponseEntity<Loan>(loanService.getLoanById(loanId), HttpStatus.OK);
		} catch (LoanNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getLoanByType/{loanType}")
	public ResponseEntity<?> getLoanByType(@PathVariable("loanType") LoanType loanType) {
		try {

			return new ResponseEntity<List<Loan>>(loanService.getLoanByType(loanType), HttpStatus.OK);
		} catch (LoanNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getLoanByStatus/{loanStatus}")
	public ResponseEntity<?> getLoanByStatus(@PathVariable("loanStatus") LoanStatus loanStatus) {
		try {

			return new ResponseEntity<List<Loan>>(loanService.getLoanByStatus(loanStatus), HttpStatus.OK);
		} catch (LoanNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getListOfLoanForCurrentUser")
	public ResponseEntity<?> getListOfLoan() throws LoanNotExist {

		try {
			return new ResponseEntity<List<Loan>>(loanService.getListOfLoanForCurrentUser(), HttpStatus.OK);
		} catch (LoanNotExist e) {
			return new ResponseEntity<String>("Loan Does Not Exists!!!!", HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/approveOrRejectOrClosedLoan/{loanId}")
	public ResponseEntity<?> approveOrRejectOrClosedLoan(@PathVariable("loanId") Long loanId, @RequestBody Loan loan) throws DocumentException, IOException {
		try {

			return new ResponseEntity<String>(loanService.approveOrRejectOrClosedLoan(loan, loanId), HttpStatus.OK);
		} catch (LoanNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/loanRepayment/{loanId}")
	public ResponseEntity<?> loanRepayment(@PathVariable("loanId") Long loanId) {
		try {

			return new ResponseEntity<String>(loanService.loanRepayment(loanId), HttpStatus.OK);
		} catch (LoanNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getPdfOfLoanByLoanId/{loanId}")
	public void getPdfOfLoanByLoanId(@PathVariable("loanId") Long loanId,HttpServletResponse response) throws LoanNotExist, DocumentException, IOException{
		response.setContentType("application/pdf");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());

		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=users_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);

		List<LoanEMI> listofLoanEmi = loanService.getPdfOfLoanByLoanId(loanId);

		LoanEmiPdfExporter exporter = new LoanEmiPdfExporter(listofLoanEmi);
		exporter.export(response);
	}

}
