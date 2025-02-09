package com.backend.user.Forms;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
// This class is a DTO (Data Transfer Object) used for transferring company data between layers or between client and server
public class FormGetCompany {
    public int id;
    public String email;
    public String name;
    private String size;
    private String description;

    public FormGetCompany(int id, String email, String name, String size, String description){
        this.id = id;
        this.email = email;
        this.name = name;
        this.size = size;
        this. description  = description;
    }
}