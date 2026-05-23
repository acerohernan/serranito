package com.serranito.api_rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;

@SpringBootApplication
public class ApiRestApplication {
	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(ApiRestApplication.class);
		app.addListeners((ApplicationListener<ApplicationEnvironmentPreparedEvent>) event -> {
			String url = event.getEnvironment().getProperty("spring.datasource.url");
			System.out.println("spring.datasource.url=" + url);
		});
		app.run(args);
	}
}
