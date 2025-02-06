package com.backend.resume.project;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetProject {
    private int id;
    private String yearP;
    private String title;
    private String description;
    private int resume_student_id;

}
