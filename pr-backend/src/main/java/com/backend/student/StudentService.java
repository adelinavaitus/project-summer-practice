package com.backend.student;

import com.backend.faculty.Faculty;
import com.backend.faculty.FacultyRepository;
import com.backend.faculty.FacultyService;
import com.backend.user.Forms.FormGetStudent;
import com.backend.user.User;
import com.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private UserRepository userRepository;

    // Retrieves all students and maps them into a list of FormGetStudent objects
    public List<FormGetStudent> getAllFormGetStudents(){
        List<FormGetStudent> formGetStudents = new ArrayList<>();
        List<Student>  students = studentRepository.findAll();
        for (Student student: students){
            User user = userRepository.getById(student.getId());
            FormGetStudent formGetStudent = new FormGetStudent();
            formGetStudent.setId(student.getId());
            formGetStudent.setEmail(user.getEmail());
            formGetStudent.setFirstName(student.getFirstName());
            formGetStudent.setLastName(student.getLastName());
            formGetStudent.setPhoneNo(student.getPhoneNo());
            formGetStudent.setGroup(student.getGroup());
            formGetStudent.setFacultyName(student.getFaculty().getName());
            formGetStudents.add(formGetStudent);
        }
        return formGetStudents;
    }

    // Retrieves all students by faculty ID and maps them into a list of FormGetStudent objects
    public List<FormGetStudent> getAllFormGetStudentsByFacultyId(int facultyId){
        List<FormGetStudent> formGetStudents = new ArrayList<>();
        List<Student>  students = studentRepository.findByFacultyId(facultyId);
        for (Student student: students){
            User user = userRepository.getById(student.getId());
            FormGetStudent formGetStudent = new FormGetStudent();
            formGetStudent.setId(student.getId());
            formGetStudent.setEmail(user.getEmail());
            formGetStudent.setFirstName(student.getFirstName());
            formGetStudent.setLastName(student.getLastName());
            formGetStudent.setPhoneNo(student.getPhoneNo());
            formGetStudent.setGroup(student.getGroup());
            formGetStudent.setFacultyName(student.getFaculty().getName());
            formGetStudents.add(formGetStudent);
        }
        return formGetStudents;
    }

    // Retrieves students by faculty ID
    public List<Student> getStudentsByFacultyId(int facultyId){
        List<Student> students = studentRepository.findByFacultyId(facultyId);
        return students;
    }

    // Retrieves all students from the repository
    public List<Student> getAllStudents(){
        List<Student> students = studentRepository.findAll();
        return students;
    }

    // Retrieves a student by their ID
    public Student getStudentById(int id){
        Student student = studentRepository.findById(id).get();
        return  student;
    }

    // Inserts a new student into the repository
    public Student insertStudent(Student student){
        return  studentRepository.save(student);
    }

    // Updates the details of an existing student
    public Student updateStudent (Student student){
        return studentRepository.save(student);
    }

    // Updates the first name of a student based on their ID
    public Student updateFirstNameByStudentId(int id, String firstName){
        Student student = getStudentById(id);
        student.setFirstName(firstName);
        return studentRepository.save(student);
    }

    // Updates the last name of a student based on their ID
    public Student updateLastNameByStudentId(int id, String lastName){
        Student student = getStudentById(id);
        student.setLastName(lastName);
        return studentRepository.save(student);
    }

    // Updates the group of a student based on their ID
    public Student updateGroupByStudentId(int id, String group){
        Student student = getStudentById(id);
        student.setGroup(group);
        return studentRepository.save(student);
    }

    // Updates the faculty of a student based on their ID
    public Student updateFacultyByStudentId(int id, String facultyId){
        int fid = Integer.valueOf(facultyId);
        Faculty faculty = facultyService.getFacultyById(fid);
        Student student = getStudentById(id);
        student.setFaculty(faculty);
        return studentRepository.save(student);
    }

    // Deletes a student from the repository
    public Student deleteStudent(Student student){
        Student oldStudent = student;
        studentRepository.delete(student);
        return oldStudent;
    }

    // Checks if a phone number is already in use by a student
    public boolean isPhoneNoAlreadyIsUse(String phoneNo){
        Boolean response = studentRepository.existsStudentByPhoneNo(phoneNo);
        return response;
    }
}
