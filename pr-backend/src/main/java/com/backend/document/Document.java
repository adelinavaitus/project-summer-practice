package com.backend.document;

import com.backend.student.Student;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Data
@Entity
@Table( name = "documents")
@NoArgsConstructor
@AllArgsConstructor
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column( name = "name", columnDefinition = "varchar(200)", nullable = true, unique = false)
    private String name;

    @Column( name = "nameDocSupervisor", columnDefinition = "varchar(200)", nullable = true, unique = false)
    private String nameDocSupervisor;

    @Column( name = "downloadUrl", columnDefinition = "varchar(300)", nullable = true, unique = false)
    private String downloadUrl;

    @Column( name = "downloadUrlFinal", columnDefinition = "varchar(300)", nullable = true, unique = false)
    private String downloadUrlFinal;

    @Column( name = "date")
    private Date date;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User user;

    @Column(name = "status", columnDefinition = "varchar(300)", nullable = true, unique = false)
    private String status;

    @Column(name = "feedback", columnDefinition = "varchar(1000)", nullable = true, unique = false)
    private String feedback;

    public Document(User user){
        this.user= user;
    }
}
