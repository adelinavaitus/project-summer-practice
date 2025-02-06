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


    public List<Experience> getAllExperiences(){
        List<Experience>  experiences = experienceRepository.findAll();
        return experiences;
    }

    public Experience getExperienceById(int id){
        Experience experience = experienceRepository.findById(id).get();
        return  experience;
    }

    public Experience insertExperience(FormGetExperience formGetExperience){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetExperience.getResume_student_id());
        Experience experience = new Experience();
        experience.setYearStart(formGetExperience.getYearStart());
        experience.setYearStop(formGetExperience.getYearStop());
        experience.setJobTitle(formGetExperience.getJobTitle());
        experience.setCompanyName(formGetExperience.getCompanyName());
        experience.setJobDescription(formGetExperience.getJobDescription());
        experience.setResume(resumeStudent);
        return  experienceRepository.save(experience);
    }

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

    public Experience deleteExperience(Experience experience){
        Experience oldExperience = experience;
        experienceRepository.delete(experience);
        return oldExperience;
    }
}
