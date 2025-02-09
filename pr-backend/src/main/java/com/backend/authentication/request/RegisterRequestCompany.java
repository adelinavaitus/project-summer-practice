package com.backend.authentication.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestCompany {
    // Field for the email address, must be a valid email and cannot be blank
    @NotBlank
    @Size(max = 40)
    @Email
    public String email;

    // Field for the password, cannot be blank
    @NotBlank
    private String password;

    // Field for the company's name, cannot be blank
    @NotBlank
    public String name;

    // Field for the company's size, cannot be blank
    @NotBlank
    private String size;

    // Optional field for the company's description
    private String description;
}

