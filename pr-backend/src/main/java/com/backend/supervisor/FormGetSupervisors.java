package com.backend.supervisor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetSupervisors {
    private int id;
    private String firstName;
    private String lastName;
    private int facultyId;
}
