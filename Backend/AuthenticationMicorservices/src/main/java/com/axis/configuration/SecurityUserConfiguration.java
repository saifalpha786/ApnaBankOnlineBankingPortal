package com.axis.configuration;

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

import com.axis.filter.JwtFilter;
import com.axis.service.UserSecurityService;

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
		http.csrf().disable().authorizeRequests()
				.antMatchers("/user/addManager", "/user/addEmployee","/user/addContentWriter", "/user/getManagerById/{userId}",
						"/user/getEmployeeById/{userId}","/user/getContentWriterById/{userId}", "/user/deleteManager/{userId}",
						"/user/deleteEmployee/{userId}", "/user/deleteContentWriter/{userId}","/account/deleteManagerAccount/{accountId}",
						"/account/deleteEmployeeAccount/{accountId}", "/account/deleteContentWriterAccount/{accountId}","/account/getEmployeeAccountById/{accountId}","/account//getContentWriterAccountById/{accountId}",
						"/account/getManagerAccountById/{accountId}", "/account/updateEmployeeAccount/{accountId}","/account/updateContentWriterAccount/{accountId}",
						"/account/updateManagerAccount/{accountId}", "/account/addManagerAccount",
						"/account/addEmployeeAccount","/account/addContentWriterAccount", "/user/getManagerByStatus/{userStatus}",
						"/user/getEmployeeByStatus/{userStatus}","/user/getContentWriterByStatus/{userStatus}")
				.hasRole("ADMIN")
				.antMatchers("/user/getUsersByStatus/{userStatus}", "/user/getCustomerById/{userId}",
						"/user/deleteCustomer/{userId}", "/account/deleteCustomerAccount/{accountId}",
						"/account/getCustomerAccountById/{accountId}",
						"/account/addCustomerAccount", "/user/getCustomerByStatus/{userStatus}",
						"/user/updateManager/{userId}")
				.hasRole("MANAGER").antMatchers("/user/updateEmployee/{userId}").hasRole("EMPLOYEE")
				.antMatchers("/user/updateCustomer/{userId}").hasRole("CUSTOMER").antMatchers("/account/getAllAccount").hasAnyRole("ADMIN","MANAGER")
				.antMatchers("/content/createContent").hasRole("CONTENTWRITER")
				.anyRequest().permitAll().and()
				.exceptionHandling().accessDeniedPage("/403").and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
