package it.starbank.StarBank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StarBankApplication {

	public static void main(String[] args)
	{
		SpringApplication.run(StarBankApplication.class, args);
	}

}
