package com.axis.jwt.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@SuppressWarnings("deprecation")
@EnableWebSecurity
@Configuration
public class SecurityUserConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtFilter jwtFilter;

	@Autowired
	private UserSecurityService userDetails;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetails);
	}

	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests().antMatchers("/creditcard/getCurrentUser")
				.hasAnyRole("MANAGER", "EMPLOYEE", "CUSTOMER")
				.antMatchers("/creditcard/applyForNewCreditCard", "/creditcard/getListOfCreditCardForCurrentUser",
						"/creditcard/getCreditCardById/{creditCardId}", "/creditcard/withdrawFromCreditCard/{amount}",
						"/creditcard/repaymentOfCreditCard/{cardNumber}","/creditcard/getListOfTransaction/{cardNumber}")
				.hasAnyRole("EMPLOYEE", "CUSTOMER")
				.antMatchers("/creditcard/getCreditCardByType/{creditCardType}",
						"/creditcard/getCreditCardByStatus/{creditCardStatus}",
						"/creditcard/approveOrRejectOrBlockedOrClosedCreditCard/{creditCardId}","/creditcard/getListOfAllTransaction")
				.hasRole("MANAGER").anyRequest().permitAll().and().exceptionHandling().accessDeniedPage("/403").and()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
