package com.backend.application;

import com.backend.job.Job;
import com.backend.student.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // Specifies a many-to-one relationship between the current entity and the "Student" entity
    @ManyToOne
    @JoinColumn( name = "student_id",  nullable = false, columnDefinition = "int")
    private Student student;

    // Specifies a many-to-one relationship between the current entity and the "Job" entity
    @ManyToOne
    @JoinColumn( name = "job_id",  nullable = false, columnDefinition = "int")
    private Job job;

    @Column( name = "date")
    private Date date;
}