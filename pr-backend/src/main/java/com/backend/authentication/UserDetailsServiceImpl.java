package com.backend.authentication;

import com.backend.user.User;
import com.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    // Inject the UserRepository to fetch user data from the database
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Attempt to find the user by email, throw exception if not found
        User user = userRepository.findByEmail(email)
                .orElseThrow( () -> new UsernameNotFoundException("Email not found with username: " + email));

        // Return a UserDetails object created from the found user
        return UserDetailImpl.build(user);
    }
}
