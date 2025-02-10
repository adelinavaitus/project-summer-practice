import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Col, ModalBody, ModalHeader, ModalFooter, Label, Row, CardTitle, Modal, Button } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';

class Info extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},   // Stores the logged-in user's details
            faculty: {},     // Stores the faculty information
            isModalOpen: false,     // Controls the modal visibility for editing information
            isModalAddNewInfoOpen: false    // Controls the modal visibility for adding new information
        }

        this.toggleModal = this.toggleModal.bind(this); // Binds the toggleModal function to this component
        this.toggleModalAddNewInfo = this.toggleModalAddNewInfo.bind(this); // Binds the toggleModalAddNewInfo function
    }

    // Toggles the modal for editing existing information
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    // Toggles the modal for adding new information
    toggleModalAddNewInfo() {
        this.setState({
            isModalAddNewInfoOpen: !this.state.isModalAddNewInfoOpen
        });
    }

    // Handles the submission of edited information
    handleSubmit(values) {
        var description = values.info;        // Retrieves the updated description
        description = description.replace(/(?:\r\n|\r|\n)/g, " ");  // Removes line breaks
        const url = `http://localhost:8080/faculties/${this.state.faculty.id}/description`; // API endpoint for updating description
        axios.put(url, { description })
            .then(response => {
                window.location.reload();   // Refreshes the page
            })
            .catch(err => {
                console.log(err);   // Logs any error encountered
            })
        this.toggleModal(); // Closes the modal
    }

    // Handles the submission of new information
    handleSubmitNewInfo(values) {
        var description = values.info;   // Retrieves the new description
        description = description.replace(/(?:\r\n|\r|\n)/g, " ");   // Removes line breaks
        const url = `http://localhost:8080/faculties/${this.state.faculty.id}/description`; // API endpoint for adding new information
        axios.put(url, { description })
            .then(response => {
                window.location.reload();   // Refreshes the page
            })
            .catch(err => {
                console.log(err);   // Logs any error encountered
            })
        this.toggleModalAddNewInfo();   // Closes the modal
    }

    // Fetches student details if logged in as a student
    getStudentLoggedIn() {
        axios.get(`http://localhost:8080/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    user: result,   // Updates user details
                    faculty: result.faculty // Updates faculty information
                })
            })
            .catch(err => {
                console.log(err);   // Logs any error encountered
            })
    }

    // Fetches supervisor details if logged in as a supervisor
    getSupervisorLoggedIn() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    user: result,   // Updates user details
                    faculty: result.faculty // Updates faculty information
                })
            })
            .catch(err => {
                console.log(err);   // Logs any error encountered
            })
    }

    // Lifecycle method to fetch details based on user role after the component mounts
    componentDidMount() {
        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            this.getStudentLoggedIn();  // Fetches student details
        } else if (this.props.userLogin.roles === "ROLE_SUPERVISOR") {
            this.getSupervisorLoggedIn();   // Fetches supervisor details
        }
    }

    render() {
        // Redirects to login if not logged in or user role is invalid
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_STUDENT' && this.props.userLogin.roles !== 'ROLE_SUPERVISOR') {
            return (
                <Redirect to="/login" />
            );
        }

        // Renders the information page
        return (
            <div className='container'>
                {
                    this.props.userLogin.roles === 'ROLE_STUDENT'
                        ? <div>
                            {/* Card for students */}
                            <Card className='text-center principalCard' body outline>
                                <CardHeader>
                                    <CardTitle tag="h4">Informatii stagiu de practica</CardTitle>
                                </CardHeader>
                                <CardBody className='text-left'>

                                    {
                                        this.state.faculty.description === null || this.state.faculty.description === ''
                                            ? <div className='text-center'>Nu sunt disponibile informatii. Reveniti mai tarziu.</div>
                                            : <div>
                                                {this.state.faculty.description}{/* Displays faculty description */}
                                            </div>
                                    }
                                </CardBody>
                            </Card>
                        </div>
                        : this.props.userLogin.roles === 'ROLE_SUPERVISOR'
                            ? <div>
                                {/* Card for supervisors */}
                                <Card className='text-center principalCard' body outline>
                                    <CardHeader>
                                        <CardTitle tag="h4">Informatii stagiu de practica</CardTitle>
                                    </CardHeader>
                                    {
                                        this.state.faculty.description === null || this.state.faculty.description === ""
                                            ? <div className='add-info-div'>
                                                {/* Button to add new information if none exists */}
                                                <Row onClick={this.toggleModalAddNewInfo}>
                                                    <Button outline color="secondary" className="btn add-info-btn" block>Adauga informatii despre perioada de practica.</Button>
                                                </Row>
                                            </div>
                                            : <div>
                                                <CardBody className='text-left'>
                                                    <Row className="cv-component" onClick={this.toggleModal}>
                                                        <Col md={11}>
                                                            <div id="mydescription">{this.state.faculty.description}</div>  {/* Displays faculty description */}
                                                        </Col>
                                                        <Col className="row flex-column-reverse">
                                                            <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>     {/* Edit icon */}
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </div>
                                    }
                                </Card>
                            </div>
                            : <div></div>   // Handles unexpected roles
                }
                {/* Modal for editing information */}
                <Modal isOpen={this.state.isModalOpen}  >
                    <ModalHeader toggle={this.toggleModal}>Modificare descrierea mea: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Control.textarea model=".info"
                                        id="info"
                                        name="info"
                                        defaultValue={this.state.faculty.description}   // Pre-fills current description
                                        rows="12" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModal} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
                {/* Modal for adding new information */}
                <Modal size="lg" isOpen={this.state.isModalAddNewInfoOpen}  >
                    <ModalHeader toggle={this.toggleModalAddNewInfo}>Adaugare educatie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSubmitNewInfo(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="info">Informatii despre perioada de practica: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".info"
                                        id="info"
                                        name="info"
                                        rows="12" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalAddNewInfo} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
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
export default connect(mapStateToProps)(Info);
