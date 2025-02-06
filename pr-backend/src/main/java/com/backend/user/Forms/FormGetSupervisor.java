package com.backend.user.Forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetSupervisor {

    public int id;
    public String email;
    public String firstName;
    public String lastName;
    private String facultyName;
}
