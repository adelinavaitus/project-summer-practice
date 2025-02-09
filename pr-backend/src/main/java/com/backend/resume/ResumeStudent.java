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
    private User user;  // Reference to the associated user (student) for this resume

    @Column( name = "description", columnDefinition = "varchar(1000)")
    private String description;

    @Column( name = "foreign_languages", columnDefinition = "varchar(1000)")
    private String foreignLanguages;    // Languages spoken by the student

    @Column( name = "tech_skills", columnDefinition = "varchar(1000)")
    private String techSkills;

    @Column( name = "soft_skills", columnDefinition = "varchar(1000)")
    private String softSkills;

    // One-to-many relationship with Education entities, this resume can have multiple education records
    @OneToMany(mappedBy="resume")
    @JsonManagedReference   // To prevent circular reference when serializing
    private List<Education> educations;

    // One-to-many relationship with Experience entities, this resume can have multiple experiences
    @OneToMany(mappedBy="resume")
    @JsonManagedReference   // To prevent circular reference when serializing
    private List<Experience> experiences;

    // One-to-many relationship with Project entities, this resume can have multiple projects
    @OneToMany(mappedBy="resume")
    @JsonManagedReference   // To prevent circular reference when serializing
    private List<Project> projects;

    // Constructor to create a ResumeStudent with a specific User (student)
    public ResumeStudent(User user){
        this.user = user;
    }
}
