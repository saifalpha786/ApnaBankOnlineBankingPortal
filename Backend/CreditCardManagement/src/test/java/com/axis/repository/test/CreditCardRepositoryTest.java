package com.axis.repository.test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.axis.creditcard.model.CreditCard;
import com.axis.creditcard.model.CreditCardRequiredDocument;
import com.axis.creditcard.repository.CreditCardRepository;
import com.axis.enumcreditcard.CreditCardStatus;
import com.axis.enumcreditcard.CreditCardType;
import com.axis.enumcreditcard.WorkType;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CreditCardRepositoryTest {

	@Autowired
	private CreditCardRepository cardRepo;
	@Autowired
	TestEntityManager testEntityManager;
	public CreditCard creditCard;
	public CreditCardRequiredDocument document;

	@BeforeEach
	public void setUp() {

		creditCard = new CreditCard();
		creditCard.setCreditCardId(1121L);
		creditCard.setApplicationDate(LocalDateTime.now());
		creditCard.setCreditCardStatus(CreditCardStatus.PENDING);
		creditCard.setCreditCardType(CreditCardType.Flipkart_Credit_Card);
		document = new CreditCardRequiredDocument();
		document.setAadharCardNumber("9958366142313344");
		document.setCustomerAccountNumber(166608989L);
		document.setCustomerEmailId("saifm0395@gmail.com");
		document.setCustomerFirstName("Mohd");
		document.setCustomerLastName("saif");
		document.setCustomerPhoneNumber("8707683323");
		document.setDocumentId(341);
		document.setMonthlyEarning(39666);
		document.setPanCard("NASPS4476N");
		document.setWorkType(WorkType.SERVICE);
		creditCard.setRequiredDocument(document);

	}

	@AfterEach
	public void tearDown() {
		creditCard = null;
		cardRepo.deleteAll();
	}

	@Test
	public void testSave() {
		cardRepo.save(creditCard);
		CreditCard test = cardRepo.findById(creditCard.getCreditCardId()).get();
		assertEquals(creditCard.getCreditCardId(), test.getCreditCardId());
	}

	@Test
	public void testFindAll() {
		cardRepo.save(creditCard);
		assertEquals(false, cardRepo.findAll().isEmpty());
	}

	@Test
	public void testFindById() {
		cardRepo.save(creditCard);
		CreditCard test = cardRepo.findById(creditCard.getCreditCardId()).get();
		assertEquals(creditCard.getCreditCardId(), test.getCreditCardId());
	}

	@Test
	public void testFindByRequiredDocument() {
		cardRepo.save(creditCard);
		List<CreditCard> test = cardRepo.findByRequiredDocument(creditCard.getRequiredDocument());
		assertEquals(creditCard.getRequiredDocument(), test.get(0).getRequiredDocument());
	}

	@Test
	public void testFindByCreditCardType() {
		cardRepo.save(creditCard);
		List<CreditCard> test = cardRepo.findByCreditCardType(creditCard.getCreditCardType());
		assertEquals(creditCard.getCreditCardType(), test.get(0).getCreditCardType());
	}

	@Test
	public void testFindByCreditCardStatus() {
		cardRepo.save(creditCard);
		List<CreditCard> test = cardRepo.findByCreditCardStatus(creditCard.getCreditCardStatus());
		assertEquals(creditCard.getCreditCardStatus(), test.get(0).getCreditCardStatus());
	}

	@Test
	public void testFindByCreditCardNumber() {
		creditCard.setCreditCardNumber("223344557766881");
		cardRepo.save(creditCard);
		CreditCard test = cardRepo.findByCreditCardNumber(creditCard.getCreditCardNumber());
		assertEquals(creditCard.getCreditCardNumber(), test.getCreditCardNumber());
	}

}
