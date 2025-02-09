package com.backend.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Method to retrieve all roles from the database
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    // Method to insert a new role into the database
    public Role insertRole(Role role) {
        return roleRepository.save(role);
    }

    // Method to update an existing role in the database
    public Role updateRole(Role role) {
        return roleRepository.save(role);
    }

    // Method to delete a role from the database
    public Role deleteRole(Role role) {
        Role oldRole = role;
        roleRepository.delete(role);
        return oldRole;
    }
}

