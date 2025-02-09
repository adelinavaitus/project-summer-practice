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
    // Field for the email address, must be a valid email and cannot be blank
    @NotBlank
    @Size(max = 40)
    @Email
    public String email;

    // Field for the password, cannot be blank
    @NotBlank
    private String password;

    // Field for the student's first name, cannot be blank and should be within the specified size
    @NotBlank
    @Size(max = 40)
    public String firstName;

    // Field for the student's last name, cannot be blank and should be within the specified size
    @NotBlank
    @Size(max = 40)
    public String lastName;

    // Field for the student's phone number, cannot be blank
    @NotBlank
    public String phoneNo;

    // Field for the student's group, cannot be blank
    @NotBlank
    private String group;

    // Field for the student's faculty ID, must be a valid integer and cannot be blank
    @NotBlank
    private int facultyId;
}
