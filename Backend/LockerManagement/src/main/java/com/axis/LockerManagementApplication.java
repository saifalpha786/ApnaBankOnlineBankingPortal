package com.axis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class LockerManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(LockerManagementApplication.class, args);
	}

}
