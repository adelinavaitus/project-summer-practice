package com.backend.student;

import com.backend.document.Document;
import com.backend.faculty.Faculty;
import com.backend.resume.ResumeStudent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( name = "firstName", columnDefinition = "varchar(25)", nullable = false)
    private String firstName;

    @Column( name = "lastName", columnDefinition = "varchar(25)" , nullable = false)
    private String lastName;

    @Column( name = "phoneNo", columnDefinition = "varchar(15)", unique = true , nullable = false)
    private String phoneNo;

    @Column( name = "class", columnDefinition = "varchar(15)", unique = false , nullable = false)
    private String group;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private Faculty faculty;

    @OneToOne(mappedBy = "user")
    private ResumeStudent resume;

    @OneToOne(mappedBy = "user")
    private Document document;

    public Student(String firstname, String lastname, String phoneNo,String group){
        this.firstName = firstname;
        this.lastName = lastname;
        this.phoneNo = phoneNo;
        this.group = group;
    }

}
