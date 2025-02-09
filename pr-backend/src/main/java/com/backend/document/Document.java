package com.backend.document;

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
    private String name;    // Name of the document

    @Column( name = "nameDocSupervisor", columnDefinition = "varchar(200)", nullable = true, unique = false)
    private String nameDocSupervisor;

    @Column( name = "downloadUrl", columnDefinition = "varchar(300)", nullable = true, unique = false)
    private String downloadUrl; // URL to download the document

    @Column( name = "downloadUrlFinal", columnDefinition = "varchar(300)", nullable = true, unique = false)
    private String downloadUrlFinal;    // URL to download the final version of the document

    @Column( name = "date")
    private Date date;  // Submission or creation date of the document

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)  // Links the document to a user (student)
    private User user;

    @Column(name = "status", columnDefinition = "varchar(300)", nullable = true, unique = false)
    private String status;  // Status of the document (pending, approved, rejected)

    @Column(name = "feedback", columnDefinition = "varchar(1000)", nullable = true, unique = false)
    private String feedback;    // Feedback provided for the document

    // Constructor to initialize a Document with a User
    public Document(User user){
        this.user= user;
    }
}