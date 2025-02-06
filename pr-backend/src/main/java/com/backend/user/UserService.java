package com.backend.user;


import com.backend.company.Company;
import com.backend.company.CompanyService;
import com.backend.document.Document;
import com.backend.document.DocumentService;
import com.backend.role.RoleName;
import com.backend.student.Student;

import com.backend.student.StudentService;
import com.backend.supervisor.FormGetSupervisors;
import com.backend.supervisor.Supervisor;
import com.backend.supervisor.SupervisorService;
import com.backend.user.Forms.FormGetCompany;
import com.backend.user.Forms.FormGetStudent;
import com.backend.user.Forms.FormGetSupervisor;
import net.bytebuddy.implementation.bind.annotation.Super;
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

    //pentru a se returna toti userii studentii trebuie sa fie logat ca si admin
    //-> primit id-ul userului logat, il cautam si dupa verificam ce fel de role are

    // iau toata lista de useri  si toata lista de studenti
    // trec prin fiecare user si caut corespondentul lui dupa email sau id si dupa pun ifno in formgetstudent

    //daca nu este admin  si este student returneaza info doar despre utilizatorul logat
    //daca este companie se returneaza un array gol
    public List<FormGetStudent> getAllStudents(int id){
        User authedUser = userRepository.getById(id);

        if (authedUser.getRole().getName() == RoleName.ROLE_ADMIN) {
            List<User>  userList = userRepository.findAll();
            List<Student> studentList = studentService.getAllStudents();
            List<FormGetStudent> formGetStudents = new ArrayList<>();
            for(User user: userList){
                for(Student student : studentList){
                    if(user.getId() == student.getId()){
                        FormGetStudent formGetStudent = new FormGetStudent(user.getId(), user.getEmail(), student.getFirstName(), student.getLastName(),  student.getPhoneNo(), student.getGroup(), student.getFaculty().getName());
                        formGetStudents.add(formGetStudent);
                    }
                }
            }
            return formGetStudents;
        } else if((authedUser.getRole().getName() == RoleName.ROLE_STUDENT)) {
            Student student = studentService.getStudentById(authedUser.getId());
            List<FormGetStudent> formGetStudents = new ArrayList<>();
            FormGetStudent formGetStudent = new FormGetStudent(authedUser.getId(), authedUser.getEmail(), student.getFirstName(), student.getLastName(), student.getPhoneNo(), student.getGroup(), student.getFaculty().getName());
            formGetStudents.add(formGetStudent);
            return formGetStudents;
        }
         else {
             List<FormGetStudent> formGetStudents = new ArrayList<>();
             return formGetStudents;
        }
    }


    // la fel ca mai sus doar ca pentru companie
    public List<FormGetCompany> getAllCompanies(int id){
        User authedUser = userRepository.getById(id);
        if (authedUser.getRole().getName() == RoleName.ROLE_ADMIN) {
            List<User> userList = userRepository.findAll();
            List<Company> companyList = companyService.getAllCompanies();
            List<FormGetCompany> formGetCompanies = new ArrayList<>();
            for( User user : userList){
                for(Company company : companyList){
                    if( user.getId() == company.getId()){
                        FormGetCompany formGetCompany = new FormGetCompany(user.getId(), user.getEmail(), company.getName(), company.getSize(), company.getDescription());
                        formGetCompanies.add(formGetCompany);
                    }
                }
            }
            return formGetCompanies;
        } else if ((authedUser.getRole().getName() == RoleName.ROLE_COMPANY)){
            Company company = companyService.getCompanyById(authedUser.getId());
            List<FormGetCompany> formGetCompanies = new ArrayList<>();
            FormGetCompany formGetCompany = new FormGetCompany(authedUser.getId(), authedUser.email, company.getName(), company.getSize(), company.getDescription());
            formGetCompanies.add(formGetCompany);
            return formGetCompanies;
        } else {
            List<FormGetCompany> formGetCompanies = new ArrayList<>();
            return formGetCompanies;
        }
    }


    public FormGetStudent getUserById(int id){
        User user = userRepository.findById(id).get();
        Student student = studentService.getStudentById(id);
        FormGetStudent formGetStudent = new FormGetStudent();
        formGetStudent.setId(id);
        formGetStudent.setEmail(user.getEmail());
        formGetStudent.setFirstName(student.getFirstName());
        formGetStudent.setLastName(student.getLastName());
        formGetStudent.setPhoneNo(student.getPhoneNo());
        formGetStudent.setGroup(student.getGroup());
        formGetStudent.setFacultyName(student.getFaculty().getName());
        return formGetStudent;
    }

    public User getUserById2(int id){
        return userRepository.findById(id).get();
    }


    //pentru a adauga un student sau o companie - se transmite un formgetstudent sau formgetcompany
    public FormGetStudent insertStudent(User user, Student student){
        User newUser = userRepository.save(user);
        student.setId(newUser.getId());
        Student newStudent = studentService.insertStudent(student);



        FormGetStudent formGetStudent  = new FormGetStudent(newUser.getId(), newUser.getEmail(), newStudent.getFirstName() , newStudent.getLastName(),  newStudent.getPhoneNo(), newStudent.getGroup(), newStudent.getFaculty().getName());
        return formGetStudent;
    }

    public FormGetCompany insertCompany (User user, Company company){
        User newUser = userRepository.save(user);
        company.setId(newUser.getId());
        Company newCompany = companyService.insertCompany(company);
        FormGetCompany formGetCompany = new FormGetCompany(newUser.getId(), newUser.getEmail(), newCompany.getName(), newCompany.getSize(), newCompany.getDescription());
        return formGetCompany;
    }

    public FormGetSupervisor insertSupervisor(User user, Supervisor supervisor){
        User newUser = userRepository.save(user);
        supervisor.setId(newUser.getId());
        Supervisor newSupervisor = supervisorService.insertSupervisor(supervisor);
        FormGetSupervisor formGetSupervisor = new FormGetSupervisor(newUser.getId(), newUser.getEmail(), newSupervisor.getFirstName(), newSupervisor.getLastName(), newSupervisor.getFaculty().getName());
        return formGetSupervisor;
    }

    public FormGetStudent updateStudent(User user, Student student){
        User updatedUser = userRepository.save(user);
        Student updatedStudent = studentService.updateStudent(student);
        FormGetStudent formGetStudent  = new FormGetStudent(updatedUser.getId(), updatedUser.getEmail(), updatedStudent.getFirstName() , updatedStudent.getLastName(), updatedStudent.getPhoneNo(), updatedStudent.getGroup(), updatedStudent.getFaculty().getName());
        return formGetStudent;
    }

    public FormGetCompany updateCompany (User user, Company company){
        User updatedUser = userRepository.save(user);
        Company updatedCompany = companyService.updateCompany(company);
        FormGetCompany formGetCompany = new FormGetCompany(updatedUser.getId(), updatedUser.getEmail(), updatedCompany.getName(), updatedCompany.getSize(), updatedCompany.getDescription());
        return formGetCompany;
    }

    public FormGetSupervisor updateSupervisor(User user, Supervisor supervisor){
        User updatedUser = userRepository.save(user);
        Supervisor updatedSupervisor = supervisorService.updateSupervisor(supervisor);
        FormGetSupervisor formGetSupervisor =  new FormGetSupervisor(updatedUser.getId(), updatedUser.getEmail(), updatedSupervisor.getFirstName(), updatedSupervisor.getLastName(), updatedSupervisor.getFaculty().getName());
        return formGetSupervisor;
    }

}
