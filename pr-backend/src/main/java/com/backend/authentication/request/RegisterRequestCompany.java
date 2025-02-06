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

    @NotBlank
    @Size(max = 40)
    @Email
    public String email;

    @NotBlank
    private String password;

    @NotBlank
    public String name;

    @NotBlank
    private String size;

    private String description;


}

