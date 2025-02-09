package com.backend.user;

import com.backend.company.Company;
import com.backend.company.CompanyService;
import com.backend.document.DocumentService;
import com.backend.role.RoleName;
import com.backend.student.Student;
import com.backend.student.StudentService;
import com.backend.supervisor.Supervisor;
import com.backend.supervisor.SupervisorService;
import com.backend.user.Forms.FormGetCompany;
import com.backend.user.Forms.FormGetStudent;
import com.backend.user.Forms.FormGetSupervisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentService studentService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private SupervisorService supervisorService;

    @Autowired
    private DocumentService documentService;


    // The method requires the user to be logged in as an admin to return all students.
    // -> The logged-in user's ID is received, we fetch the user and check their role.

    // Get all users and all students from the database
    // Iterate through each user and match it with a student by email or ID, then add the info to the FormGetStudent

    // If the user is not an admin and is a student, return info only for the logged-in user
    // If the user is from a company, return an empty array
    public List<FormGetStudent> getAllStudents(int id){
        // Fetch the authenticated user based on the provided ID
        User authedUser = userRepository.getById(id);

        // Check if the logged-in user is an admin
        if (authedUser.getRole().getName() == RoleName.ROLE_ADMIN) {
            // If the user is an admin, retrieve all users and all students
            List<User>  userList = userRepository.findAll();
            List<Student> studentList = studentService.getAllStudents();
            List<FormGetStudent> formGetStudents = new ArrayList<>();

            // Iterate through all users and match them with students by ID
            for(User user: userList){
                for(Student student : studentList){
                    if(user.getId() == student.getId()){
                        // Create a FormGetStudent object and add it to the list
                        FormGetStudent formGetStudent = new FormGetStudent(user.getId(), user.getEmail(), student.getFirstName(), student.getLastName(),  student.getPhoneNo(), student.getGroup(), student.getFaculty().getName());
                        formGetStudents.add(formGetStudent);
                    }
                }
            }
            return formGetStudents;
        } else if((authedUser.getRole().getName() == RoleName.ROLE_STUDENT)) {
            // If the logged-in user is a student, return only the student's information
            Student student = studentService.getStudentById(authedUser.getId());
            List<FormGetStudent> formGetStudents = new ArrayList<>();
            FormGetStudent formGetStudent = new FormGetStudent(authedUser.getId(), authedUser.getEmail(), student.getFirstName(), student.getLastName(), student.getPhoneNo(), student.getGroup(), student.getFaculty().getName());
            formGetStudents.add(formGetStudent);

            return formGetStudents;
        }
         else {
            // If the user is neither an admin nor a student (likely a company), return an empty list
             List<FormGetStudent> formGetStudents = new ArrayList<>();

             return formGetStudents;
        }
    }

    // Same as the previous method, but for companies
    public List<FormGetCompany> getAllCompanies(int id){
        // Fetch the authenticated user based on the provided ID
        User authedUser = userRepository.getById(id);

        // Check if the logged-in user is an admin
        if (authedUser.getRole().getName() == RoleName.ROLE_ADMIN) {
            // If the user is an admin, retrieve all users and all companies
            List<User> userList = userRepository.findAll();
            List<Company> companyList = companyService.getAllCompanies();
            List<FormGetCompany> formGetCompanies = new ArrayList<>();

            // Iterate through all users and match them with companies by ID
            for( User user : userList){
                for(Company company : companyList){
                    if( user.getId() == company.getId()){
                        // Create a FormGetCompany object and add it to the list
                        FormGetCompany formGetCompany = new FormGetCompany(user.getId(), user.getEmail(), company.getName(), company.getSize(), company.getDescription());
                        formGetCompanies.add(formGetCompany);
                    }
                }
            }
            return formGetCompanies;
        } else if ((authedUser.getRole().getName() == RoleName.ROLE_COMPANY)){
            // If the logged-in user is a company, return only the company's information
            Company company = companyService.getCompanyById(authedUser.getId());
            List<FormGetCompany> formGetCompanies = new ArrayList<>();
            FormGetCompany formGetCompany = new FormGetCompany(authedUser.getId(), authedUser.email, company.getName(), company.getSize(), company.getDescription());
            formGetCompanies.add(formGetCompany);

            return formGetCompanies;
        } else {
            // If the user is neither an admin nor a company, return an empty list
            List<FormGetCompany> formGetCompanies = new ArrayList<>();

            return formGetCompanies;
        }
    }

    public FormGetStudent getUserById(int id){
        // Fetch the user from the repository using the provided ID
        User user = userRepository.findById(id).get();

        // Retrieve the student information based on the same ID
        Student student = studentService.getStudentById(id);

        // Create a new FormGetStudent object to hold the data
        FormGetStudent formGetStudent = new FormGetStudent();

        // Set the user's ID and email in the FormGetStudent object
        formGetStudent.setId(id);
        formGetStudent.setEmail(user.getEmail());

        // Set the student's details (name, phone number, group, faculty) in the FormGetStudent object
        formGetStudent.setFirstName(student.getFirstName());
        formGetStudent.setLastName(student.getLastName());
        formGetStudent.setPhoneNo(student.getPhoneNo());
        formGetStudent.setGroup(student.getGroup());
        formGetStudent.setFacultyName(student.getFaculty().getName());

        // Return the populated FormGetStudent object
        return formGetStudent;
    }

    public User getUserById2(int id){
        // Fetch the user from the repository using the provided ID and return it
        return userRepository.findById(id).get();
    }

    public FormGetStudent insertStudent(User user, Student student){
        // Save the new user to the repository and get the saved user object
        User newUser = userRepository.save(user);

        // Set the student's ID to the newly created user's ID
        student.setId(newUser.getId());

        // Insert the student and retrieve the saved student object
        Student newStudent = studentService.insertStudent(student);

        // Create a FormGetStudent object with the user's and student's details
        FormGetStudent formGetStudent  = new FormGetStudent(newUser.getId(), newUser.getEmail(), newStudent.getFirstName() , newStudent.getLastName(),  newStudent.getPhoneNo(), newStudent.getGroup(), newStudent.getFaculty().getName());

        // Return the populated FormGetStudent object
        return formGetStudent;
    }

    public FormGetCompany insertCompany (User user, Company company){
        // Save the new user to the repository and get the saved user object
        User newUser = userRepository.save(user);

        // Set the company's ID to the newly created user's ID
        company.setId(newUser.getId());

        // Insert the company and retrieve the saved company object
        Company newCompany = companyService.insertCompany(company);

        // Create a FormGetCompany object with the user's and company's details
        FormGetCompany formGetCompany = new FormGetCompany(newUser.getId(), newUser.getEmail(), newCompany.getName(), newCompany.getSize(), newCompany.getDescription());

        // Return the populated FormGetCompany object
        return formGetCompany;
    }

    // Inserts a new supervisor by saving the user, setting the supervisor's ID, and saving the supervisor information.
    // Returns a FormGetSupervisor object containing the user's and supervisor's details.
    public FormGetSupervisor insertSupervisor(User user, Supervisor supervisor){
        User newUser = userRepository.save(user);
        supervisor.setId(newUser.getId());
        Supervisor newSupervisor = supervisorService.insertSupervisor(supervisor);
        FormGetSupervisor formGetSupervisor = new FormGetSupervisor(newUser.getId(), newUser.getEmail(), newSupervisor.getFirstName(), newSupervisor.getLastName(), newSupervisor.getFaculty().getName());

        return formGetSupervisor;
    }

    // Updates an existing student by saving the updated user information, updating the student details,
    // and returning a FormGetStudent object with the updated information.
    public FormGetStudent updateStudent(User user, Student student){
        User updatedUser = userRepository.save(user);
        Student updatedStudent = studentService.updateStudent(student);
        FormGetStudent formGetStudent  = new FormGetStudent(updatedUser.getId(), updatedUser.getEmail(), updatedStudent.getFirstName() , updatedStudent.getLastName(), updatedStudent.getPhoneNo(), updatedStudent.getGroup(), updatedStudent.getFaculty().getName());

        return formGetStudent;
    }

    // Updates an existing company by saving the updated user information, updating the company details,
    // and returning a FormGetCompany object with the updated information.
    public FormGetCompany updateCompany (User user, Company company){
        User updatedUser = userRepository.save(user);
        Company updatedCompany = companyService.updateCompany(company);
        FormGetCompany formGetCompany = new FormGetCompany(updatedUser.getId(), updatedUser.getEmail(), updatedCompany.getName(), updatedCompany.getSize(), updatedCompany.getDescription());

        return formGetCompany;
    }

    // Updates an existing supervisor by saving the updated user information, updating the supervisor details,
    // and returning a FormGetSupervisor object with the updated information.
    public FormGetSupervisor updateSupervisor(User user, Supervisor supervisor){
        User updatedUser = userRepository.save(user);
        Supervisor updatedSupervisor = supervisorService.updateSupervisor(supervisor);
        FormGetSupervisor formGetSupervisor =  new FormGetSupervisor(updatedUser.getId(), updatedUser.getEmail(), updatedSupervisor.getFirstName(), updatedSupervisor.getLastName(), updatedSupervisor.getFaculty().getName());

        return formGetSupervisor;
    }
}
