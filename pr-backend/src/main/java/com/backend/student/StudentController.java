package com.backend.student;

import com.backend.user.Forms.FormGetStudent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService service;

    // Retrieves all students, optionally filtered by facultyId
    @GetMapping()
    public ResponseEntity<List<FormGetStudent>> getAllStudents(@RequestParam(required = false) Integer facultyId){
        if(facultyId == null){
            // If no facultyId is provided, return all students
            ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllFormGetStudents());

            return responseEntity;
        } else {
            // If facultyId is provided, return students from that faculty
            ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllFormGetStudentsByFacultyId(facultyId));

            return responseEntity;
        }
    }

    // Retrieves a student by their ID
    @GetMapping("/{id}")
    public ResponseEntity<FormGetStudent> getAllStudentsById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getStudentById(id));

        return responseEntity;
    }

    // Retrieves all students by their faculty ID
    @GetMapping("/faculty/{id}")
    public ResponseEntity<List<FormGetStudent>> getAllStudentsByFacultyId(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getStudentsByFacultyId(id));

        return responseEntity;
    }

    // Updates a student's information
    @PutMapping()
    public ResponseEntity<Student> updateStudent(@RequestBody Student student){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateStudent(student));

        return responseEntity;
    }

    // Updates a student's first name by their ID
    @PutMapping("/{id}/firstname")
    public ResponseEntity<Student> updateFirstNameByStudentId(@PathVariable Integer id, @RequestBody String firstname){
        firstname = firstname.substring(10, firstname.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateFirstNameByStudentId(id, firstname));

        return responseEntity;

        // TODO: Update this method to use PATCH for partial updates in the future
    }

    // Updates a student's last name by their ID
    @PutMapping("/{id}/lastname")
    public ResponseEntity<Student> updateLastNameByStudentId(@PathVariable Integer id, @RequestBody String lastname){
        lastname = lastname.substring(10, lastname.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateLastNameByStudentId(id, lastname));

        return responseEntity;

        // TODO: Update this method to use PATCH for partial updates in the future
    }

    // Updates a student's group by their ID
    @PutMapping("/{id}/group")
    public ResponseEntity<Student> updateGroupByStudentId(@PathVariable Integer id, @RequestBody String group){
        group = group.substring(10, group.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateGroupByStudentId(id, group));

        return responseEntity;

        // TODO: Update this method to use PATCH for partial updates in the future
    }

    // Updates a student's faculty by their ID
    @PutMapping("/{id}/faculty")
    public ResponseEntity<Student> updateFacultyByStudentId(@PathVariable Integer id, @RequestBody String facultyId){
        facultyId = facultyId.substring(14, facultyId.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateFacultyByStudentId(id, facultyId));

        return responseEntity;

        // TODO: Update this method to use PATCH for partial updates in the future
    }

    // Adds a new student
    @PostMapping()
    public  ResponseEntity<Student> insertStudent(@RequestBody Student student){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.insertStudent(student));

        return  responseEntity;
    }

    // Deletes a student
    @DeleteMapping()
    public ResponseEntity<Student> deleteStudent(@RequestBody Student student){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.deleteStudent(student));

        return responseEntity;
    }
}
