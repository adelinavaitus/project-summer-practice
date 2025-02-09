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

    // Retrieves all projects from the database
    public List<Project> getAllProjects(){
        List<Project>  projects = projectRepository.findAll();

        return projects;
    }

    // Retrieves a specific project by its ID
    public Project getProjectById(int id){
        Project project = projectRepository.findById(id).get();

        return  project;
    }

    // Inserts a new project based on the provided form data
    public Project insertProject(FormGetProject formGetProject){
        ResumeStudent resumeStudent = resumeStudentRepository.getById(formGetProject.getResume_student_id());
        Project project = new Project();
        project.setYearP(formGetProject.getYearP());
        project.setTitle(formGetProject.getTitle());
        project.setDescription(formGetProject.getDescription());
        project.setResume(resumeStudent);

        return  projectRepository.save(project);
    }

    // Updates an existing project based on the provided form data
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

    // Deletes the specified project from the database
    public Project deleteProject(Project project){
        Project oldProject = project;
        projectRepository.delete(project);

        return oldProject;
    }
}