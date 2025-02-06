package com.backend.resume.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/projects")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @GetMapping()
    public ResponseEntity<List<Project>> getAllProjects(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getAllProjects());
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.getProjectById(id));
        return responseEntity;
    }

    @PutMapping()
    public ResponseEntity<Project> updateProject(@RequestBody FormGetProject formGetProject){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.updateProject(formGetProject));
        return responseEntity;
    }

    @PostMapping()
    public  ResponseEntity<Project> insertProject(@RequestBody FormGetProject formGetProject){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.insertProject(formGetProject));
        return  responseEntity;
    }

    @DeleteMapping()
    public ResponseEntity<Project> deleteProject(@RequestBody Project project){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(service.deleteProject(project));
        return responseEntity;
    }

}
