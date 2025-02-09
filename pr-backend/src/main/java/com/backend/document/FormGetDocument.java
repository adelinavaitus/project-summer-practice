package com.backend.document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// This is a DTO (Data Transfer Object) for transferring document data
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormGetDocument {
    private int id;
    private String name;
    private String downloadUrl;
    private String nameDocSupervisor;
    private String downloadUrlFinal;
    private String feedback;
}