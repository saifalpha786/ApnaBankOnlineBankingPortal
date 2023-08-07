package com.axis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class EurekaMicorservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(EurekaMicorservicesApplication.class, args);
	}

}
