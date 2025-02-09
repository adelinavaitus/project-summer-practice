package com.backend.job;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {
    // Retrieves all jobs associated with a specific company
    @Query(value = "SELECT * FROM jobs j where j.company_id = ?1", nativeQuery = true)
    List<Job> findBycompany_id(int id);

    // Retrieves all available jobs (jobs with 'available' set to 1)
    @Query(value = "SELECT * FROM jobs j where  j.available = 1", nativeQuery = true)
    List<Job> findJobsAvailable();

    // Retrieves all unavailable jobs (jobs with 'available' set to 0)
    @Query(value = "SELECT * FROM jobs j where j.available = 0", nativeQuery = true)
    List<Job> findJobsUnavailable();

    // Retrieves available jobs for a specific company (jobs with 'available' set to 1)
    @Query(value = "SELECT * FROM jobs j where  j.available = 1 and j.company_id= ?1", nativeQuery = true)
    List<Job> findJobsAvailableByCompanyId(int company_id);

    // Retrieves unavailable jobs for a specific company (jobs with 'available' set to 0)
    @Query(value = "SELECT * FROM jobs j where  j.available = 0 and j.company_id= ?1", nativeQuery = true)
    List<Job> findJobsUnavailableByCompanyId(int company_id);
}