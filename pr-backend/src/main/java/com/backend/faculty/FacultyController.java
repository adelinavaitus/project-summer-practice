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


    @GetMapping()
    public ResponseEntity<List<Faculty>> getFaculties(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(facultyService.getAllFaculties());
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Faculty> getFacultyById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(facultyService.getFacultyById(id));
        return responseEntity;
    }

    @GetMapping("/{name}")
    public ResponseEntity<Faculty> getFacultyByName(@PathVariable String name){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(facultyService.getFacultyByName(name));
        return responseEntity;
    }
    @PostMapping()
    public ResponseEntity<Faculty> insertFaculty(@RequestBody Faculty faculty){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(facultyService.insertFaculty(faculty));
        return responseEntity;
    }

    @PutMapping()
    public ResponseEntity<Faculty> updateFaculty(@RequestBody Faculty faculty){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(facultyService.updateFaculty(faculty));
        return responseEntity;
    }

    @PutMapping("/{id}/description")
    public ResponseEntity<Faculty> updateDescriptionById(@PathVariable Integer id, @RequestBody String description){
        description = description.substring(16, description.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(facultyService.updateDescriptionById(id, description));
        return responseEntity;
    }


}
