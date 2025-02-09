package com.backend.user.categories;

import com.backend.student.Student;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
// This class is a DTO (Data Transfer Object) used to hold the relationship between a User and a Student
public class UserStudent {
    private User user;  // The User associated with the student
    private Student student;    // The Student associated with the user
}