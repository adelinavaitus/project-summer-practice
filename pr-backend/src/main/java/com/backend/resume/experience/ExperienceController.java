package com.backend.resume.experience;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/experiences")
public class ExperienceController {

    @Autowired
    private ExperienceService service;

    // Endpoint to retrieve all experiences
    @GetMapping()
    public ResponseEntity<List<Experience>> getAllExperiences(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllExperiences());

        return responseEntity;
    }

    // Endpoint to retrieve a specific experience by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getExperienceById(id));

        return responseEntity;
    }

    // Endpoint to update an existing experience
    @PutMapping()
    public ResponseEntity<Experience> updateExperience(@RequestBody FormGetExperience formGetExperience){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateExperience(formGetExperience));

        return responseEntity;
    }

    // Endpoint to insert a new experience
    @PostMapping()
    public  ResponseEntity<Experience> insertExperience(@RequestBody FormGetExperience formGetExperience){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.insertExperience(formGetExperience));

        return  responseEntity;
    }

    // Endpoint to delete an existing experience
    @DeleteMapping()
    public ResponseEntity<Experience> deleteExperience(@RequestBody Experience experience){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.deleteExperience(experience));

        return responseEntity;
    }
}