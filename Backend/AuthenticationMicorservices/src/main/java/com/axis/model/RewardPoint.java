package com.axis.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RewardPoint")
public class RewardPoint {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "rewardId")
	private int rewardId;
	@Column(name = "rewardPoint")
	private int rewardPoint;
	@Column(name = "noOfTimesLogin")
	private int noOfTimesLogin;
	@Column(name = "loginDate")
	private LocalDateTime loginDate;
	@Column(name = "userName",unique = true)
	private String userName;

	public RewardPoint() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RewardPoint(int rewardId, int rewardPoint, int noOfTimesLogin, LocalDateTime loginDate, String userName) {
		super();
		this.rewardId = rewardId;
		this.rewardPoint = rewardPoint;
		this.noOfTimesLogin = noOfTimesLogin;
		this.loginDate = loginDate;
		this.userName = userName;
	}

	public int getRewardId() {
		return rewardId;
	}

	public void setRewardId(int rewardId) {
		this.rewardId = rewardId;
	}

	public int getRewardPoint() {
		return rewardPoint;
	}

	public void setRewardPoint(int rewardPoint) {
		this.rewardPoint = rewardPoint;
	}

	public int getNoOfTimesLogin() {
		return noOfTimesLogin;
	}

	public void setNoOfTimesLogin(int noOfTimesLogin) {
		this.noOfTimesLogin = noOfTimesLogin;
	}

	public LocalDateTime getLoginDate() {
		return loginDate;
	}

	public void setLoginDate(LocalDateTime loginDate) {
		this.loginDate = loginDate;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "RewardPoint [rewardId=" + rewardId + ", rewardPoint=" + rewardPoint + ", noOfTimesLogin="
				+ noOfTimesLogin + ", loginDate=" + loginDate + ", userName=" + userName + "]";
	}

}
