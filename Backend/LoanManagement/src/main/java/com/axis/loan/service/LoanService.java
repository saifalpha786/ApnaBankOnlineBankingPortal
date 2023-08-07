package com.axis.loan.service;

import java.io.IOException;
import java.util.List;
import com.axis.enumloan.LoanStatus;
import com.axis.enumloan.LoanType;
import com.axis.loan.exception.AccountNotExist;
import com.axis.loan.exception.LoanNotExist;
import com.axis.loan.exception.UserNotFoundException;
import com.axis.loan.model.Loan;
import com.axis.loan.model.LoanEMI;
import com.lowagie.text.DocumentException;

public interface LoanService {

	String getCurrentLoginUser();

	String applyForNewLoan(Loan loan) throws AccountNotExist;

	Loan getLoanById(Long loanId) throws LoanNotExist;

	List<Loan> getLoanByType(LoanType loanType) throws LoanNotExist;

	List<Loan> getLoanByStatus(LoanStatus loanStatus) throws LoanNotExist;

	String approveOrRejectOrClosedLoan(Loan loan, Long loanId) throws LoanNotExist, DocumentException, IOException;

	String loanRepayment(Long loanId) throws LoanNotExist;

	//List<Loan> getListOfLoan() throws LoanNotExist;

	List<Loan> getListOfLoanForCurrentUser() throws LoanNotExist;
	
	List<LoanEMI> getPdfOfLoanByLoanId(long loanId) throws LoanNotExist;
}
