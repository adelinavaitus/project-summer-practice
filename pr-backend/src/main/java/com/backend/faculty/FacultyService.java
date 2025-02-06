package com.backend.faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public List<Faculty> getAllFaculties(){
        List<Faculty> faculties = facultyRepository.findAll();
        return faculties;
    }

    public Faculty getFacultyById(int id){
        Faculty faculty = facultyRepository.findById(id).get();
        return faculty;
    }

    public Faculty getFacultyByName(String name){
        Faculty faculty = facultyRepository.getByName(name);
        return faculty;
    }

    public Faculty insertFaculty(Faculty faculty){
        Faculty newFaculty = facultyRepository.save(faculty);
        return newFaculty;
    }

    public Faculty updateFaculty (Faculty faculty){
        Faculty updatedFaculty = facultyRepository.save(faculty);
        return updatedFaculty;
    }

    public Faculty updateDescriptionById (int id, String description){
        Faculty faculty = getFacultyById(id);
        faculty.setDescription(description);
        return facultyRepository.save(faculty);
    }

    public  Faculty deleteFaculty(Faculty faculty){
        Faculty oldFaculty = faculty;
        facultyRepository.delete(faculty);
        return oldFaculty;
    }

}
