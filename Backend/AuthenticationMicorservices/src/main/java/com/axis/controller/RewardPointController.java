package com.axis.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.axis.exception.RewardPointNotFound;
import com.axis.model.RewardPoint;
import com.axis.service.RewardPointService;

@RestController
@RequestMapping("/reward")
public class RewardPointController {
	
	private static final Logger LOG = Logger.getLogger(RewardPointController.class.getName());
	
	@Autowired
	private RewardPointService rewardService;
	

	@PostMapping("/generateRewardPoint")
	public ResponseEntity<?> generateDailyRewardPoint(@RequestBody RewardPoint rewardPoint){
		try {
			String generateDailyRewardPoint = rewardService.generateDailyRewardPoint(rewardPoint);
			LOG.log(Level.INFO, "/generateRewardPoint - > " + "Reward Point generated Sucessfully" );
			return new ResponseEntity<String>(generateDailyRewardPoint,HttpStatus.OK);
		}catch(Exception e) {
			return new ResponseEntity<String>("Not Generated Reward Point",HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/getRewardPointById/{userName}")
	public ResponseEntity<?> getRewardPointById(@PathVariable("userName") String userName){
		try {
			return new ResponseEntity<RewardPoint>(rewardService.getRewardPointById(userName),HttpStatus.OK);
		}catch(RewardPointNotFound e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/updateRewardPoint/{userName}/{dailyPoint}/{noOfTimesLogin}")
	public ResponseEntity<?> updateRewardPoint(@PathVariable("userName") String userName, @PathVariable("dailyPoint") int dailyPoint,@PathVariable("noOfTimesLogin") int noOfTimesLogin){
		try {
			String updateRewardPoint = rewardService.updateRewardPoint(userName, dailyPoint, noOfTimesLogin);
			LOG.log(Level.INFO, "/updateRewardPoint/{userName}/{dailyPoint}/{noOfTimesLogin} - > " + "Reward Point Update Sucessfully" );
			return new ResponseEntity<String>(updateRewardPoint,HttpStatus.ACCEPTED);
		}catch(RewardPointNotFound e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/updateRewardPointAfterClaim/{userName}/{dailyPoint}/{noOfTimesLogin}")
	public ResponseEntity<?> updateRewardPointAfterClaim(@PathVariable("userName") String userName, @PathVariable("dailyPoint") int dailyPoint,@PathVariable("noOfTimesLogin") int noOfTimesLogin){
		try {
			String updateRewardAfterClaim = rewardService.updateRewardAfterClaim(userName, dailyPoint, noOfTimesLogin);
			LOG.log(Level.INFO, "/updateRewardPointAfterClaim/{userName}/{dailyPoint}/{noOfTimesLogin} - > " + "Reward Point Update Sucessfully After claim" );
			return new ResponseEntity<String>(updateRewardAfterClaim,HttpStatus.ACCEPTED);
		}catch(RewardPointNotFound e) {
			return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}

}
