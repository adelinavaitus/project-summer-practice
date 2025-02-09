package com.backend.application;

import com.backend.company.Company;
import com.backend.company.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService service;

    // Method to get all applications
    @GetMapping()
    public ResponseEntity<List<Application>> getAllApplications(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllApplications());

        return responseEntity;
    }

    // Method to get all applications by student ID
    @GetMapping("/students/{id}")
    public ResponseEntity<List<Application>> getAllApplicationByStudentId(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.findAllByStudentId(id));

        return responseEntity;
    }

    // Method to get all applications by company ID
    @GetMapping("/companies/{id}")
    public ResponseEntity<List<Application>> getAllApplicationByCompanyId(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.findAllByCompanyId(id));

        return responseEntity;
    }

    // Method to get all applications by job ID
    @GetMapping("/jobs/{id}")
    public ResponseEntity<List<Application>> getAllApplicationByJobId(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.findAllByJobId(id));

        return responseEntity;
    }

    // Method to insert a new application
    @PostMapping()
    public ResponseEntity<Company> insertApplication (@RequestBody FormGetApplication formGetApplication){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.insertApplication(formGetApplication));

        return responseEntity;
    }

    // Method to update an existing application
    @PutMapping()
    public ResponseEntity<Company> updateApplication(@RequestBody Application application){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateApplication(application));

        return responseEntity;
    }

    // Method to delete an application
    @DeleteMapping()
    public ResponseEntity<Company> deleteApplication(@RequestBody Application application){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.deleteApplication(application));

        return responseEntity;
    }
}