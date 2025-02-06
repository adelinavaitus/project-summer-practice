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

    @GetMapping()
    public ResponseEntity<List<Role>> getRoles() {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.getRoles());
    }

    @PostMapping()
    public ResponseEntity<Role> insertRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.CREATED).body(roleService.insertRole(role));
    }

    @PutMapping()
    public ResponseEntity<Role> updateRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.updateRole(role));
    }

    @DeleteMapping
    public ResponseEntity<Role> deleteRole(@RequestBody Role role) {
        return ResponseEntity.status(HttpStatus.OK).body(roleService.deleteRole(role));
    }
}
