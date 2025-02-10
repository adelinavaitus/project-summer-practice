import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Col, Card, CardBody, CardHeader, CardTitle, Row, Label, CardFooter, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import axios from 'axios';

class ProfileSupervisor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {}, // Store supervisor's data
            faculty: {}, // Store supervisor's faculty data
            isModalFirstNameOpen: false, // Track if the modal for changing first name is open
            isModalLastNameOpen: false // Track if the modal for changing last name is op
        }

        // Bind the methods to toggle modals
        this.toggleModalFirstName = this.toggleModalFirstName.bind(this);
        this.toggleModalLastName = this.toggleModalLastName.bind(this);
    }

    // Toggle modal for first name change
    toggleModalFirstName() {
        this.setState({
            isModalFirstNameOpen: !this.state.isModalFirstNameOpen
        });
    }

    // Toggle modal for last name change
    toggleModalLastName() {
        this.setState({
            isModalLastNameOpen: !this.state.isModalLastNameOpen
        });
    }

    // Handle first name change and update it on the backend
    handleFirstName(values) {
        var fname = values.firstname;
        const url = `http://localhost:8080/supervisors/${this.state.userInfo.id}/firstname`;
        axios.put(url, { fname })
            .then(response => {
                window.location.reload();   // Reload the page to reflect changes
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalFirstName();    // Close the modal after saving
    }

    // Handle last name change and update it on the backend
    handleLastName(values) {
        var lname = values.lastname;
        const url = `http://localhost:8080/supervisors/${this.state.userInfo.id}/lastname`;
        axios.put(url, { lname })
            .then(response => {
                window.location.reload();   // Reload the page to reflect changes
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalLastName(); // Close the modal after saving
    }

    // Fetch the supervisor's information using their ID
    getSupervisorById() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data  // Get the response data
            }).then(result => {
                this.setState({
                    userInfo: result,   // Update user information state
                    faculty: result.faculty  // Update faculty information state
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Get supervisor data when the component is mounted
    componentDidMount() {
        this.getSupervisorById();
    }

    render() {
        // Redirect user to login page if not logged in or not a supervisor
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_SUPERVISOR') {
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
                                <CardTitle tag="h4">Profilul meu</CardTitle>
                            </CardHeader>
                            <CardBody className='text-left' >
                                {/* -------------------------------------first name ---------------------------------- */}
                                <Row className='row-myprofile' onClick={this.toggleModalFirstName}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="fname">Prenume: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.userInfo.firstName}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* -----------------------------------last name --------------------------- */}
                                <Row className='row-myprofile' onClick={this.toggleModalLastName}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="lname">Nume de familie: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.userInfo.lastName}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* -----------------------------------email--------------------------- */}
                                <Row className='row-myprofile-blocked'>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="email">Email: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.props.userLogin.email}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* -----------------------------------faculty--------------------------- */}
                                <Row className='row-myprofile-blocked'>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="email">Facultate: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.faculty.name}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                            </CardBody>
                        </Col>
                    </div>
                </Card>

                {/* Modal for updating the first name */}
                <Modal isOpen={this.state.isModalFirstNameOpen}  >
                    <ModalHeader toggle={this.toggleModalFirstName}>Modificare prenume: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleFirstName(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="firstname">Prenume: </Label>
                                    <Control.text model=".firstname"
                                        id="firstname"
                                        name="firstname"
                                        defaultValue={this.state.userInfo.firstName}
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalFirstName} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* Modal for updating the last name */}
                <Modal isOpen={this.state.isModalLastNameOpen}  >
                    <ModalHeader toggle={this.toggleModalLastName}>Modificare nume familie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleLastName(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="lastname">Nume de familie: </Label>
                                    <Control.text model=".lastname"
                                        id="lastname"
                                        name="lastname"
                                        defaultValue={this.state.userInfo.lastName}
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalLastName} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
            </div>
        );
    }
}

// Map state to props for Redux
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
    const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
    return { loggedIn, userLogin }; 
};

// Connects the component to the Redux store
export default connect(mapStateToProps)(ProfileSupervisor);

