package com.backend.resume.experience;

import com.backend.resume.ResumeStudent;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "experiences")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( name = "year_start" )
    private String yearStart;

    @Column( name = "year_stop" )
    private String yearStop;

    @Column( name = "job_title", columnDefinition = "varchar(150)")
    private String jobTitle;

    @Column( name = "company_name", columnDefinition = "varchar(150)")
    private String companyName;

    @Column( name = "job_description", columnDefinition = "varchar(1500)")
    private String jobDescription;

    @ManyToOne  // Many experiences can belong to one student resume
    @JsonBackReference  // Prevent circular references during JSON serialization
    @JoinColumn(name = "resume_student_id", nullable = false)   // Foreign key to the student's resume
    private ResumeStudent resume;
}