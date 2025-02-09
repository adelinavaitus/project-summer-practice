package com.backend.supervisor;

import com.backend.faculty.Faculty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="supervisors")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Supervisor {
    @Id
    private int id;

    @Column( name = "firstName", columnDefinition = "varchar(25)", nullable = false)
    private String firstName;

    @Column( name = "lastName", columnDefinition = "varchar(25)" , nullable = false)
    private String lastName;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private Faculty faculty;

    public Supervisor(String firstName, String lastName, Faculty faculty){
        this.firstName = firstName;
        this.lastName = lastName;
        this.faculty = faculty;
    }
}
