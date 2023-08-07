package com.axis.locker.controller;

import java.util.List;

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

import com.axis.locker.exception.AccountNotExist;
import com.axis.locker.exception.LockerNotExist;
import com.axis.locker.model.LocationOfLocker;
import com.axis.locker.model.Locker;
import com.axis.locker.service.LockerService;

@RestController
@RequestMapping("/locker")
public class LockerController {

	@Autowired
	private LockerService lockerService;

	@GetMapping("/getCurrentUser")
	public ResponseEntity<?> getCurrentUser() {
		return new ResponseEntity<String>(lockerService.getCurrentLoginUser(), HttpStatus.ACCEPTED);
	}

//	@PutMapping("/updateLockerAvalability/{lockerAvalability}/{lockerSize}")
//	public ResponseEntity<?> updateLockerAvalability(@PathVariable("lockerAvalability") int lockerAvalability,
//			@PathVariable("lockerSize") String lockerSize) {
//
//		try {
//			return new ResponseEntity<String>(lockerService.updateLockerAvalability(lockerAvalability, lockerSize),
//					HttpStatus.OK);
//		} catch (Exception e) {
//			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
//		}
//	}

	@PostMapping("/applyForNewLocker")
	public ResponseEntity<?> applyForNewLocker(@RequestBody Locker locker) {
		try {
			String result = lockerService.applyForNewLocker(locker);
			return new ResponseEntity<String>(result, HttpStatus.OK);
		} catch (AccountNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/getAllLocker")
	public ResponseEntity<?> getAlllocker() throws LockerNotExist {
		return new ResponseEntity<List<Locker>>(lockerService.getAllLocker(), HttpStatus.OK);
	}

	@GetMapping("getListOfLockerForCurrentUser")
	public ResponseEntity<?> getListOfLockerForCurrentUser() {
		try {
			return new ResponseEntity<List<Locker>>(lockerService.getListOfLockerForCurrentUser(), HttpStatus.OK);
		} catch (LockerNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}

	}
	@PostMapping("/addLockerForGivenLocation")
	public ResponseEntity<?> addLockerForLocation(@RequestBody LocationOfLocker locationOfLocker){
		try {
			String result = lockerService.addLockerForLocation(locationOfLocker);
			return new ResponseEntity<String>(result,HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<String>("Not able to  Add Locker at given  Location", HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getLocationDetailByCity/{city}")
	public ResponseEntity<?> getLocationDetail(@PathVariable("city") String city){
		try {
			return new ResponseEntity<LocationOfLocker>(lockerService.getLocationDetail(city),HttpStatus.OK);
		}catch (LockerNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getListOfLocationDetail")
	public ResponseEntity<?> getListOfLocationDetail(){
		try {
			return new ResponseEntity<List<LocationOfLocker>>(lockerService.getListOfgetLocationDetail(),HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<String>("Locker Does Not Exists!!", HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/UpdateLocationLocker")
	public ResponseEntity<?> updateLocationLocker(@RequestBody LocationOfLocker locationOfLocker){
		try {
			return new ResponseEntity<String>(lockerService.updateLocationLocker(locationOfLocker),HttpStatus.ACCEPTED);
		}catch (LockerNotExist e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	

}
