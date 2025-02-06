package com.backend.supervisor;


import net.bytebuddy.implementation.bind.annotation.Super;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/supervisors")
public class SupervisorController {

    @Autowired
    private SupervisorService supervisorService;

    @GetMapping()
    public ResponseEntity<List<Supervisor>> getAllSupervisors(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.getAllFormGetSupervisors());
        return responseEntity;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supervisor> getSupervisorById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.getSupervisorById(id));
        return responseEntity;
    }

    @PutMapping("/{id}/firstname")
    public ResponseEntity<Supervisor> updateFirstNameBySupervisorId(@PathVariable Integer id, @RequestBody String firstname){
        firstname = firstname.substring(10, firstname.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.updateFirstNameBySupervisorId(id, firstname));
        return responseEntity;
    }

    @PutMapping("/{id}/lastname")
    public ResponseEntity<Supervisor> updateLastNameBySupervisorId(@PathVariable Integer id, @RequestBody String lastname){
        lastname = lastname.substring(10, lastname.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.updateLastNameBySupervisorId(id, lastname));
        return responseEntity;
    }
    @PostMapping()
    public ResponseEntity<Supervisor> insertSupervisor(@RequestBody FormGetSupervisors formGetSupervisors){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.insertSupervisor2(formGetSupervisors));
        return responseEntity;
    }

    @PutMapping()
    public ResponseEntity<Supervisor> updateSupervisor(@RequestBody Supervisor supervisor){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.updateSupervisor(supervisor));
        return responseEntity;
    }

    @DeleteMapping()
    public ResponseEntity<Supervisor> deleteSupervisor(@RequestBody Supervisor supervisor){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK).body(supervisorService.deleteSupervisor(supervisor));
        return responseEntity;
    }
}
