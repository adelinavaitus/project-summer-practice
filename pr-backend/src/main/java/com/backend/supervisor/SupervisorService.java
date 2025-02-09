package com.backend.supervisor;

import com.backend.faculty.Faculty;
import com.backend.faculty.FacultyService;
import com.backend.user.Forms.FormGetSupervisor;
import com.backend.user.User;
import com.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class SupervisorService {

    @Autowired
    private SupervisorRepository supervisorRepository;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private UserRepository userRepository;

    // Returns a list of all supervisors
    public List<Supervisor> getAllSupervisors(){
        List<Supervisor> supervisors = supervisorRepository.findAll();

        return supervisors;
    }

    // Returns a list of supervisors in the form of FormGetSupervisor objects
    public List<FormGetSupervisor> getAllFormGetSupervisors(){
        List<FormGetSupervisor> formGetSupervisors = new ArrayList<>();
        List<Supervisor> supervisors = supervisorRepository.findAll();
        for (Supervisor supervisor: supervisors){
            User user = userRepository.getById(supervisor.getId());
            FormGetSupervisor formGetSupervisor = new FormGetSupervisor();
            formGetSupervisor.setId(supervisor.getId());
            formGetSupervisor.setEmail(user.getEmail());
            formGetSupervisor.setFirstName(supervisor.getFirstName());
            formGetSupervisor.setLastName(supervisor.getLastName());
            formGetSupervisor.setFacultyName(supervisor.getFaculty().getName());
            formGetSupervisors.add(formGetSupervisor);
        }

        return formGetSupervisors;
    }

    // Fetches a supervisor by their ID
    public Supervisor getSupervisorById(int id){
        Supervisor supervisor = supervisorRepository.findById(id).get();

        return supervisor;
    }

    // Updates the first name of a supervisor by their ID
    public Supervisor updateFirstNameBySupervisorId(int id, String firstName){
        Supervisor supervisor = getSupervisorById(id);
        supervisor.setFirstName(firstName);

        return supervisorRepository.save(supervisor);

        // TODO: Change this to PATCH for partial update of the last name
    }

    // Updates the last name of a supervisor by their ID
    public Supervisor updateLastNameBySupervisorId(int id, String lastName){
        Supervisor supervisor = getSupervisorById(id);
        supervisor.setLastName(lastName);

        return supervisorRepository.save(supervisor);

        // TODO: Change this to PATCH for partial update of the last name
    }

    // Inserts a new supervisor using the data from the FormGetSupervisors object
    public Supervisor insertSupervisor2(FormGetSupervisors formGetSupervisors){
        Faculty faculty = facultyService.getFacultyById(formGetSupervisors.getFacultyId());
        Supervisor supervisor = new Supervisor();
        supervisor.setFirstName(formGetSupervisors.getFirstName());
        supervisor.setLastName(formGetSupervisors.getLastName());
        supervisor.setFaculty(faculty);

        return supervisorRepository.save(supervisor);
    }

    // Inserts a new supervisor directly
    public Supervisor insertSupervisor(Supervisor supervisor){
        return supervisorRepository.save(supervisor);
    }

    // Updates an existing supervisor
    public Supervisor updateSupervisor(Supervisor supervisor){
        return supervisorRepository.save(supervisor);
    }

    // Deletes a supervisor
    public Supervisor deleteSupervisor(Supervisor supervisor){
        Supervisor oldSupervisor = supervisor;
        supervisorRepository.delete(supervisor);

        return oldSupervisor;
    }
}
