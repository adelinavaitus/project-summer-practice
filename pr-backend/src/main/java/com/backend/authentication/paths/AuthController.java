package com.backend.authentication.paths;

import com.backend.authentication.JwtUtils;
import com.backend.authentication.UserDetailImpl;
import com.backend.authentication.request.LoginRequest;
import com.backend.authentication.request.RegisterRequestCompany;
import com.backend.authentication.request.RegisterRequestStudent;
import com.backend.authentication.request.RegisterRequestSupervisor;
import com.backend.authentication.response.JwtResponse;
import com.backend.authentication.response.MessageResponse;
import com.backend.company.Company;
import com.backend.document.Document;
import com.backend.document.DocumentService;
import com.backend.faculty.Faculty;
import com.backend.faculty.FacultyService;
import com.backend.resume.ResumeStudent;
import com.backend.resume.ResumeStudentRepository;
import com.backend.resume.ResumeStudentService;
import com.backend.resume.education.Education;
import com.backend.resume.education.EducationService;
import com.backend.role.Role;
import com.backend.role.RoleName;
import com.backend.role.RoleRepository;
import com.backend.student.Student;
import com.backend.student.StudentRepository;
import com.backend.supervisor.Supervisor;
import com.backend.user.*;
import com.backend.user.Forms.FormGetCompany;
import com.backend.user.Forms.FormGetStudent;
import com.backend.user.Forms.FormGetSupervisor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.authentication.AuthenticationManager;


import javax.print.Doc;
import javax.validation.Valid;

@CrossOrigin(origins ="*",maxAge = 3600)
@RestController
public class AuthController {


    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private FacultyService facultyService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ResumeStudentService resumeStudentService;

    @Autowired
    private EducationService educationService;

    @Autowired
    private DocumentService documentService;
    @PostMapping("/login")

    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest){
        //pasul 1
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        //pasul 2
        SecurityContextHolder.getContext().setAuthentication(authentication);
        //pasul 3
        String jwt = jwtUtils.generateJwtToken(authentication);
        //pasul 4
        UserDetailImpl userDetails = (UserDetailImpl) authentication.getPrincipal();
        //pasul 5
        String roles="";
        for(GrantedAuthority auth:userDetails.getAuthorities()){
            roles = auth.getAuthority();
            break;
        }
        //pasul 6
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), roles));
    }

    @PostMapping("/register-student")
    public ResponseEntity<?> registerUserStudent (@Valid @RequestBody RegisterRequestStudent registerRequestStudent){

        if(userRepository.existsByEmail(registerRequestStudent.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu această adresă de e-mail."));
        } else if(studentRepository.existsStudentByPhoneNo(registerRequestStudent.getPhoneNo())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu acest număr de telefon. "));
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error:Role is not found."));

        Faculty faculty = facultyService.getFacultyById(registerRequestStudent.getFacultyId());


        User user = new User(registerRequestStudent.getEmail(),
               encoder.encode( registerRequestStudent.getPassword()));
        user.setRole(userRole);

        Student student = new Student(registerRequestStudent.getFirstName(), registerRequestStudent.getLastName(), registerRequestStudent.getPhoneNo(), registerRequestStudent.getGroup());
        student.setFaculty(faculty);



        FormGetStudent formGetStudent = userService.insertStudent(user, student);

        ResumeStudent resumeStudent = new ResumeStudent(user);
        resumeStudentService.insertResume(resumeStudent);

        Document document = new Document(user);
        documentService.insertDocument(document);

        return ResponseEntity.ok(new MessageResponse("User student registered successfully"));
    }

    @PostMapping("/register-company")
    public ResponseEntity<?> registerUserCompany (@Valid @RequestBody RegisterRequestCompany registerRequestCompany) {
        if(userRepository.existsByEmail(registerRequestCompany.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu această adresă de e-mail."));
        }

        Role userRole = roleRepository.findByName(RoleName.ROLE_COMPANY)
                .orElseThrow(() -> new RuntimeException("Error:Role is not found."));

        User user = new User(registerRequestCompany.getEmail(),
               encoder.encode(registerRequestCompany.getPassword()));
        user.setRole(userRole);

        Company company = new Company(registerRequestCompany.getName(), registerRequestCompany.getSize(), registerRequestCompany.getDescription());

        FormGetCompany formGetCompany = userService.insertCompany(user, company);
        return ResponseEntity.ok(new MessageResponse("User company registered successfully"));

    }

    @PostMapping("/register-supervisor")
    public ResponseEntity<?> registerSupervisor (@Valid @RequestBody RegisterRequestSupervisor registerRequestSupervisor){
        if(userRepository.existsByEmail(registerRequestSupervisor.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu această adresă de e-mail."));
        }
        Role userRole = roleRepository.findByName(RoleName.ROLE_SUPERVISOR)
                .orElseThrow(() -> new RuntimeException("Error:Role is not found."));


        Faculty faculty = facultyService.getFacultyById(registerRequestSupervisor.getFacultyId());


        User user = new User(registerRequestSupervisor.getEmail(),
                encoder.encode( registerRequestSupervisor.getPassword()));
        user.setRole(userRole);

        Supervisor supervisor = new Supervisor(registerRequestSupervisor.getFirstName(), registerRequestSupervisor.getLastName(), faculty);

        FormGetSupervisor formGetSupervisor = userService.insertSupervisor(user, supervisor);
        return ResponseEntity.ok(new MessageResponse("User supervisor registered successfully!"));
    }


}
