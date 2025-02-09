package com.backend.job;

import com.backend.company.Company;
import com.backend.company.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private CompanyService companyService;

    // Retrieves all jobs
    public List<Job> getAllJobs(){
        List<Job> jobs = jobRepository.findAll();

        return jobs;
    }

    // Retrieves jobs by company ID
    public List<Job> getByCompanyId(int  companyId){
        List<Job> jobs = jobRepository.findBycompany_id(companyId);

        return  jobs;
    }

    // Retrieves a job by its ID
    public Job getJobById ( int id){
        Job job = jobRepository.findById(id).get();

        return job;
    }

    // Updates an existing job
    public Job updateJob(FormGetJob formGetJob){
        Company company = companyService.getCompanyById(formGetJob.getCompanyId());
        Job oldJob = getJobById(formGetJob.getId());
        Job job = new Job();
        job.setId(formGetJob.getId());
        job.setCompany(company);
        job.setTitle(formGetJob.getTitle());
        job.setJobType(formGetJob.getJobType());
        job.setDescription(formGetJob.getDescription());
        job.setDate(oldJob.getDate());
        job.setAvailable(true);

        return jobRepository.save(job);
    }


    // Inserts a new job
    public Job insertJob(FormGetJob formGetJob){
        Company company = companyService.getCompanyById(formGetJob.getCompanyId());
        Job job = new Job();
        job.setCompany(company);
        job.setTitle(formGetJob.getTitle());
        job.setDescription(formGetJob.getDescription());
        job.setJobType(formGetJob.getJobType());
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        job.setDate(date);
        job.setAvailable(true);

        return jobRepository.save(job);
    }

    // Enables a job by its ID (sets 'available' to true)
    public Job enableJobById(String jobId){
        Job job = getJobById(Integer.parseInt(jobId));
        job.setAvailable(true);

        return jobRepository.save(job);
    }

    // Disables a job by its ID (sets 'available' to false)
    public Job disableJobById(String jobId){

        Job job = getJobById(Integer.parseInt(jobId));
        job.setAvailable(false);

        return jobRepository.save(job);
    }

    // Deletes a job
    public Job deleteJob (Job job) {
        Job oldJob = job;
        jobRepository.delete(job);

        return oldJob;
    }
}
