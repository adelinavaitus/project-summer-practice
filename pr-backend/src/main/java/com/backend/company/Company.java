package com.backend.company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="companies")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    private int id;

    @Column( name = "name", columnDefinition = "varchar(100)", nullable = false)
    private String name;

    @Column( name = "size", columnDefinition = "varchar(30)", nullable = true)
    private String size;

    @Column( name = "description", columnDefinition = "varchar(500)", nullable = true)
    private String description;

    public Company (String name, String size, String description){
        this.name = name;
        this.description = description;
        this.size = size;
    }
}
