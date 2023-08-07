package com.axis.giftcard.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.giftcard.model.GiftCard;

@Repository
public interface GiftCardRepository extends JpaRepository<GiftCard, Long>{

	 public List<GiftCard> getGiftCardByUserName(String Useername);
}
