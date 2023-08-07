package com.axis.jwt.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.axis.transaction.model.User;
import com.axis.transaction.repo.UserRepository;

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
