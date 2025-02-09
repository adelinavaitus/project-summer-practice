package com.backend.resume.experience;

import com.backend.resume.ResumeStudent;
import com.backend.resume.ResumeStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperienceService {

    @Autowired
    private ExperienceRepository experienceRepository;

    @Autowired
    private ResumeStudentRepository resumeStudentRepository;

    // Method to get all experiences from the database
    public List<Experience> getAllExperiences(){
        List<Experience>  experiences = experienceRepository.findAll();

        return experiences;
    }

    // Method to get an experience by its ID
    public Experience getExperienceById(int id){
        Experience experience = experienceRepository.findById(id).get();

        return experience;
    }

    // Method to insert a new experience
    public Experience insertExperience(FormGetExperience formGetExperience){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetExperience.getResume_student_id());
        Experience experience = new Experience();
        experience.setYearStart(formGetExperience.getYearStart());
        experience.setYearStop(formGetExperience.getYearStop());
        experience.setJobTitle(formGetExperience.getJobTitle());
        experience.setCompanyName(formGetExperience.getCompanyName());
        experience.setJobDescription(formGetExperience.getJobDescription());
        experience.setResume(resumeStudent);

        return experienceRepository.save(experience);
    }

    // Method to update an existing experience
    public Experience updateExperience (FormGetExperience formGetExperience){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetExperience.getResume_student_id());
        Experience experience = new Experience();
        experience.setId(formGetExperience.getId());
        experience.setYearStart(formGetExperience.getYearStart());
        experience.setYearStop(formGetExperience.getYearStop());
        experience.setJobTitle(formGetExperience.getJobTitle());
        experience.setCompanyName(formGetExperience.getCompanyName());
        experience.setJobDescription(formGetExperience.getJobDescription());
        experience.setResume(resumeStudent);

        return experienceRepository.save(experience);
    }

    // Method to delete an experience
    public Experience deleteExperience(Experience experience){
        Experience oldExperience = experience;
        experienceRepository.delete(experience);

        return oldExperience;
    }
}
