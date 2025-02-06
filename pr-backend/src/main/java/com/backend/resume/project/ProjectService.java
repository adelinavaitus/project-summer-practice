package com.backend.resume.project;

import com.backend.resume.ResumeStudent;
import com.backend.resume.ResumeStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ResumeStudentRepository resumeStudentRepository;

    public List<Project> getAllProjects(){
        List<Project>  projects = projectRepository.findAll();
        return projects;
    }

    public Project getProjectById(int id){
        Project project = projectRepository.findById(id).get();
        return  project;
    }

    public Project insertProject(FormGetProject formGetProject){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetProject.getResume_student_id());
        Project project = new Project();
        project.setYearP(formGetProject.getYearP());
        project.setTitle(formGetProject.getTitle());
        project.setDescription(formGetProject.getDescription());
        project.setResume(resumeStudent);
        return  projectRepository.save(project);
    }

    public Project updateProject (FormGetProject formGetProject){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetProject.getResume_student_id());
        Project project = new Project();
        project.setId(formGetProject.getId());
        project.setYearP(formGetProject.getYearP());
        project.setTitle(formGetProject.getTitle());
        project.setDescription(formGetProject.getDescription());
        project.setResume(resumeStudent);
        return projectRepository.save(project);
    }

    public Project deleteProject(Project project){
        Project oldProject = project;
        projectRepository.delete(project);
        return oldProject;
    }
}
