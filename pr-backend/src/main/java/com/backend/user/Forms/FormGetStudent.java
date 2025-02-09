package com.backend.user.Forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// This class is a DTO (Data Transfer Object) used for transferring student data between layers or between client and server
public class FormGetStudent {
    public int id;
    public String email;
    public String firstName;
    public String lastName;
    public String phoneNo;
    private String group;
    private String facultyName;
}
