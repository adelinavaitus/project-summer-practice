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

    public List<Education> getAllEducation(){
        List<Education>  educations = educationRepository.findAll();
        return educations;
    }

    public Education getEducationById(int id){
        Education education = educationRepository.findById(id).get();
        return  education;
    }

    public Education insertEducationSimple(Education education){
        return educationRepository.save(education);
    }

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

    public Education deleteEducation(Education education){
        Education oldEducation = education;
        educationRepository.delete(education);
        return oldEducation;
    }

}
