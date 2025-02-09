package com.backend.authentication;

import com.backend.user.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class UserDetailImpl implements UserDetails {

    private static final long serialVersionUIT = 1L;
    private int id;
    private String email;

    @JsonIgnore
    private String password;    // User's password (hidden from JSON serialization)

    private Collection<? extends GrantedAuthority> authorities; // Authorities (roles) granted to the user

    // Constructor to initialize the UserDetailImpl object
    public UserDetailImpl (int id, String email, String password, Collection<? extends GrantedAuthority> authorities ){
        this.id = id;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    // Static method to build a UserDetailImpl from a User entity
    public static UserDetailImpl build(User user){
        // Create a list of authorities based on the user's role
        List<GrantedAuthority> authorityList = Collections.singletonList(
                new SimpleGrantedAuthority(user.getRole().getName().name()));

        // Return a new UserDetailImpl object with the user's details and authorities
        return new UserDetailImpl(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorityList
        );
    }

    // Override method to get the authorities (roles) granted to the user
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    // Get the user's ID
    public int getId(){
        return id;
    }

    // Get the user's email
    public String getEmail(){
        return email;
    }

    // Override method to get the user's password
    @Override
    public String getPassword() {
        return password;
    }

    // Override method to return null (since username is the same as email in this case)
    @Override
    public String getUsername() {
        return null;
    }

    // Override method to check if the account has expired
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // Override method to check if the account is locked
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // Override method to check if the credentials have expired
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // Override method to check if the account is enabled
    @Override
    public boolean isEnabled() {
        return true;
    }

    // Override equals method to compare UserDetailImpl objects based on the user ID
    public boolean equals(Object o) {
        if (this == o) return true; // If the same instance, return true
        if (o == null || getClass() != o.getClass()) return false;  // If different class, return false
        UserDetailImpl that = (UserDetailImpl) o;   // Cast the object

        return Objects.equals(id, that.id); // Compare based on the ID
    }
}
