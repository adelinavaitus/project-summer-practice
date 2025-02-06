package com.backend.job;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetJob {

    private int id;
    private String title;
    private String jobType;
    private String description;
    private int companyId;
}
