package com.axis.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.model.RewardPoint;
@Repository
public interface RewardPointRepo extends JpaRepository<RewardPoint, Integer>{
	
	public RewardPoint findByUserName(String userName);

}
