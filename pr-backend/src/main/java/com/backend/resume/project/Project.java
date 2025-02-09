package com.backend.resume.project;

import com.backend.resume.ResumeStudent;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( name = "yearP" )
    private String yearP;

    @Column( name = "title", columnDefinition = "varchar(200)")
    private String title;

    @Column( name = "description", columnDefinition = "varchar(1500)")
    private String description;

    @ManyToOne  // Specifies the relationship between Project and ResumeStudent (many projects to one resume)
    @JsonBackReference  // Avoids circular reference during JSON serialization
    @JoinColumn(name = "resume_student_id", nullable = false)
    private ResumeStudent resume;    // The associated ResumeStudent entity
}