package com.backend.job;

import com.backend.application.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Integer> {


    @Query(value = "SELECT * FROM jobs j where j.company_id = ?1", nativeQuery = true)
    List<Job> findBycompany_id(int id);

    @Query(value = "SELECT * FROM jobs j where  j.available = 1", nativeQuery = true)
    List<Job> findJobsAvailable();

    @Query(value = "SELECT * FROM jobs j where j.available = 0", nativeQuery = true)
    List<Job> findJobsUnavailable();

    @Query(value = "SELECT * FROM jobs j where  j.available = 1 and j.company_id= ?1", nativeQuery = true)
    List<Job> findJobsAvailableByCompanyId(int company_id);

    @Query(value = "SELECT * FROM jobs j where  j.available = 0 and j.company_id= ?1", nativeQuery = true)
    List<Job> findJobsUnavailableByCompanyId(int company_id);
}
