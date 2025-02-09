package com.backend.faculty;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    // Retrieve all faculties from the repository
    public List<Faculty> getAllFaculties(){
        List<Faculty> faculties = facultyRepository.findAll();

        return faculties;
    }

    // Retrieve a specific faculty by its ID
    public Faculty getFacultyById(int id){
        Faculty faculty = facultyRepository.findById(id).get();

        return faculty;
    }

    // Retrieve a specific faculty by its name
    public Faculty getFacultyByName(String name){
        Faculty faculty = facultyRepository.getByName(name);

        return faculty;
    }

    // Insert a new faculty into the repository
    public Faculty insertFaculty(Faculty faculty){
        Faculty newFaculty = facultyRepository.save(faculty);

        return newFaculty;
    }

    // Update an existing faculty
    public Faculty updateFaculty (Faculty faculty){
        Faculty updatedFaculty = facultyRepository.save(faculty);

        return updatedFaculty;
    }

    // Update the description of a faculty by its ID
    public Faculty updateDescriptionById (int id, String description){
        Faculty faculty = getFacultyById(id);
        faculty.setDescription(description);

        return facultyRepository.save(faculty);
    }

    // Delete a faculty from the repository
    public  Faculty deleteFaculty(Faculty faculty){
        Faculty oldFaculty = faculty;
        facultyRepository.delete(faculty);

        return oldFaculty;
    }
}
