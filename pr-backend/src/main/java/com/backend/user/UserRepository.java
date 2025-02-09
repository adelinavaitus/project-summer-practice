package com.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Checks if a user already exists in the database with the given email
    Boolean existsByEmail(String email);

    // Retrieves a user from the database by their email, returning an Optional to handle possible null values
    Optional<User> findByEmail(String email);
}
