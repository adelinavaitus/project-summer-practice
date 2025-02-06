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

    public List<Student> getStudentsByFacultyId(int facultyId){
        List<Student> students = studentRepository.findByFacultyId(facultyId);
        return students;
    }

    public List<Student> getAllStudents(){
        List<Student> students = studentRepository.findAll();
        return students;
    }
    public Student getStudentById(int id){
        Student student = studentRepository.findById(id).get();
        return  student;
    }

    public Student insertStudent(Student student){
        return  studentRepository.save(student);
    }

    public Student updateStudent (Student student){
        return studentRepository.save(student);
    }

    public Student updateFirstNameByStudentId(int id, String firstName){
        Student student = getStudentById(id);
        student.setFirstName(firstName);
        return studentRepository.save(student);
    }

    public Student updateLastNameByStudentId(int id, String lastName){
        Student student = getStudentById(id);
        student.setLastName(lastName);
        return studentRepository.save(student);
    }

    public Student updateGroupByStudentId(int id, String group){
        Student student = getStudentById(id);
        student.setGroup(group);
        return studentRepository.save(student);
    }

    public Student updateFacultyByStudentId(int id, String facultyId){
        int fid = Integer.valueOf(facultyId);
        Faculty faculty = facultyService.getFacultyById(fid);
        Student student = getStudentById(id);
        student.setFaculty(faculty);
        return studentRepository.save(student);
    }


    public Student deleteStudent(Student student){
        Student oldStudent = student;
        studentRepository.delete(student);
        return oldStudent;
    }


    public boolean isPhoneNoAlreadyIsUse(String phoneNo){
        Boolean response = studentRepository.existsStudentByPhoneNo(phoneNo);
        return response;
    }
}
