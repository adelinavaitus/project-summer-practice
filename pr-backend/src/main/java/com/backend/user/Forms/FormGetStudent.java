package com.backend.user.Forms;

import com.backend.faculty.Faculty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetStudent {
    public int id;
    public String email;
    public String firstName;
    public String lastName;
    public String phoneNo;
    private String group;
    private String facultyName;

}
