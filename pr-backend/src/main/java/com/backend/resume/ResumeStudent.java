package com.backend.resume;

import com.backend.resume.education.Education;
import com.backend.resume.experience.Experience;
import com.backend.resume.project.Project;
import com.backend.student.Student;
import com.backend.user.User;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="resumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User user;

    @Column( name = "description", columnDefinition = "varchar(1000)")
    private String description;

    @Column( name = "foreign_languages", columnDefinition = "varchar(1000)")
    private String foreignLanguages;

    @Column( name = "tech_skills", columnDefinition = "varchar(1000)")
    private String techSkills;

    @Column( name = "soft_skills", columnDefinition = "varchar(1000)")
    private String softSkills;

    @OneToMany(mappedBy="resume")
    @JsonManagedReference
    private List<Education> educations;

    @OneToMany(mappedBy="resume")
    @JsonManagedReference
    private List<Experience> experiences;

    @OneToMany(mappedBy="resume")
    @JsonManagedReference
    private List<Project> projects;

    public ResumeStudent(User user){
        this.user = user;
    }

}
