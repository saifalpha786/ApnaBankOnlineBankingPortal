package com.axis.locker.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.axis.locker.exception.AccountNotExist;
import com.axis.locker.exception.LockerNotExist;
import com.axis.locker.model.LocationOfLocker;
import com.axis.locker.model.Locker;

public interface LockerService {

//	String updateLockerAvalability(int lockerAvalability, String lockerSize);

	String getCurrentLoginUser();

	String applyForNewLocker(Locker locker) throws AccountNotExist;

	List<Locker> getAllLocker() throws LockerNotExist;
	
	List<Locker> getListOfLockerForCurrentUser()  throws LockerNotExist;
	
	String addLockerForLocation(LocationOfLocker locationOfLocker);
	
	LocationOfLocker getLocationDetail(String city)throws LockerNotExist;
	
	List<LocationOfLocker> getListOfgetLocationDetail();
	
	String updateLocationLocker(LocationOfLocker locationOfLocker) throws LockerNotExist;

}
