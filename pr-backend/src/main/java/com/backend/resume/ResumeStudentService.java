package com.backend.resume;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeStudentService {

    @Autowired
    private ResumeStudentRepository repository;

    public List<ResumeStudent> getAllResumes(){
        List<ResumeStudent>  resumes = repository.findAll();

        return resumes;
    }

    // Retrieves a specific resume by its ID
    public ResumeStudent getResumeById(int id){
        ResumeStudent resumeStudent = repository.findById(id).get();

        return  resumeStudent;
    }

    // Retrieves a resume by the student's ID and converts it into a FormGetResumeStudent object
    public FormGetResumeStudent getResumeByStudentId(int studentId){
        ResumeStudent resumeStudent= repository.findByStudentId(studentId);
        FormGetResumeStudent formGetResumeStudent = new FormGetResumeStudent();

        // If a resume is found, set its fields in the FormGetResumeStudent object
        if(resumeStudent != null){
            formGetResumeStudent.setId(resumeStudent.getId());
            formGetResumeStudent.setUserId(resumeStudent.getUser().getId());
            formGetResumeStudent.setDescription(resumeStudent.getDescription());
            formGetResumeStudent.setForeignLanguages(resumeStudent.getForeignLanguages());
            formGetResumeStudent.setTechSkills(resumeStudent.getTechSkills());
            formGetResumeStudent.setSoftSkills(resumeStudent.getSoftSkills());
            formGetResumeStudent.setEducations(resumeStudent.getEducations());
            formGetResumeStudent.setExperiences(resumeStudent.getExperiences());
            formGetResumeStudent.setProjects(resumeStudent.getProjects());
        }

        return formGetResumeStudent;
    }

    // Inserts a new resume into the repository
    public ResumeStudent insertResume(ResumeStudent resumeStudent){
        return  repository.save(resumeStudent);
    }

    // Updates an existing resume in the repository
    public ResumeStudent updateResume (ResumeStudent resumeStudent){
        return repository.save(resumeStudent);
    }

    // Deletes a resume from the repository and returns the deleted resume
    public ResumeStudent deleteResume(ResumeStudent resumeStudent){
        ResumeStudent oldResume = resumeStudent;
        repository.delete(resumeStudent);

        return oldResume;
    }

    // Updates the description of a resume by its ID
    public ResumeStudent updateDescriptionByResumeId(int id, String description){
        ResumeStudent resumeStudent = getResumeById(id);
        resumeStudent.setDescription(description);

        return repository.save(resumeStudent);
    }

    // Updates the tech skills of a resume by its ID
    public ResumeStudent updateTechSkillsByResumeId(int id, String techSkills){
        ResumeStudent resumeStudent = getResumeById(id);
        resumeStudent.setTechSkills(techSkills);

        return repository.save(resumeStudent);
    }

    // Updates the soft skills of a resume by its ID
    public ResumeStudent updateSoftSkillsByResumeId(int id, String softSkills){
        ResumeStudent resumeStudent = getResumeById(id);
        resumeStudent.setSoftSkills(softSkills);

        return repository.save(resumeStudent);
    }

    // Updates the foreign languages of a resume by its ID
     public ResumeStudent updateForeignLanguagesByResumeId(int id, String foreignLanguages){
         ResumeStudent resumeStudent = getResumeById(id);
         resumeStudent.setForeignLanguages(foreignLanguages);

         return repository.save(resumeStudent);
     }
}