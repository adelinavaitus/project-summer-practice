package com.backend.faculty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table( name = "faculties")
@NoArgsConstructor
@AllArgsConstructor
public class Faculty {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( name = "name", columnDefinition = "varchar(100)", nullable = false, unique = true)
    private String name;

    @Column( name = "description", columnDefinition = "varchar(4000)", unique = false , nullable = true)
    private String description;

}
