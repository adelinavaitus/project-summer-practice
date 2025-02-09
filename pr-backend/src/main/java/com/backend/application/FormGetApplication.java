package com.backend.application;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// This is a DTO (Data Transfer Object) for transferring application data
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetApplication {
    private int id;
    private int jobId;
    private int studentId;
}