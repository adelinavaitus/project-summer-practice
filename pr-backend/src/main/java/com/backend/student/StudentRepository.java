package com.backend.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Custom query to retrieve students by their faculty ID
    @Query( value = "SELECT * FROM students s WHERE s.faculty_id = ?1 ", nativeQuery = true)
    List<Student> findByFacultyId(int facultyId);

    // Checks if a student with the provided phone number already exists
    public Boolean existsStudentByPhoneNo(String phoneNo);
}