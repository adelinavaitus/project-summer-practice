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
public class RegisterRequestSupervisor {
    // Field for the supervisor's email, must be a valid email and cannot be blank
    @NotBlank
    @Size(max = 40)
    @Email
    public String email;

    // Field for the supervisor's password, cannot be blank
    @NotBlank
    private String password;

    // Field for the supervisor's first name, cannot be blank
    @NotBlank
    private String firstName;

    // Field for the supervisor's last name, cannot be blank
    @NotBlank
    private String lastName;

    // Field for the supervisor's faculty ID, must be a valid integer and cannot be blank
    @NotBlank
    private int facultyId;
}
