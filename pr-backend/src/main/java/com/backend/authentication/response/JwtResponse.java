package com.backend.authentication.response;

import lombok.Data;

@Data
public class JwtResponse {

    private String token;   // The JWT token string
    private String type ="Bearer";  // The type of token, default is "Bearer"
    private int id; // The ID of the user
    private String email;   // The email of the user
    private String roles;   // The roles associated with the user

    // Constructor to initialize the JwtResponse with a token, user ID, email, and roles
    public JwtResponse(String token, int id, String email, String roles){
        this.token= token;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}
