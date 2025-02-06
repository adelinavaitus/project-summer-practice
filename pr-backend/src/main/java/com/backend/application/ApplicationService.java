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


    public List<Application> getAllApplications(){
        List<Application> applications = applicationRepository.findAll();
        return applications;
    }

    public List<Application> findAllByStudentId(int id){
        List<Application> applications = applicationRepository.findByStudentID(id);
        return applications;
    }

    public List<Application> findAllByCompanyId(int id){
        List<Application> applications = applicationRepository.findByCompanyId(id);
        return applications;
    }
    public List<Application> findAllByJobId(int id){
        List<Application> applications = applicationRepository.findByJobId(id);
        return applications;
    }


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

    public Application updateApplication ( Application application){
        Application updatedApplication = applicationRepository.save(application);
        return updatedApplication;
    }

    public Application deleteApplication (Application application){
        Application oldApplication = application;
        applicationRepository.delete(application);
        return oldApplication;
    }

}
