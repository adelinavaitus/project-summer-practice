package com.backend.supervisor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// This class is a DTO used for holding data about a Supervisor in the context of a form
public class FormGetSupervisors {
    private int id;
    private String firstName;
    private String lastName;
    private int facultyId;
}