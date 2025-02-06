package com.backend.resume.education;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetEducation {

    private int id;
    private String yearStart;
    private String yearStop;
    private String title;
    private String specialization;
    private int resume_student_id;
}
