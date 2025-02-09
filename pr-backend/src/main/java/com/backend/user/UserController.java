package com.backend.user;

import com.backend.student.StudentService;
import com.backend.user.Forms.FormGetCompany;
import com.backend.user.Forms.FormGetStudent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private StudentService studentService;

    // Fetches all students based on the logged-in user's ID
    @GetMapping("/students")
    public ResponseEntity<List<FormGetStudent>> getAllUsersStudents(@RequestBody Integer user_id){
        // Calls the userService to get a list of students and returns it with HTTP status OK
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(userService.getAllStudents(user_id));

        return responseEntity;
    }

    // Fetches all companies based on the logged-in user's ID
    @GetMapping("/companies")
    public ResponseEntity<List<FormGetCompany>> getAllUsersCompanies(@RequestBody Integer user_id){
        // Calls the userService to get a list of companies and returns it with HTTP status OK
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(userService.getAllCompanies(user_id));

        return responseEntity;
    }

    // Fetches a specific user by ID and returns the user information
    @GetMapping("/{id}")
    public ResponseEntity<FormGetStudent> getUserById(@PathVariable Integer id){
        // Calls the userService to get the user by ID and returns it with HTTP status OK
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));

        return responseEntity;
    }
}
