package com.backend.job;

import com.backend.company.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name="jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn( name = "company_id",  nullable = false, columnDefinition = "int")
    private Company company;

    @Column( name = "title", columnDefinition = "varchar(100)", unique = false , nullable = false)
    private String title;

    @Column( name = "description", columnDefinition = "varchar(3000)", unique = false , nullable = false)
    private String description;

    @Column( name = "job_type", columnDefinition = "varchar(1000)", unique = false , nullable = false)
    private String jobType;

    @Column( name = "date")
    private Date date;

    @Column (name = "available")
    private Boolean available;


}

