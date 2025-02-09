package com.backend.job;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
public class JobController {

    @Autowired
    private JobService service;

    // Retrieves all jobs
    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllJobs());

        return responseEntity;
    }

    // Retrieves a job by its ID
    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getAllJobsById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getJobById(id));

        return responseEntity;
    }

    // Retrieves jobs by a specific company ID
    @GetMapping("/jobs/companies/{id}")
    public ResponseEntity<List<Job>> getAllJobsByCompanyId(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getByCompanyId(id));

        return responseEntity;
    }

    // Updates a job's details
    @PutMapping("/jobs")
    public ResponseEntity<Job> updateJob(@RequestBody FormGetJob formGetJob){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateJob(formGetJob));

        return responseEntity;
    }

    // Enables a job by its ID (sets 'available' to true)
    @PutMapping("/job-enable")
    public ResponseEntity<Job> enableJobByid(@RequestBody String jobId){
        System.out.println(jobId);
        jobId =jobId.substring(9, jobId.length()-1);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.enableJobById(jobId));

        return responseEntity;
    }

    // Disables a job by its ID (sets 'available' to false)
    @PutMapping("/job-disable")
    public ResponseEntity<Job> disableJobById(@RequestBody String jobId){
        System.out.println(jobId);
        jobId =jobId.substring(9, jobId.length()-1);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.disableJobById(jobId));

        return responseEntity;
    }

    // Inserts a new job
    @PostMapping("/jobs")
    public  ResponseEntity<Job> insertJob(@RequestBody FormGetJob formGetJob){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.insertJob(formGetJob));

        return  responseEntity;
    }

    // Deletes a job
    @DeleteMapping("/jobs")
    public ResponseEntity<Job> deleteJob(@RequestBody Job job){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.deleteJob(job));

        return responseEntity;
    }
}

