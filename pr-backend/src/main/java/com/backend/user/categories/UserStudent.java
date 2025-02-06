package com.backend.user.categories;

import com.backend.student.Student;
import com.backend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserStudent {
    private User user;
    private Student student;
}
