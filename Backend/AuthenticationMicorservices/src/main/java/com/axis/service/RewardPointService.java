package com.axis.service;

import com.axis.exception.RewardPointNotFound;
import com.axis.model.RewardPoint;

public interface RewardPointService {
	
	String generateDailyRewardPoint(RewardPoint rewardPoint);
	
	String updateRewardPoint(String userName,int dailyPoint, int noOfTimesLogin) throws RewardPointNotFound;
	
	RewardPoint getRewardPointById(String userName) throws RewardPointNotFound;
	
	String updateRewardAfterClaim(String userName,int dailyPoint, int noOfTimesLogin) throws RewardPointNotFound;

}
