package com.backend.resume.experience;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetExperience {

    private int id;
    private String yearStart;
    private String yearStop;
    private String jobTitle;
    private String companyName;
    private String jobDescription;
    private int resume_student_id;
}
