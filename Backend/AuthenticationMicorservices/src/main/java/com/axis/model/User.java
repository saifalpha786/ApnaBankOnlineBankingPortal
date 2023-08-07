package com.axis.model;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.axis.enummodel.UserStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;

@Entity
@Table(name = "User")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "UserId")
	private int userId;
	@Column(name = "FirstName")
	private String userFirstName;
	@Column(name = "LastName")
	private String userLastName;
	@Column(name = "userPhoneNumber", unique = true)
	private String userPhoneNumber;
	@Column(name = "userAadharCard", unique = true)
	private String userAadharCard;
	@Column(name = "userPanCard", unique = true)
	private String userPanCard;
	@Column(name = "street")
	private String street;
	@Column(name = "city")
	private String city;
	@Column(name = "pinCode")
	private int pinCode;
	@Column(name = "state")
	private String state;
	@Column(name = "country")
	private String country;

	@Column(name = "EmailId", unique = true)
	private String emailId;
	@Column(name = "Password")
	private String password;
	@Column(name = "AccountTypeRequest")
	private String accountTypeRequest;
	@JsonIgnore
	@OneToMany(mappedBy = "userAccount", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Account> accounts;
	@Enumerated(EnumType.STRING)
	private UserStatus userStatus;
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "USER_ROLES", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = {
			@JoinColumn(name = "ROLE_ID") })
	private Set<Roles> roles;

	public User() {
		super();
	}

	public User(int userId, String userFirstName, String userLastName, String userPhoneNumber, String userAadharCard,
			String userPanCard, String street, String city, int pinCode, String state, String country, String emailId,
			String password, String accountTypeRequest, List<Account> accounts, UserStatus userStatus,
			Set<Roles> roles) {
		super();
		this.userId = userId;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPhoneNumber = userPhoneNumber;
		this.userAadharCard = userAadharCard;
		this.userPanCard = userPanCard;
		this.street = street;
		this.city = city;
		this.pinCode = pinCode;
		this.state = state;
		this.country = country;
		this.emailId = emailId;
		this.password = password;
		this.accountTypeRequest = accountTypeRequest;
		this.accounts = accounts;
		this.userStatus = userStatus;
		this.roles = roles;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserFirstName() {
		return userFirstName;
	}

	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}

	public String getUserLastName() {
		return userLastName;
	}

	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}

	public String getUserPhoneNumber() {
		return userPhoneNumber;
	}

	public void setUserPhoneNumber(String userPhoneNumber) {
		this.userPhoneNumber = userPhoneNumber;
	}

	public String getUserAadharCard() {
		return userAadharCard;
	}

	public void setUserAadharCard(String userAadharCard) {
		this.userAadharCard = userAadharCard;
	}

	public String getUserPanCard() {
		return userPanCard;
	}

	public void setUserPanCard(String userPanCard) {
		this.userPanCard = userPanCard;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPinCode() {
		return pinCode;
	}

	public void setPinCode(int pinCode) {
		this.pinCode = pinCode;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAccountTypeRequest() {
		return accountTypeRequest;
	}

	public void setAccountTypeRequest(String accountTypeRequest) {
		this.accountTypeRequest = accountTypeRequest;
	}

	public List<Account> getAccounts() {
		return accounts;
	}

	public void setAccounts(List<Account> accounts) {
		this.accounts = accounts;
	}

	public UserStatus getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(UserStatus userStatus) {
		this.userStatus = userStatus;
	}

	public Set<Roles> getRoles() {
		return roles;
	}

	public void setRoles(Set<Roles> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userFirstName=" + userFirstName + ", userLastName=" + userLastName
				+ ", userPhoneNumber=" + userPhoneNumber + ", userAadharCard=" + userAadharCard + ", userPanCard="
				+ userPanCard + ", street=" + street + ", city=" + city + ", pinCode=" + pinCode + ", state=" + state
				+ ", country=" + country + ", emailId=" + emailId + ", password=" + password + ", accountTypeRequest="
				+ accountTypeRequest + ", accounts=" + accounts + ", userStatus=" + userStatus + ", roles=" + roles
				+ "]";
	}

}