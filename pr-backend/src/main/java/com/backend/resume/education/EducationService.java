package com.backend.resume.education;


import com.backend.resume.ResumeStudent;
import com.backend.resume.ResumeStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private ResumeStudentRepository resumeStudentRepository;

    // Method to get all education records
    public List<Education> getAllEducation(){
        List<Education>  educations = educationRepository.findAll();

        return educations;
    }

    // Method to get an education record by its ID
    public Education getEducationById(int id){
        Education education = educationRepository.findById(id).get();

        return  education;
    }

    // Method to insert a new education record (simple version without DTO)
    public Education insertEducationSimple(Education education){
        return educationRepository.save(education);
    }

    // Method to insert a new education record using a FormGetEducation DTO
    public Education insertEducation(FormGetEducation formGetEducation){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetEducation.getResume_student_id());
        Education education =  new Education();
        education.setYearStart(formGetEducation.getYearStart());
        education.setYearStop(formGetEducation.getYearStop());
        education.setTitle(formGetEducation.getTitle());
        education.setSpecialization(formGetEducation.getSpecialization());
        education.setResume(resumeStudent);

        return  educationRepository.save(education);
    }

    // Method to update an existing education record using FormGetEducation DTO
    public Education updateEducation (FormGetEducation formGetEducation){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetEducation.getResume_student_id());
        Education education =  new Education();
        education.setId(formGetEducation.getId());
        education.setYearStart(formGetEducation.getYearStart());
        education.setYearStop(formGetEducation.getYearStop());
        education.setTitle(formGetEducation.getTitle());
        education.setSpecialization(formGetEducation.getSpecialization());
        education.setResume(resumeStudent);

        return educationRepository.save(education);
    }

    // Method to delete an education record
    public Education deleteEducation(Education education){
        Education oldEducation = education;
        educationRepository.delete(education);

        return oldEducation;
    }
}
