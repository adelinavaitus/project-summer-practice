package com.backend.user.Forms;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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
