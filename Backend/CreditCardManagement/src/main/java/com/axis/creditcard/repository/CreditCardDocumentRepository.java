package com.axis.creditcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.creditcard.model.CreditCardRequiredDocument;
@Repository
public interface CreditCardDocumentRepository extends JpaRepository<CreditCardRequiredDocument, Integer>{

	public List<CreditCardRequiredDocument> findByCustomerEmailId(String customerEmailId);
}
