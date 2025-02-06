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
public class RegisterRequestStudent {

    @NotBlank
    @Size(max = 40)
    @Email
    public String email;

    @NotBlank
    private String password;

    @NotBlank
    @Size(max = 40)
    public String firstName;

    @NotBlank
    @Size(max = 40)
    public String lastName;

    @NotBlank
    public String phoneNo;

    @NotBlank
    private String group;

    @NotBlank
    private int facultyId;



}
