package com.backend.resume;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeStudentRepository  extends JpaRepository<ResumeStudent ,Integer> {

    @Query( value = "SELECT * FROM resumes r WHERE r.student_id = ?1 ", nativeQuery = true)
    ResumeStudent findByStudentId(int studentId);
}
