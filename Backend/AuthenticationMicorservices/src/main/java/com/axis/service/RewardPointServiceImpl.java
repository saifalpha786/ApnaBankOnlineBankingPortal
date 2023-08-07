package com.axis.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.axis.exception.RewardPointNotFound;
import com.axis.model.RewardPoint;
import com.axis.repository.RewardPointRepo;

@Service
public class RewardPointServiceImpl implements RewardPointService{
	
	@Autowired
	private RewardPointRepo rewardRepo;

	@Override
	public String generateDailyRewardPoint(RewardPoint rewardPoint) {
		rewardPoint.setLoginDate(LocalDateTime.now());
		rewardRepo.save(rewardPoint);
		return "Reward Point Generated";
	}

	@Override
	public RewardPoint getRewardPointById(String userName) throws RewardPointNotFound {
		RewardPoint rewardPoint = rewardRepo.findByUserName(userName);
		if(rewardPoint == null) {
			throw new RewardPointNotFound("No Reward Found");
		}
		return rewardPoint;
	}

	@Override
	public String updateRewardPoint(String userName,int dailyPoint,int noOfTimesLogin) throws RewardPointNotFound {
		RewardPoint rewardPoint = rewardRepo.findByUserName(userName);
		if(rewardPoint == null) {
			throw new RewardPointNotFound("No Reward Found");
		}
		rewardPoint.setNoOfTimesLogin(rewardPoint.getNoOfTimesLogin()+noOfTimesLogin);
		rewardPoint.setLoginDate(LocalDateTime.now());
		rewardPoint.setRewardPoint(rewardPoint.getRewardPoint()+dailyPoint);
		rewardRepo.save(rewardPoint);
		return "Updated";
	}

	@Override
	public String updateRewardAfterClaim(String userName, int dailyPoint, int noOfTimesLogin)
			throws RewardPointNotFound {
		RewardPoint rewardPoint = rewardRepo.findByUserName(userName);
		if(rewardPoint == null) {
			throw new RewardPointNotFound("No Reward Found");
		}
		rewardPoint.setNoOfTimesLogin(noOfTimesLogin);
		rewardPoint.setLoginDate(LocalDateTime.now());
		rewardPoint.setRewardPoint(dailyPoint);
		rewardRepo.save(rewardPoint);
		return "Updated";
	}

}
