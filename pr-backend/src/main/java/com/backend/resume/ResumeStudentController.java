package com.backend.resume;


import jdk.jfr.Description;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/resumes")
public class ResumeStudentController {

    @Autowired
    private ResumeStudentService service;

    // Endpoint to retrieve all resumes
    @GetMapping()
    public ResponseEntity<List<ResumeStudent>> getAllResumes(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllResumes());

        return responseEntity;
    }

    // Endpoint to retrieve a resume by its ID
    @GetMapping("/{id}")
    public ResponseEntity<ResumeStudent> getResumeById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getResumeById(id));

        return responseEntity;
    }

    // Endpoint to retrieve a resume by student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<FormGetResumeStudent> getResumeByStudentID
            (@PathVariable Integer studentId){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getResumeByStudentId(studentId));

        return responseEntity;
    }

    // Endpoint to update an existing resume
    @PutMapping()
    public ResponseEntity<ResumeStudent> updateResume(@RequestBody ResumeStudent resume){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateResume(resume));

        return responseEntity;
    }

    // Endpoint to insert a new resume
    @PostMapping()
    public  ResponseEntity<ResumeStudent> insertResume(@RequestBody ResumeStudent resume){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.insertResume(resume));

        return  responseEntity;
    }

    // Endpoint to update the description of a resume by ID
    @PutMapping("/{id}/description")
    public ResponseEntity<ResumeStudent> updateDescriptionByResumeStudent
            (@PathVariable Integer id, @RequestBody String description){
        description = description.substring(16, description.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateDescriptionByResumeId(id, description));

        return responseEntity;
    }

    // Endpoint to update tech skills of a resume by ID
    @PutMapping("/{id}/techskills")
    public ResponseEntity<ResumeStudent> updateTechskillsByResumeStudent
            (@PathVariable Integer id, @RequestBody String techSkills){
        techSkills = techSkills.substring(15, techSkills.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateTechSkillsByResumeId(id, techSkills));

        return responseEntity;
    }

    // Endpoint to update soft skills of a resume by ID
    @PutMapping("/{id}/softskills")
    public ResponseEntity<ResumeStudent> updateSoftskillsByResumeStudent
            (@PathVariable Integer id, @RequestBody String softSkills){
        softSkills = softSkills.substring(15, softSkills.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateSoftSkillsByResumeId(id, softSkills));

        return responseEntity;
    }

    // Endpoint to update foreign languages of a resume by ID
    @PutMapping("/{id}/foreignlanguages")
    public ResponseEntity<ResumeStudent> updateForeignLanguagesByResumeStudent
            (@PathVariable Integer id, @RequestBody String foreignLanguages){
        foreignLanguages = foreignLanguages.substring(21, foreignLanguages.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateForeignLanguagesByResumeId(id, foreignLanguages));

        return responseEntity;
    }

    // Endpoint to delete a resume
    @DeleteMapping()
    public ResponseEntity<ResumeStudent> deleteResume(@RequestBody ResumeStudent resume){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.deleteResume(resume));

        return responseEntity;
    }
}