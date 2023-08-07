package com.axis.loan.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.axis.enumloan.LoanStatus;
import com.axis.enumloan.LoanType;
import com.axis.loan.model.Loan;
import com.axis.loan.model.LoanRequiredDocument;

public interface LoanRepository extends JpaRepository<Loan, Long>{

	public List<Loan> findByLoanStatus(LoanStatus loanStatus);
	
	public List<Loan> findByLoanType(LoanType loanType);
	
	public List<Loan> findByRequiredDocument(LoanRequiredDocument requiredDocument);
}
