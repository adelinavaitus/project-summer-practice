package com.backend.job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// DTO class representing the structure of a job to be retrieved or displayed
// Used to transfer job-related data without exposing the internal entity
public class FormGetJob {
    private int id;
    private String title;
    private String jobType;
    private String description;
    private int companyId;
}