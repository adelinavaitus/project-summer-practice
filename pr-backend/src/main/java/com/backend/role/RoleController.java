package com.backend.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    // Method to get a list of all roles
    @GetMapping()
    public ResponseEntity<List<Role>> getRoles() {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.getRoles());
    }

    // Method to create a new role
    @PostMapping()
    public ResponseEntity<Role> insertRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roleService.insertRole(role));
    }

    // Method to update an existing role
    @PutMapping()
    public ResponseEntity<Role> updateRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.updateRole(role));
    }

    // Method to delete a role
    @DeleteMapping
    public ResponseEntity<Role> deleteRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.deleteRole(role));
    }
}
