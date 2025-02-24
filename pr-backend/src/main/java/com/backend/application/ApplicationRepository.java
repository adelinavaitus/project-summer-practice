package com.backend.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    // Query to find applications by student ID
    @Query(value = "SELECT * FROM applications a where a.student_id = ?1", nativeQuery = true)
    List<Application> findByStudentID(int id);

    // Query to find applications by job ID
    @Query(value = "SELECT * FROM applications a where a.job_id = ?1", nativeQuery = true)
    List<Application> findByJobId(int id);

    // Query to find applications by company ID
    @Query(value = "select * from applications a left join jobs j on j.id = a.job_id where j.company_id= ?1", nativeQuery = true)
    List<Application> findByCompanyId(int id);
}