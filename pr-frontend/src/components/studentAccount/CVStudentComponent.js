import React, { Component } from 'react'
import { Card, Col, CardHeader, Modal, Row, CardTitle, FormGroup, CardBody, Label, CardText, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Control, LocalForm } from 'react-redux-form';

class CVStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            resume: [],
            id: parseInt(''),
            description: '',
            softskills: '',
            techskills: '',
            foreignLanguages: '',
            passions: '',
            educations: [],
            experiences: [],
            projects: [],
            isModalDescriptionOpen: false,
            isModalTechSkillsOpen: false,
            isModalSoftSkillsOpen: false,
            isModalForeignLanguagesOpen: false,
            isModalEducationOpen: false,
            currentEducation: {},
            isModalAddNewEducationOpen: false,
            isModalExperienceOpen: false,
            currentExperience: {},
            isModalAddNewExperienceOpen: false,
            isModalProjectOpen: false,
            currentProject: {},
            isModalAddNewProjectOpen: false,

        }
        this.toggleModalDescription = this.toggleModalDescription.bind(this);
        this.toggleModalTechSkills = this.toggleModalTechSkills.bind(this);
        this.toggleModalSoftSkills = this.toggleModalSoftSkills.bind(this);
        this.toggleModalForeignLanguages = this.toggleModalForeignLanguages.bind(this);
        this.toggleModalEducation = this.toggleModalEducation.bind(this);
        this.toggleModalAddNewEducation = this.toggleModalAddNewEducation.bind(this);
        this.toggleModalExperience = this.toggleModalExperience.bind(this);
        this.toggleModalAddNewExperience = this.toggleModalAddNewExperience.bind(this);
        this.toggleModalProject = this.toggleModalProject.bind(this);
        this.toggleModalAddNewProject = this.toggleModalAddNewProject.bind(this);

    }


    getResumeByStudentId() {
        const url = `http://localhost:8080/resumes/student/${this.props.userLogin.id}`;
        axios.get(url)
            .then(result => {
                return result.data
            }).then(res => {
                this.setState({
                    resume: res,
                    description: res.description,
                    educations: res.educations,
                    experiences: res.experiences,
                    foreignLanguages: res.foreignLanguages,
                    id: res.id,
                    projects: res.projects,
                    softskills: res.softSkills,
                    techskills: res.techSkills
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getResumeByStudentId();
    }

    toggleModalDescription() {
        this.setState({
            isModalDescriptionOpen: !this.state.isModalDescriptionOpen
        });
    }

    toggleModalTechSkills() {
        this.setState({
            isModalTechSkillsOpen: !this.state.isModalTechSkillsOpen
        });
    }

    toggleModalSoftSkills() {
        this.setState({
            isModalSoftSkillsOpen: !this.state.isModalSoftSkillsOpen
        });
    }

    toggleModalForeignLanguages() {
        this.setState({
            isModalForeignLanguagesOpen: !this.state.isModalForeignLanguagesOpen
        });
    }


    toggleModalAddNewEducation() {
        this.setState({
            isModalAddNewEducationOpen: !this.state.isModalAddNewEducationOpen
        });
    }

    toggleModalAddNewExperience() {
        this.setState({
            isModalAddNewExperienceOpen: !this.state.isModalAddNewExperienceOpen
        });
    }

    toggleModalAddNewProject() {
        this.setState({
            isModalAddNewProjectOpen: !this.state.isModalAddNewProjectOpen
        });
    }


    toggleModalEducation(educationid) {
        if (educationid === -1) {
            this.setState({
                isModalEducationOpen: !this.state.isModalEducationOpen,
                currentEducation: ''
            });
        } else {
            const foundEducation = this.state.educations.find(education => education.id === educationid);
            this.setState({
                isModalEducationOpen: !this.state.isModalEducationOpen,
                currentEducation: foundEducation
            });
        }
    }

    toggleModalExperience(experienceid) {
        if (experienceid === -1) {
            this.setState({
                isModalExperienceOpen: !this.state.isModalExperienceOpen,
                currentExperience: ''
            });
        } else {
            const foundExperience = this.state.experiences.find(experience => experience.id === experienceid);
            this.setState({
                isModalExperienceOpen: !this.state.isModalExperienceOpen,
                currentExperience: foundExperience
            });
        }
    }

    toggleModalProject(projectid) {
        if (projectid === -1) {
            this.setState({
                isModalProjectOpen: !this.state.isModalProjectOpen,
                currentProject: ''
            });
        } else {
            const foundProject = this.state.projects.find(project => project.id === projectid);
            this.setState({
                isModalProjectOpen: !this.state.isModalProjectOpen,
                currentProject: foundProject
            });
        }
    }



    handleDescription(values) {
        var description = values.mydescription
        description = description.replace(/(?:\r\n|\r|\n)/g, " ");
        const url = `http://localhost:8080/resumes/${this.state.resume.id}/description`;
        axios.put(url, { description })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalDescription();
    }

    handleTechSkills(values) {
        var techskills = values.techskills
        techskills = techskills.replace(/(?:\r\n|\r|\n)/g, " ");
        const url = `http://localhost:8080/resumes/${this.state.resume.id}/techskills`;
        axios.put(url, { techskills })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalTechSkills();
    }

    handleSoftSkills(values) {
        var softSkills = values.softskills
        softSkills = softSkills.replace(/(?:\r\n|\r|\n)/g, " ");
        const url = `http://localhost:8080/resumes/${this.state.resume.id}/softskills`;
        axios.put(url, { softSkills })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalSoftSkills();
    }

    handleForeignLanguages(values) {
        var foreignLanguages = values.foreignLanguages
        foreignLanguages = foreignLanguages.replace(/(?:\r\n|\r|\n)/g, " ");
        const url = `http://localhost:8080/resumes/${this.state.resume.id}/foreignlanguages`;
        axios.put(url, { foreignLanguages })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalForeignLanguages();
    }

    handleEducation(values) {
        const data = {
            id: this.state.currentEducation.id,
            yearStart: values.yearStart,
            yearStop: values.yearStop,
            title: values.title,
            specialization: values.specialization,
            resume_student_id: this.state.resume.id
        }
        const url = `http://localhost:8080/educations`;
        axios.put(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })

        this.toggleModalEducation(-1);
    }


    handleAddNewEducation(values) {
        const data = {
            id: -1,
            yearStart: values.yearStart,
            yearStop: values.yearStop,
            title: values.title,
            specialization: values.specialization,
            resume_student_id: this.state.resume.id
        }
        const url = `http://localhost:8080/educations`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalAddNewEducation();
    }

    handleExperience(values) {
        const data = {
            id: this.state.currentExperience.id,
            yearStart: values.yearStart,
            yearStop: values.yearStop,
            companyName: values.companyname,
            jobTitle: values.jobposition,
            jobDescription: values.jobdescription,
            resume_student_id: this.state.resume.id
        }
        const url = `http://localhost:8080/experiences`;
        axios.put(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })

        this.toggleModalExperience(-1);
    }

    handleAddNewExperience(values) {
        const data = {
            id: -1,
            yearStart: values.yearStart,
            yearStop: values.yearStop,
            companyName: values.companyname,
            jobTitle: values.jobposition,
            jobDescription: values.jobdescription,
            resume_student_id: this.state.resume.id
        }
        const url = `http://localhost:8080/experiences`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalAddNewExperience();
    }


    handleProject(values) {
        const data = {
            id: this.state.currentProject.id,
            yearP: values.yearP,
            title: values.projectname,
            description: values.projectdescription,
            resume_student_id: this.state.resume.id
        }
        const url = `http://localhost:8080/projects`;
        axios.put(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })

        this.toggleModalProject(-1);
    }

    handleAddNewProject(values) {
        const data = {
            id: -1,
            yearP: values.yearP,
            title: values.projectname,
            description: values.projectdescription,
            resume_student_id: this.state.resume.id
        }
        const url = `http://localhost:8080/projects`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalAddNewProject();
    }

    render() {
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_STUDENT') {
            return (
                <Redirect to="/login" />
            );
        }
        return (

            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <div className="row align-items-start">
                        <Col sm={12} lg={12}>
                            <CardHeader>
                                <CardTitle tag="h4">CV-ul meu</CardTitle>
                            </CardHeader>
                            <CardBody className='text-left' >
                                {/* ------------------------------------description---------------------------- */}
                                <Row className="cv-component" onClick={this.toggleModalDescription}>
                                    <Col md={4}>
                                        <div className="text-right">Descrierea mea: </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.description}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* ------------------------------------techskills---------------------------- */}
                                <Row className="cv-component" onClick={this.toggleModalTechSkills}>
                                    <Col md={4}>
                                        <div className="text-right">Competente tehnice: </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="techskills">{this.state.techskills}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* ------------------------------------softSkills---------------------------- */}
                                <Row className="cv-component" onClick={this.toggleModalSoftSkills}>
                                    <Col md={4}>
                                        <div className="text-right">Aptitudini:  </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="softskills">{this.state.softskills}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* ------------------------------------foreign languages---------------------------- */}
                                <Row className="cv-component" onClick={this.toggleModalForeignLanguages}>
                                    <Col md={4}>
                                        <div className="text-right">Limbi straine:  </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="foreignLanguages">{this.state.foreignLanguages}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* ------------------------------------educations ------------------------------------- */}
                                <Row >
                                    <Col md={4}>
                                        <div className="text-right">Educatie:  </div>
                                    </Col>
                                    <Col md={8}>
                                        {this.state.educations.map(education => (
                                            <React.Fragment>
                                                <Row key={education.id} className="cv-component" onClick={() => this.toggleModalEducation(education.id)}>
                                                    <Col md={2}>{education.yearStart} - {education.yearStop}</Col>
                                                    <Col md={8}>
                                                        <div><b>{education.title}</b></div>
                                                        <div>Specializarea: {education.specialization}</div>
                                                    </Col>
                                                    <Col className="row flex-column-reverse">
                                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </React.Fragment>
                                        ))}
                                        <Row onClick={this.toggleModalAddNewEducation}>
                                            <Button outline color="secondary" className="btn add-education-btn" block>Adauga o noua educatie</Button>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr />
                                {/* ------------------------------------experiences ------------------------------------- */}

                                <Row >
                                    <Col md={4}>
                                        <div className="text-right">Experienta:  </div>
                                    </Col>
                                    <Col md={8}>
                                        {this.state.experiences.map(experience => (
                                            <React.Fragment>
                                                <Row key={experience.id} className="cv-component" onClick={() => this.toggleModalExperience(experience.id)}>
                                                    <Col md={2}>{experience.yearStart} - {experience.yearStop}</Col>
                                                    <Col md={8}>
                                                        <div><b>{experience.companyName}</b></div>
                                                        <div>Pozitie: {experience.jobTitle}</div>
                                                        <div>{experience.jobDescription}</div>
                                                    </Col>
                                                    <Col className="row flex-column-reverse">
                                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </React.Fragment>
                                        ))}
                                        <Row onClick={this.toggleModalAddNewExperience}>
                                            <Button outline color="secondary" className="btn add-experience-btn" block>Adauga o noua experienta</Button>
                                        </Row>
                                    </Col>
                                </Row>
                                <hr />
                                {/* ------------------------------------projects ------------------------------------- */}
                                <Row >
                                    <Col md={4}>
                                        <div className="text-right">Proiecte si alte activitati:  </div>
                                    </Col>
                                    <Col md={8}>
                                        {this.state.projects.map(project => (
                                            <React.Fragment>
                                                <Row key={project.id} className="cv-component" onClick={() => this.toggleModalProject(project.id)}>
                                                    <Col md={2}>{project.yearP}</Col>
                                                    <Col md={8}>
                                                        <div><b>{project.title}</b></div>
                                                        <div>{project.description}</div>
                                                    </Col>
                                                    <Col className="row flex-column-reverse">
                                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                                    </Col>
                                                </Row>
                                                <hr />
                                            </React.Fragment>
                                        ))}
                                        <Row onClick={this.toggleModalAddNewProject}>
                                            <Button outline color="secondary" className="btn add-experience-btn" block>Adauga un nou proiect</Button>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Col>
                    </div>
                </Card>

                {/* ----------------------------------------modal for description ----------------------- */}
                <Modal isOpen={this.state.isModalDescriptionOpen}  >
                    <ModalHeader toggle={this.toggleModalDescription}>Modificare descrierea mea: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleDescription(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="mydescription">Descrierea mea</Label>
                                    <Control.textarea model=".mydescription"
                                        id="mydescription"
                                        name="mydescription"
                                        defaultValue={this.state.description}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalDescription} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* ----------------------------------------modal for tech skills ----------------------- */}
                <Modal isOpen={this.state.isModalTechSkillsOpen}  >
                    <ModalHeader toggle={this.toggleModalTechSkills}>Modificare competentele mele: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleTechSkills(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="techskills">Competente tehnice: </Label>
                                    <Control.textarea model=".techskills"
                                        id="techskills"
                                        name="techskills"
                                        defaultValue={this.state.techskills}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalTechSkills} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
                {/* ----------------------------------------modal for soft skills ----------------------- */}
                <Modal isOpen={this.state.isModalSoftSkillsOpen}  >
                    <ModalHeader toggle={this.toggleModalSoftSkills}>Modificare aptitudinile mele: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSoftSkills(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="softskills">Aptitudini: </Label>
                                    <Control.textarea model=".softskills"
                                        id="softskills"
                                        name="softskills"
                                        defaultValue={this.state.softskills}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalSoftSkills} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
                {/* ----------------------------------------modal for foreign languages ----------------------- */}
                <Modal isOpen={this.state.isModalForeignLanguagesOpen}  >
                    <ModalHeader toggle={this.toggleModalForeignLanguages}>Modificare limbile straine: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleForeignLanguages(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="foreignLanguages">Limbi straine: </Label>
                                    <Control.textarea model=".foreignLanguages"
                                        id="foreignLanguages"
                                        name="foreignLanguages"
                                        defaultValue={this.state.foreignLanguages}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalForeignLanguages} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* ----------------------------------------modal for existing education-------------- ----------------------- */}
                <Modal isOpen={this.state.isModalEducationOpen}  >
                    <ModalHeader toggle={() => this.toggleModalEducation(this.state.currentEducation.id)}>Modificare educatie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleEducation(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStart">An inceput: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStart" id="yearStart" name="yearStart"
                                        className='form-control'
                                        defaultValue={this.state.currentEducation.yearStart}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStop">An absolvire: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStop" id="yearStop" name="yearStop"
                                        className='form-control'
                                        defaultValue={this.state.currentEducation.yearStop}
                                    />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="title">Institutie : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".title" id="title" name="title"
                                        className='form-control'
                                        defaultValue={this.state.currentEducation.title}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="specialization">Specializare : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".specialization" id="specialization" name="specialization"
                                        className='form-control'
                                        defaultValue={this.state.currentEducation.specialization}
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => this.toggleModalEducation(-1)} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
                {/* ------------------------------------------modal for new education --------------------------------------------------------- */}
                <Modal isOpen={this.state.isModalAddNewEducationOpen}  >
                    <ModalHeader toggle={this.toggleModalAddNewEducation}>Adaugare educatie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleAddNewEducation(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStart">An inceput: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStart" id="yearStart" name="yearStart"
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStop">An absolvire: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStop" id="yearStop" name="yearStop"
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="title">Institutie : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".title" id="title" name="title"
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="specialization">Specializare : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".specialization" id="specialization" name="specialization"
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalAddNewEducation} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* ----------------------------------------modal for existing experience-------------- ----------------------- */}
                <Modal isOpen={this.state.isModalExperienceOpen}  >
                    <ModalHeader toggle={() => this.toggleModalExperience(this.state.currentExperience.id)}>Modificare experienta: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleExperience(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStart">Perioada inceput: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStart" id="yearStart" name="yearStart"
                                        className='form-control'
                                        defaultValue={this.state.currentExperience.yearStart}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStop">Perioada sfarsit: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStop" id="yearStop" name="yearStop"
                                        className='form-control'
                                        defaultValue={this.state.currentExperience.yearStop}
                                    />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="companyname">Numele companiei : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".companyname" id="companyname" name="companyname"
                                        className='form-control'
                                        defaultValue={this.state.currentExperience.companyName}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="jobposition">Pozitie : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".jobposition" id="jobposition" name="jobposition"
                                        className='form-control'
                                        defaultValue={this.state.currentExperience.jobTitle}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row >
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="jobdescription">Descriere : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".jobdescription"
                                        id="jobdescription"
                                        name="jobdescription"
                                        defaultValue={this.state.currentExperience.jobDescription}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => this.toggleModalExperience(-1)} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>


                {/* ----------------------------------------modal for new experience-------------- ----------------------- */}
                <Modal isOpen={this.state.isModalAddNewExperienceOpen}  >
                    <ModalHeader toggle={this.toggleModalAddNewExperience}>Adauga o noua experienta: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleAddNewExperience(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStart">Perioada inceput: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStart" id="yearStart" name="yearStart"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearStop">Perioada sfarsit: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearStop" id="yearStop" name="yearStop"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="companyname">Numele companiei : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".companyname" id="companyname" name="companyname"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="jobposition">Pozitie : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".jobposition" id="jobposition" name="jobposition"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <hr />
                            <Row >
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="jobdescription">Descriere : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".jobdescription"
                                        id="jobdescription"
                                        name="jobdescription"
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalAddNewExperience} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>


                {/* ----------------------------------------modal for existing projects-------------- ----------------------- */}
                <Modal isOpen={this.state.isModalProjectOpen}  >
                    <ModalHeader toggle={() => this.toggleModalProject(this.state.currentProject.id)}>Modificare proiect: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleProject(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearP">An :</Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearP" id="yearP" name="yearP"
                                        className='form-control'
                                        defaultValue={this.state.currentProject.yearP}
                                    />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="projectname">Nume proiect: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".projectname" id="projectname" name="projectname"
                                        className='form-control'
                                        defaultValue={this.state.currentProject.title}
                                    />
                                </Col>
                            </Row>
                            <hr />
                            <Row >
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="projectdescription">Descriere : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".projectdescription"
                                        id="projectdescription"
                                        name="projectdescription"
                                        defaultValue={this.state.currentProject.description}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => this.toggleModalProject(-1)} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>


                {/* ----------------------------------------modal for new projects-------------- ----------------------- */}
                <Modal isOpen={this.state.isModalAddNewProjectOpen}  >
                    <ModalHeader toggle={this.toggleModalAddNewProject}>Adaugare proiect nou: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleAddNewProject(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="yearP">An :</Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".yearP" id="yearP" name="yearP"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <hr />

                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="projectname">Nume proiect: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.text model=".projectname" id="projectname" name="projectname"
                                        className='form-control' />
                                </Col>
                            </Row>
                            <hr />
                            <Row >
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="projectdescription">Descriere : </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".projectdescription"
                                        id="projectdescription"
                                        name="projectdescription"
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalAddNewProject} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};


export default connect(mapStateToProps)(CVStudent);

