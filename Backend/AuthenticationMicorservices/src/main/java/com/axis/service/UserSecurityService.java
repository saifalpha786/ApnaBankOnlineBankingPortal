package com.axis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.model.User;
import com.axis.repository.UserRepository;
import com.axis.security.model.SecurityUser;

@Service
public class UserSecurityService implements UserDetailsService {

	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByEmailId(username);
		if (!user.equals(null)) {
			return new SecurityUser(user);
		} else {
			throw new UsernameNotFoundException("UserName Not Found");
		}

	}

}
