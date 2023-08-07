package com.axis.loan.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.axis.loan.model.LoanRequiredDocument;

public interface LoanDocumentRepository extends JpaRepository<LoanRequiredDocument, Integer>{

	//public LoanRequiredDocument findByCustomerEmailId(String customerEmailId);
	
	public List<LoanRequiredDocument> findByCustomerEmailId(String customerEmailId);
	
}
