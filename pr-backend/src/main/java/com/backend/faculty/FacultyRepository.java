package com.backend.faculty;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Integer> {
    //Custom query method to fetch a Faculty entity by its name
    Faculty getByName(String name);
}
