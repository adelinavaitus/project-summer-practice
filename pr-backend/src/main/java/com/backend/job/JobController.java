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

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getAllJobs(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllJobs());
        return responseEntity;
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<Job> getAllJobsById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getJobById(id));
        return responseEntity;
    }

    @GetMapping("/jobs/companies/{id}")
    public ResponseEntity<List<Job>> getAllJobsByCompanyId(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getByCompanyId(id));
        return responseEntity;
    }

    @PutMapping("/jobs")
    public ResponseEntity<Job> updateJob(@RequestBody FormGetJob formGetJob){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateJob(formGetJob));
        return responseEntity;
    }

    @PutMapping("/job-enable")
    public ResponseEntity<Job> enableJobByid(@RequestBody String jobId){
        System.out.println(jobId);
        jobId =jobId.substring(9, jobId.length()-1);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.enableJobById(jobId));
        return responseEntity;
    }

    @PutMapping("/job-disable")
    public ResponseEntity<Job> disableJobById(@RequestBody String jobId){
        System.out.println(jobId);
        jobId =jobId.substring(9, jobId.length()-1);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.disableJobById(jobId));
        return responseEntity;
    }


    @PostMapping("/jobs")
    public  ResponseEntity<Job> insertJob(@RequestBody FormGetJob formGetJob){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.insertJob(formGetJob));
        return  responseEntity;
    }

    @DeleteMapping("/jobs")
    public ResponseEntity<Job> deleteJob(@RequestBody Job job){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.deleteJob(job));
        return responseEntity;
    }

//    @GetMapping("/jobs-available")
//    public ResponseEntity<List<Job>> getAllAvailableJobs (){
//        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllAvailableJobs());
//        return responseEntity;
//    }
//
//    @GetMapping("/jobs-unavailable")
//    public ResponseEntity<List<Job>> getAllUnavailableJobs (){
//        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllUnavailableJobs());
//        return responseEntity;
//    }
//
//    @GetMapping("/jobs-available/{company_id}")
//    public ResponseEntity<List<Job>> getAllAvailableJobsByCompanyId(@PathVariable Integer company_id){
//        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllAvailableJobsByCompanyId(company_id));
//        return responseEntity;
//    }
//
//    @GetMapping("/jobs-unavailable/{company_id}")
//    public ResponseEntity<List<Job>> getAllUnavailableJobsByCompanyId(@PathVariable Integer company_id){
//        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllUnavailableJobsByCompanyId(company_id));
//        return responseEntity;
//    }

}

