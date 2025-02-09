package com.backend.user;

import com.backend.role.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name="users")
@Data   // Lombok annotation for getters, setters, toString, equals, and hashCode methods
@NoArgsConstructor  // Lombok annotation for generating the no-args constructor
@AllArgsConstructor // Lombok annotation for generating the all-args constructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "email", columnDefinition = "varchar(50)", unique  = true , nullable = false)
    public String email;

    @Column(name="password", nullable = false)
    @NotBlank
    @Size(max=120)
    private String password;

    @ManyToOne  // Specifies the relationship to the Role entity (many users can have the same role)
    @JoinColumn(name = "role_id", nullable = false)
    public Role role;

    // Constructor that takes email and password as arguments
    public User (String email, String password){
        this.email = email;
        this.password = password;
    }
}
