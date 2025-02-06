package com.backend.authentication.response;

import lombok.Data;

@Data
public class JwtResponse {

    private String token;
    private String type ="Bearer";
    private int id;
    private String email;
    private String roles;

    public JwtResponse(String token, int id, String email, String roles){
        this.token= token;
        this.id = id;
        this.email = email;
        this.roles = roles;
    }
}
