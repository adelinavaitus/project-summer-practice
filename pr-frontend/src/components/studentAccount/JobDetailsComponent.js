import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, CardTitle, CardBody, Button, CardText, Modal, ModalHeader, Row, Col, CardHeader, Label, CardFooter, ModalBody, ModalFooter } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';


class JobDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {},    // Holds the job details
            company: {},    // Holds the company details
            isModalEditOpen: false,  // Controls the edit modal visibility
            isModalAfterApplicationOpen: false, // Controls the application confirmation modal visibility
            applicationsByStudentId: [],     // Holds applications by student ID
            applicationsJobsByStudentId: [],    // Holds job IDs applied by student
            applybool: false,   // Flag to track if the user has applied
            applicationsByJobId: []     // Holds applications by job ID
        }

        this.toggleEditModal = this.toggleEditModal.bind(this); // Binds the toggle function for edit modal
        this.toggleModalAfterApplication = this.toggleModalAfterApplication.bind(this); // Binds the toggle function for application modal
    }

    // Toggles the visibility of the edit modal
    toggleEditModal() {
        this.setState({
            isModalEditOpen: !this.state.isModalEditOpen
        });
    }

    // Toggles the visibility of the application confirmation modal
    toggleModalAfterApplication() {
        this.setState({
            isModalAfterApplicationOpen: !this.state.isModalAfterApplicationOpen
        });
    }

    // Disables the job posting
    handleDisable() {
        var jobid = this.state.job.id;
        const url = `http://localhost:8080/job-disable`;
        axios.put(url, { jobid })
            .then(response => {
                console.log(response.data)
                window.location.reload();   // Reloads page after job is disabled
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Handles application submission by a student
    handleApplication() {
        const data = {
            id: -1, // Placeholder ID
            jobId: this.state.job.id,
            studentId: this.props.userLogin.id
        }
        const url = `http://localhost:8080/applications`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                this.toggleModalAfterApplication(); // Opens the application confirmation modal
            })
            .catch(err => {
                console.log(err);
            })

    }

    // Enables the job posting
    handleEnable() {
        var jobid = this.state.job.id;
        const url = `http://localhost:8080/job-enable`;
        axios.put(url, { jobid })
            .then(response => {
                console.log(response.data)
                window.location.reload();   // Reloads page after job is enabled
            })
            .catch(err => {
                console.log("http://localhost:3000/myapplications");
            })
    }

    // Closes the application modal and redirects to jobs page
    handleCloseModal() {
        this.toggleModalAfterApplication();
        window.location.assign("http://localhost:3000/jobs");

    }

    // Handles editing of job details
    handleEdit(values) {
        const data = {
            id: this.state.job.id,
            companyId: this.state.company.id,
            jobType: values.jobtype === undefined ? this.state.job.jobType : values.jobtype,    // Keeps current job type if not provided
            description: values.description,
            title: values.title
        }
        const url = `http://localhost:8080/jobs`;
        axios.put(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();   // Reloads page after job details are updated
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleEditModal(); // Closes the edit modal after submission
    }

    // Fetches job details by job ID
    getJobById() {
        axios.get(`http://localhost:8080/jobs/${this.props.match.params.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    job: result,
                    company: result.company // Stores job and company data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Fetches all applications made by the logged-in student
    getAllAplicationByStudentId() {
        axios.get(`http://localhost:8080/applications/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    applicationsByStudentId: result,
                })
                result.map((res) => this.setState(prevState => ({
                    applicationsJobsByStudentId: [...prevState.applicationsJobsByStudentId, res.job.id]
                })))// Stores the job IDs applied by the student
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Fetches all applications for the current job
    getAllAplicationByJobId() {
        axios.get(`http://localhost:8080/applications/jobs/${this.props.match.params.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    applicationsByJobId: result,
                })

            })
            .catch(err => {
                console.log(err);
            })
    }

    // Component lifecycle method to fetch data when the component mounts
    componentDidMount() {
        this.getJobById();

        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            this.getAllAplicationByStudentId(); // Fetches student applications if the user is a student
        }

        if (this.props.userLogin.roles === "ROLE_COMPANY") {
            this.getAllAplicationByJobId(); // Fetches job applications if the user is a company
        }
    }

    // Renders the job details page
    render() {
        // Check if user is logged in and has the required roles and redirect to login page if conditions are not met
        if (!this.props.loggedIn || (this.props.userLogin.roles !== 'ROLE_STUDENT' && this.props.userLogin.roles !== 'ROLE_COMPANY')) {
            return (
                <Redirect to="/login" />
            );
        }


        return (
            <div className='container'>
                <div className='div-button-back'>
                    {/* Button to navigate back to the previous page */}
                    <Button className='back-button' onClick={(() => this.props.history.goBack())}><i class="fa fa-arrow-left" />	&nbsp;Inapoi</Button>
                </div>
                <Card className='card-job-detail'>
                    <CardHeader>
                        <CardTitle tag="h4">{this.state.job.title}</CardTitle>
                        {/* Display company name and job date */}
                        <CardText>{this.state.company.name}
                            <br />{this.state.job.date}</CardText>
                    </CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">Descrierea jobului: </CardTitle>
                        <CardText>{this.state.job.description}</CardText>
                        {
                            this.state.company.description
                                ? <div><CardTitle tag="h5">Descrierea companiei: </CardTitle>
                                    <CardText>{this.state.company.description}</CardText></div>
                                : <div></div>
                        }
                        {/* Display job type and company size */}
                        <CardText><b>Tipul jobului:</b> {this.state.job.jobType}</CardText>
                        <CardText><b>Marimea companiei:</b> {this.state.company.size} angajati</CardText>
                    </CardBody>
                    <CardFooter>
                        <div className='row flex-row-reverse'>
                            {
                                this.props.userLogin.roles === "ROLE_STUDENT"
                                    ? <div>
                                        {/* Button to apply for the job if not already applied */}
                                        {
                                            this.state.applicationsJobsByStudentId.filter((job) => job === this.state.job.id).length === 0
                                                ? <Button className='apply-button' onClick={() => this.handleApplication()} >Aplica</Button>
                                                : <Button className='apply-button' disabled><i class=" fa fa-solid fa-check" />Aplicat</Button>
                                        }
                                    </div>
                                    : this.props.userLogin.roles === "ROLE_COMPANY"
                                        ? <div>
                                            {/* Buttons to disable/enable job or edit job */}
                                            {
                                                this.state.job.available === true
                                                    ? <Button className='disable-button' onClick={() => this.handleDisable()}>Dezactiveaza job</Button>
                                                    : <Button className='enable-button' onClick={() => this.handleEnable()}>Reactiveaza job</Button>
                                            }
                                            <Button className='edit-button' onClick={this.toggleEditModal}>Editeaza</Button>
                                        </div>
                                        : <div> </div>
                            }
                        </div>
                    </CardFooter>
                </Card>

                {
                    // Display applicants table for companies
                    this.props.userLogin.roles === "ROLE_COMPANY"
                        ? <Card className='card-job-detail'>
                            <CardHeader>
                                <CardTitle tag="h4">Aplicanti</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Nume student</th>
                                            <th>Facultate</th>
                                            <th>Data</th>
                                            <th>Actiuni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            // Map through applicants and display their info
                                            this.state.applicationsByJobId.map(res => (
                                                <tr>
                                                    <td>{res.student.firstName} {res.student.lastName}</td>
                                                    <td>{res.student.faculty.name}</td>
                                                    <td>{res.date}</td>
                                                    <td>
                                                        {/* Link to student's profile */}
                                                        <Link to={`/students/${res.student.id}`}>
                                                            <Button className='read-more-btn'>Vezi CV</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        : <div></div>
                }

                {/* Modal for editing job details */}
                <Modal isOpen={this.state.isModalEditOpen} size="lg">

                    <ModalHeader toggle={this.toggleEditModal}>Modificare job: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleEdit(values)}>
                        <ModalBody>
                            <Row className='form-group text-right'>

                                <Label md={2} htmlFor="title">Titlul jobului: </Label>
                                <Col md={10}>
                                    {/* Input field for job title */}
                                    <Control.text model=".title"
                                        id="title"
                                        name="title"
                                        defaultValue={this.state.job.title}
                                        className='form-control'
                                    />
                                </Col>

                            </Row>

                            <Row className='form-group'>
                                <Label md={2} htmlFor="jobtype">Tipul jobului: </Label>
                                <Col md={10}>
                                    {/* Dropdown for job type */}
                                    <Control.select model=".jobtype" id="jobtype" name="jobtype"
                                        className='form-control'
                                    >

                                        <option value="" disabled selected>
                                            {this.state.job.jobType}
                                        </option>
                                        <option>part-time</option>
                                        <option>full-time</option>
                                        <option>internship</option>

                                    </Control.select>
                                </Col>

                            </Row>

                            <Row className='form-group'>
                                <Label md={2} htmlFor="description">Descriere job: </Label>
                                <Col md={10}>
                                    {/* Textarea for job description */}
                                    <Control.textarea model=".description"
                                        id="description"
                                        name="description"
                                        defaultValue={this.state.job.description}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>

                        <ModalFooter>
                            {/* Buttons to cancel or save changes */}
                            <Button onClick={this.toggleEditModal} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* Modal to show application success */}
                <Modal isOpen={this.state.isModalAfterApplicationOpen} >
                    <ModalHeader > </ModalHeader>
                    <ModalBody className='text-center'>Ai aplicat cu succes!</ModalBody>
                    <ModalFooter className="justify-content-center">
                        <Button onClick={() => this.handleCloseModal()} className="btn btn-primary ok-button">OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
    const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
    return { loggedIn, userLogin };
};

// Connects the component to the Redux store
export default connect(mapStateToProps)(JobDetails);
