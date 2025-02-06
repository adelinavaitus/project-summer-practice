package com.backend.resume.education;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/educations")
public class EducationController {

    @Autowired
    private EducationService service;

    @GetMapping()
    public ResponseEntity<List<Education>> getAllEducations(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllEducation());
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Education> getAllEducationsById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getEducationById(id));
        return responseEntity;
    }

    @PutMapping()
    public ResponseEntity<Education> updateEducation(@RequestBody FormGetEducation formGetEducation){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateEducation(formGetEducation));
        return responseEntity;
    }

    @PostMapping()
    public  ResponseEntity<Education> insertEducation(@RequestBody  FormGetEducation formGetEducation){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.insertEducation(formGetEducation));
        return  responseEntity;
    }

    @DeleteMapping()
    public ResponseEntity<Education> deleteEducation(@RequestBody Education education){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.deleteEducation(education));
        return responseEntity;
    }
}
