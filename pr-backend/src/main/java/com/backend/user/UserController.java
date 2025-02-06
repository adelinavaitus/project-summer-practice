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

    //aici cred ca trebuie modificat - cv cu jwt - exemplu in proiect db
    @GetMapping("/students")
    public ResponseEntity<List<FormGetStudent>> getAllUsersStudents(@RequestBody Integer user_id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(userService.getAllStudents(user_id));
        return responseEntity;
    }

    @GetMapping("/companies")
    public ResponseEntity<List<FormGetCompany>> getAllUsersCompanies(@RequestBody Integer user_id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(userService.getAllCompanies(user_id));
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormGetStudent> getUserById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
        return responseEntity;
    }

}
