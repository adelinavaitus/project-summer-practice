package com.backend.application;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetApplication {

    private int id;
    private int jobId;
    private int studentId;
}
