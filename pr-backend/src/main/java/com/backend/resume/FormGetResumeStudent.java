package com.backend.resume;

import com.backend.resume.education.Education;
import com.backend.resume.experience.Experience;
import com.backend.resume.project.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetResumeStudent {

    private int id;
    private int userId;
    private String description;
    private String foreignLanguages;
    private String techSkills;
    private String softSkills;
    private List<Education> educations;
    private List<Experience> experiences;
    private List<Project> projects;
}
