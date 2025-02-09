package com.backend.resume.education;

import com.backend.resume.ResumeStudent;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "educations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( name = "year_start" )
    private String yearStart;

    @Column( name = "year_stop" )
    private String yearStop;

    @Column( name = "title", columnDefinition = "varchar(150)")
    private String title;

    @Column( name = "specialization", columnDefinition = "varchar(150)")
    private String specialization;

    // Establishes many-to-one relationship with ResumeStudent
    @ManyToOne
    @JsonBackReference  // Prevents infinite recursion during JSON serialization
    @JoinColumn(name = "resume_student_id", nullable = false)
    private ResumeStudent resume;

    public Education(ResumeStudent resumeStudent) {
        this.resume = resumeStudent;
    }
}
