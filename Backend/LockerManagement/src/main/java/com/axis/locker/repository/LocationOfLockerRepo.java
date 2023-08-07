package com.axis.locker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.locker.model.LocationOfLocker;

@Repository
public interface LocationOfLockerRepo extends JpaRepository<LocationOfLocker, Integer>{
	
	public LocationOfLocker findByCityOfLocker(String cityOfLocker);

}
