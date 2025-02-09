package com.backend.role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository  extends JpaRepository<Role,Long> {
    // Method to find a role by its name (e.g., ROLE_STUDENT, ROLE_ADMIN)
    Optional<Role> findByName(RoleName roleName);
}