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

    // Inject the AuthenticationManager to handle user authentication
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
        // Step 1: Authenticate the user based on the provided email and password
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // Step 2: Set the authentication context for the current thread
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Step 3: Generate a JWT token for the authenticated user
        String jwt = jwtUtils.generateJwtToken(authentication);

        // Step 4: Retrieve user details (like email and ID) from the authentication object
        UserDetailImpl userDetails = (UserDetailImpl) authentication.getPrincipal();

        // Step 5: Extract the roles assigned to the user, taking the first one
        String roles="";
        for(GrantedAuthority auth:userDetails.getAuthorities()){
            roles = auth.getAuthority();
            break;  // Get the first role
        }

        // Step 6: Return the generated JWT token along with user details (ID, email, role)
        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getEmail(), roles));
    }

    @PostMapping("/register-student")
    public ResponseEntity<?> registerUserStudent (@Valid @RequestBody RegisterRequestStudent registerRequestStudent){

        // Check if email already exists in the user repository
        if(userRepository.existsByEmail(registerRequestStudent.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu această adresă de e-mail."));
        }
        // Check if phone number already exists in the student repository
        else if(studentRepository.existsStudentByPhoneNo(registerRequestStudent.getPhoneNo())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu acest număr de telefon. "));
        }

        // Find the role for the student
        Role userRole = roleRepository.findByName(RoleName.ROLE_STUDENT)
                .orElseThrow(() -> new RuntimeException("Error:Role is not found."));

        // Get faculty details from the service
        Faculty faculty = facultyService.getFacultyById(registerRequestStudent.getFacultyId());

        // Create a new user entity with the provided email and password
        User user = new User(registerRequestStudent.getEmail(),
               encoder.encode( registerRequestStudent.getPassword()));
        user.setRole(userRole);

        // Create a new student entity with the provided details
        Student student = new Student(registerRequestStudent.getFirstName(),
                registerRequestStudent.getLastName(),
                registerRequestStudent.getPhoneNo(),
                registerRequestStudent.getGroup());
        student.setFaculty(faculty);

        // Insert the student and user details into the system
        FormGetStudent formGetStudent = userService.insertStudent(user, student);

        // Create and insert a resume for the student
        ResumeStudent resumeStudent = new ResumeStudent(user);
        resumeStudentService.insertResume(resumeStudent);

        // Create and insert a document for the student
        Document document = new Document(user);
        documentService.insertDocument(document);

        // Return success message after registering the student
        return ResponseEntity.ok(new MessageResponse("User student registered successfully"));
    }

    @PostMapping("/register-company")
    public ResponseEntity<?> registerUserCompany (@Valid @RequestBody RegisterRequestCompany registerRequestCompany) {
        // Check if email already exists in the database
        if(userRepository.existsByEmail(registerRequestCompany.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(
                    new MessageResponse("Există deja un cont cu această adresă de e-mail."));
        }

        // Get the company role from the role repository
        Role userRole = roleRepository.findByName(RoleName.ROLE_COMPANY)
                .orElseThrow(() -> new RuntimeException("Error:Role is not found."));

        // Create a new user with the given email and encrypted password
        User user = new User(registerRequestCompany.getEmail(),
               encoder.encode(registerRequestCompany.getPassword()));
        user.setRole(userRole);

        // Create a new company instance with the given details
        Company company = new Company(registerRequestCompany.getName(), registerRequestCompany.getSize(), registerRequestCompany.getDescription());

        // Save the company and associate it with the user
        FormGetCompany formGetCompany = userService.insertCompany(user, company);

        // Return a success response
        return ResponseEntity.ok(new MessageResponse("User company registered successfully"));
    }

    @PostMapping("/register-supervisor")
    public ResponseEntity<?> registerSupervisor (@Valid @RequestBody RegisterRequestSupervisor registerRequestSupervisor){
        // Check if the email already exists in the database
        if(userRepository.existsByEmail(registerRequestSupervisor.getEmail())){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(new MessageResponse("Există deja un cont cu această adresă de e-mail."));
        }

        // Get the supervisor role from the role repository
        Role userRole = roleRepository.findByName(RoleName.ROLE_SUPERVISOR)
                .orElseThrow(() -> new RuntimeException("Error:Role is not found."));

        // Retrieve the faculty details using the faculty ID
        Faculty faculty = facultyService.getFacultyById(registerRequestSupervisor.getFacultyId());

        // Create a new user with the provided email and password, ensuring the password is encoded
        User user = new User(registerRequestSupervisor.getEmail(),
                encoder.encode( registerRequestSupervisor.getPassword()));
        user.setRole(userRole);

        // Create a new supervisor with the provided details
        Supervisor supervisor = new Supervisor(registerRequestSupervisor.getFirstName(), registerRequestSupervisor.getLastName(), faculty);

        // Save the supervisor and associate it with the user
        FormGetSupervisor formGetSupervisor = userService.insertSupervisor(user, supervisor);

        // Return a success response indicating that the supervisor was registered successfully
        return ResponseEntity.ok(new MessageResponse("User supervisor registered successfully!"));
    }
}
