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

    @ManyToOne
    @JoinColumn( name = "student_id",  nullable = false, columnDefinition = "int")
    private Student student;

    @ManyToOne
    @JoinColumn( name = "job_id",  nullable = false, columnDefinition = "int")
    private Job job;

    @Column( name = "date")
    private Date date;
}
