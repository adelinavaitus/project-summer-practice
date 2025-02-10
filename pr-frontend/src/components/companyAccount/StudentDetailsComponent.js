import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { Card, Col, CardBody, CardFooter, Button, CardTitle, CardHeader, Row } from 'reactstrap';


class StudentDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: {},    // Stores student details
            resume: {}, // Stores resume details
            educations: [], // List of educations
            experiences: [],    // List of work experiences
            projects: []    // List of projects
        }
    }

    // Fetches student details and resume by student ID
    getStudentById() {
        // Fetch resume details
        axios.get(`http://localhost:8080/resumes/student/${this.props.match.params.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    resume: result,
                    educations: result.educations,
                    experiences: result.experiences,
                    projects: result.projects
                })
            })
            .catch(err => {
                console.log(err);   // Logs any error encountered
            })

        // Fetch student details
        axios.get(`http://localhost:8080/users/${this.props.match.params.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    student: result,    // Updates student state
                })

            })
            .catch(err => {
                console.log(err);   // Logs any error encountered
            })
    }

    // Fetches data when the component is mounted
    componentDidMount() {
        this.getStudentById();
    }

    render() {
        // Redirects if user is not logged in or is not a company
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_COMPANY') {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>
                <div className='div-button-back'>
                    {/* Back button to navigate to the previous page */}
                    <Button className='back-button' onClick={(() => this.props.history.goBack())}><i class="fa fa-arrow-left" />	&nbsp;Inapoi</Button>
                </div>
                <Card className='text-center principalCard' body outline>
                    <div className="row align-items-start">
                        <Col sm={12} lg={12}>
                            <CardHeader>
                                <CardTitle tag="h4">{this.state.student.firstName} {this.state.student.lastName}</CardTitle>
                            </CardHeader>
                            <CardBody className='text-left' >
                                {/* Contact details */}
                                <Row>
                                    <Col md={4}>
                                        <div className="text-right"><b>Date de contact: </b></div>
                                    </Col>
                                    <Col md={8}>
                                        <a href={`mailto:${this.state.student.email}`}>{this.state.student.email}</a>
                                        <div id="mydescription">{this.state.student.phoneNo}</div>
                                    </Col>
                                </Row>
                                <hr />
                                {/* Resume description */}
                                {
                                    this.state.resume.description === null
                                        ? <div></div>
                                        : <div>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="text-right"><b>Descriere: </b></div>
                                                </Col>
                                                <Col md={8}>
                                                    <div id="mydescription">{this.state.resume.description}</div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                }
                                {/* Technical skills */}
                                {
                                    this.state.resume.techSkills === null
                                        ? <div></div>
                                        : <div>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="text-right"><b>Competente tehnice: </b></div>
                                                </Col>
                                                <Col md={8}>
                                                    <div id="mydescription">{this.state.resume.techSkills}</div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                }
                                {/* Soft skills */}
                                {
                                    this.state.resume.softSkills === null
                                        ? <div></div>
                                        : <div>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="text-right"><b>Aptitudini: </b></div>
                                                </Col>
                                                <Col md={8}>
                                                    <div id="mydescription">{this.state.resume.softSkills}</div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                }
                                {/* Foreign languages */}
                                {
                                    this.state.resume.foreignLanguages === null
                                        ? <div></div>
                                        : <div>
                                            <Row>
                                                <Col md={4}>
                                                    <div className="text-right"><b>Limbi straine: </b></div>
                                                </Col>
                                                <Col md={8}>
                                                    <div id="mydescription">{this.state.resume.foreignLanguages}</div>
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                }
                                {/* Education history */}
                                {
                                    this.state.educations.map(res => (res)).length === 0
                                        ? <div></div>
                                        :
                                        <div>
                                            <Row >
                                                <Col md={4}>
                                                    <div className="text-right"><b>Educatie:  </b></div>
                                                </Col>
                                                <Col md={8}>
                                                    {
                                                        this.state.educations.map(education => (
                                                            <React.Fragment>
                                                                <Row key={education.id}>
                                                                    <Col md={2}>{education.yearStart} - {education.yearStop}</Col>
                                                                    <Col md={10}>
                                                                        <div><b>{education.title}</b></div>
                                                                        <div>Specializarea: {education.specialization}</div>
                                                                    </Col>

                                                                </Row>
                                                                <hr />
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>

                                }
                                {/* Work experience */}
                                {
                                    this.state.experiences.map(res => (res)).length === 0
                                        ? <div></div>
                                        : <div>
                                            <Row >
                                                <Col md={4}>
                                                    <div className="text-right"><b>Experienta:  </b></div>
                                                </Col>
                                                <Col md={8}>
                                                    {
                                                        this.state.experiences.map(experience => (
                                                            <React.Fragment>
                                                                <Row key={experience.id}>
                                                                    <Col md={2}>{experience.yearStart} - {experience.yearStop}</Col>
                                                                    <Col md={10}>
                                                                        <div><b>{experience.companyName}</b></div>
                                                                        <div>Pozitie: {experience.jobTitle}</div>
                                                                        <div>{experience.jobDescription}</div>
                                                                    </Col>
                                                                </Row>
                                                                <hr />
                                                            </React.Fragment>
                                                        ))
                                                    }
                                                </Col>
                                            </Row>
                                            <hr />
                                        </div>
                                }
                                {/* Projects */}
                                {
                                    this.state.projects.map(res => (res)).length === 0
                                        ? <div></div>
                                        : <Row >
                                            <Col md={4}>
                                                <div className="text-right"><b>Proiecte si alte activitati:  </b></div>
                                            </Col>
                                            <Col md={8}>
                                                {
                                                    this.state.projects.map(project => (
                                                        <React.Fragment>
                                                            <Row key={project.id} >
                                                                <Col md={2}>{project.yearP}</Col>
                                                                <Col md={10}>
                                                                    <div><b>{project.title}</b></div>
                                                                    <div>{project.description}</div>
                                                                </Col>
                                                            </Row>
                                                            <hr />
                                                        </React.Fragment>
                                                    ))
                                                }
                                            </Col>
                                        </Row>
                                }

                            </CardBody>
                        </Col>
                    </div>
                </Card>
            </div>
        );
    }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};

// Connect the component to Redux
export default connect(mapStateToProps)(StudentDetails);