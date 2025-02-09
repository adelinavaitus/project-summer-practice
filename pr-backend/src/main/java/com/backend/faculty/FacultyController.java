package com.backend.faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/faculties")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    // Endpoint to get all faculties
    @GetMapping()
    public ResponseEntity<List<Faculty>> getFaculties(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(facultyService.getAllFaculties());

        return responseEntity;
    }

    // Endpoint to get a specific faculty by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(facultyService.getFacultyById(id));

        return responseEntity;
    }

    // Endpoint to get a specific faculty by its name
    @GetMapping("/{name}")
    public ResponseEntity<Faculty> getFacultyByName(@PathVariable String name){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(facultyService.getFacultyByName(name));

        return responseEntity;
    }

    // Endpoint to insert a new faculty
    @PostMapping()
    public ResponseEntity<Faculty> insertFaculty(@RequestBody Faculty faculty){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(facultyService.insertFaculty(faculty));

        return responseEntity;
    }

    // Endpoint to update an existing faculty
    @PutMapping()
    public ResponseEntity<Faculty> updateFaculty(@RequestBody Faculty faculty){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(facultyService.updateFaculty(faculty));

        return responseEntity;
    }

    // Endpoint to update the description of a faculty by its ID
    @PutMapping("/{id}/description")
    public ResponseEntity<Faculty> updateDescriptionById(@PathVariable Integer id,
                                                         @RequestBody String description){
        description = description.substring(16, description.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(facultyService.updateDescriptionById(id, description));

        return responseEntity;
    }
}
