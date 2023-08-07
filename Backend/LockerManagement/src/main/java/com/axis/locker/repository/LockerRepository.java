package com.axis.locker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.axis.locker.model.Locker;
@Repository
public interface LockerRepository extends JpaRepository<Locker, Long>{
	

	public List<Locker> findByUserName(String userName);
}
