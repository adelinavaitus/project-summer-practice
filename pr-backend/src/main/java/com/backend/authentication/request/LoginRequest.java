package com.backend.authentication.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    // Field for the email address, cannot be blank
    @NotBlank
    private String email;

    // Field for the password, cannot be blank
    @NotBlank
    private String password;
}
