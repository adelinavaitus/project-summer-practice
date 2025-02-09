package com.backend.application;

import com.backend.job.Job;
import com.backend.job.JobService;
import com.backend.student.Student;
import com.backend.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private JobService jobService;

    // Method to get all applications
    public List<Application> getAllApplications(){
        List<Application> applications = applicationRepository.findAll();

        return applications;
    }

    // Method to find all applications by student ID
    public List<Application> findAllByStudentId(int id){
        List<Application> applications = applicationRepository.findByStudentID(id);

        return applications;
    }

    // Method to find all applications by company ID
    public List<Application> findAllByCompanyId(int id){
        List<Application> applications = applicationRepository.findByCompanyId(id);

        return applications;
    }

    // Method to find all applications by job ID
    public List<Application> findAllByJobId(int id){
        List<Application> applications = applicationRepository.findByJobId(id);

        return applications;
    }

    // Method to insert a new application
    public Application insertApplication (FormGetApplication formGetApplication){
        Student student = studentService.getStudentById(formGetApplication.getStudentId());
        Job job = jobService.getJobById(formGetApplication.getJobId());

        Application application = new Application();
        application.setJob(job);
        application.setStudent(student);
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        application.setDate(date);

        return applicationRepository.save(application);
    }

    // Method to update an existing application
    public Application updateApplication ( Application application){
        Application updatedApplication = applicationRepository.save(application);

        return updatedApplication;
    }

    // Method to delete an application
    public Application deleteApplication (Application application){
        Application oldApplication = application;
        applicationRepository.delete(application);

        return oldApplication;
    }
}