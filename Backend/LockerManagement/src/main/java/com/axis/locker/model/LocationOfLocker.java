package com.axis.locker.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Location")
public class LocationOfLocker {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "locationId")
	public int locationId;
	@Column(name = "cityOfLocker")
	public String cityOfLocker;
	@Column(name = "smallSizeLocker")
	public int smallSizeLocker;
	@Column(name = "mediumSizeLocker")
	public int mediumSizeLocker;
	@Column(name = "largeSizeLocker")
	public int largeSizeLocker;

	public LocationOfLocker() {
		super();
		// TODO Auto-generated constructor stub
	}

	public LocationOfLocker(int locationId, String cityOfLocker, int smallSizeLocker, int mediumSizeLocker,
			int largeSizeLocker) {
		super();
		this.locationId = locationId;
		this.cityOfLocker = cityOfLocker;
		this.smallSizeLocker = smallSizeLocker;
		this.mediumSizeLocker = mediumSizeLocker;
		this.largeSizeLocker = largeSizeLocker;
	}

	public int getLocationId() {
		return locationId;
	}

	public void setLocationId(int locationId) {
		this.locationId = locationId;
	}

	public String getCityOfLocker() {
		return cityOfLocker;
	}

	public void setCityOfLocker(String cityOfLocker) {
		this.cityOfLocker = cityOfLocker;
	}

	public int getSmallSizeLocker() {
		return smallSizeLocker;
	}

	public void setSmallSizeLocker(int smallSizeLocker) {
		this.smallSizeLocker = smallSizeLocker;
	}

	public int getMediumSizeLocker() {
		return mediumSizeLocker;
	}

	public void setMediumSizeLocker(int mediumSizeLocker) {
		this.mediumSizeLocker = mediumSizeLocker;
	}

	public int getLargeSizeLocker() {
		return largeSizeLocker;
	}

	public void setLargeSizeLocker(int largeSizeLocker) {
		this.largeSizeLocker = largeSizeLocker;
	}

	@Override
	public String toString() {
		return "LocationOfLocker [locationId=" + locationId + ", cityOfLocker=" + cityOfLocker + ", smallSizeLocker="
				+ smallSizeLocker + ", mediumSizeLocker=" + mediumSizeLocker + ", largeSizeLocker=" + largeSizeLocker
				+ "]";
	}

	
}
