package com.backend.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/companies")
public class CompanyController {

    @Autowired
    private CompanyService service;

    // Endpoint to retrieve all companies
    @GetMapping()
    public ResponseEntity<List<Company>> getCompanies(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllFormsGetCompanies());

        return responseEntity;
    }

    // Endpoint to retrieve a company by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Integer id){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.getCompanyById(id));

        return responseEntity;
    }

    // Endpoint to insert a new company
    @PostMapping()
    public ResponseEntity<Company> insertCompany (@RequestBody Company company){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.insertCompany(company));

        return responseEntity;
    }

    // Endpoint to update an existing company
    @PutMapping()
    public ResponseEntity<Company> updateCompany(@RequestBody Company company){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateCompany(company));

        return responseEntity;
    }

    // Endpoint to update a company's name by its ID
    @PutMapping("/{id}/name")
    public ResponseEntity<Company> updateCompanyNameById(@PathVariable Integer id, @RequestBody String  name){
        System.out.println(name);
        name = name.substring(10, name.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateCompanyNameById(id, name));

        return responseEntity;
    }

    // Endpoint to update a company's description by its ID
    @PutMapping("/{id}/description")
    public ResponseEntity<Company> updateCompanyDescriptionById(@PathVariable Integer id, @RequestBody String  description){
        System.out.println(description);
        description = description.substring(16, description.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateCompanyDescriptionById(id, description));

        return responseEntity;
    }

    // Endpoint to update a company's size by its ID
    @PutMapping("/{id}/size")
    public ResponseEntity<Company> updateCompanySizeById(@PathVariable Integer id, @RequestBody String  size){
        System.out.println(size);
        size = size.substring(10, size.length()-2);
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.updateCompanySizeById(id, size));

        return responseEntity;
    }

    // Endpoint to delete a company
    @DeleteMapping()
    public ResponseEntity<Company> deleteCompany(@RequestBody Company company){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(service.deleteCompany(company));

        return responseEntity;
    }
}
