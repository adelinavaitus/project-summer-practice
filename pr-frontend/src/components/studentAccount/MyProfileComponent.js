import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Col, Card, CardBody, CardHeader, CardTitle, Row, Label, CardFooter, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import { fetchFaculties } from '../../redux/ActionCreators';
import axios from 'axios';


class MyProfile extends Component {
    constructor(props) {
        super(props);

        // Initializing state for student details, faculty, and modal visibility
        this.state = {
            student: {},    // Stores student data
            facultate: {},  // Stores faculty data
            isModalFirstNameOpen: false,    // Controls visibility of the first name modal
            isModalLastNameOpen: false,  // Controls visibility of the last name modal
            isModalFacultyOpen: false,  // Controls visibility of the faculty modal
            isModalGroupOpen: false,    // Controls visibility of the group modal
        }

        // Binding methods to handle modal toggling
        this.toggleModalFirstName = this.toggleModalFirstName.bind(this);
        this.toggleModalFaculty = this.toggleModalFaculty.bind(this);
        this.toggleModalGroup = this.toggleModalGroup.bind(this);
        this.toggleModalLastName = this.toggleModalLastName.bind(this);
    }

    // Toggles the visibility of the first name update modal
    toggleModalFirstName() {
        this.setState({
            isModalFirstNameOpen: !this.state.isModalFirstNameOpen
        });
    }

    // Toggles the visibility of the last name update modal
    toggleModalLastName() {
        this.setState({
            isModalLastNameOpen: !this.state.isModalLastNameOpen
        });
    }

    // Toggles the visibility of the faculty update modal
    toggleModalFaculty() {
        this.setState({
            isModalFacultyOpen: !this.state.isModalFacultyOpen
        });
    }

    // Toggles the visibility of the group update modal
    toggleModalGroup() {
        this.setState({
            isModalGroupOpen: !this.state.isModalGroupOpen
        });
    }

    // Handles updating the student's first name
    handleFirstName(values) {
        var fname = values.firstname;   // Extracting first name from form values
        const url = `http://localhost:8080/students/${this.state.student.id}/firstname`;    // API endpoint to update first name
        axios.put(url, { fname })
            .then(response => {
                console.log(response.data)  // Logging the response data
                window.location.reload();    // Reloading the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Logging any errors that occur
            })
        this.toggleModalFirstName();    // Closing the modal after submission
    }

    // Handles updating the student's last name
    handleLastName(values) {
        var lname = values.lastname;    // Extracting last name from form values
        const url = `http://localhost:8080/students/${this.state.student.id}/lastname`;  // API endpoint to update last name
        axios.put(url, { lname })
            .then(response => {
                console.log(response.data)  // Logging the response data
                window.location.reload();   // Reloading the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Logging any errors that occur
            })
        this.toggleModalLastName(); // Closing the modal after submission
    }

    // Handles updating the student's group
    handleGroup(values) {
        var group = values.group;   // Extracting group value from form
        const url = `http://localhost:8080/students/${this.state.student.id}/group`;    // API endpoint to update group
        axios.put(url, { group })
            .then(response => {
                console.log(response.data)  // Logging the response data
                window.location.reload(); // Reloading the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Logging any errors that occur
            })
        this.toggleModalGroup();    // Closing the modal after submission
    }

    // Handles updating the student's faculty
    handleFaculty(values) {
        var facultyId = values.faculty;  // Extracting faculty ID from form
        const url = `http://localhost:8080/students/${this.state.student.id}/faculty`;  // API endpoint to update faculty
        axios.put(url, { facultyId })
            .then(response => {
                console.log(response.data)  // Logging the response data
                window.location.reload();   // Reloading the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Logging any errors that occur
            })
        this.toggleModalFaculty();  // Closing the modal after submission
    }

    // Fetches the student details by ID from the backend API
    getStudentById() {
        const url = `http://localhost:8080/students/${this.props.userLogin.id}`;    // API endpoint to fetch student data by ID
        axios.get(url)
        axios.get(url)
            .then(result => {
                return result.data  // Returning the data from the response
            }).then(res => {
                // Setting the state with the fetched student and faculty data
                this.setState({
                    student: res,
                    facultate: res.faculty
                })
            })
            .catch(err => {
                console.log(err);   // Logging any errors that occur
            })
    }

    // Called when the component mounts to fetch student and faculty data
    componentDidMount() {
        this.props.fetchFaculties();    // Fetching faculties using Redux action
        this.getStudentById();  // Fetching student details by ID
    }

    render() {
        // Check if the user is logged in and has the 'ROLE_STUDENT' role; if not, redirect to login
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_STUDENT') {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className='container'>
                {/* Main profile card */}
                <Card className='text-center principalCard' body outline>
                    <div className="row align-items-start">
                        <Col sm={12} lg={12}>
                            {/* Card Header with the profile title */}
                            <CardHeader>
                                <CardTitle tag="h4">Profilul meu</CardTitle>
                            </CardHeader>

                            {/* Card Body where the profile information is displayed */}
                            <CardBody className='text-left' >
                                {/* ----------- First Name Section ------------ */}
                                <Row className='row-myprofile' onClick={this.toggleModalFirstName}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="fname">Prenume: </Label>     {/* Label for First Name */}
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.student.firstName}</div>    {/* Displaying the First Name */}
                                    </Col>
                                    {/* Edit Icon for First Name */}
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />

                                {/* ----------- Last Name Section ------------ */}
                                <Row className='row-myprofile' onClick={this.toggleModalLastName}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="lname">Nume de familie: </Label>     {/* Label for Last Name */}
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.student.lastName}</div> {/* Displaying the Last Name */}
                                    </Col>
                                    {/* Edit Icon for Last Name */}
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />

                                {/* ----------- Phone Number Section ------------ */}
                                <Row className='row-myprofile-blocked'>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="phoneNo">Numar de telefon: </Label> {/* Label for Phone Number */}
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.student.phoneNo}</div>  {/* Displaying the Phone Number */}
                                    </Col>
                                    {/* Edit Icon (Disabled) for Phone Number */}
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />

                                {/* ----------- Email Section ------------ */}
                                <Row className='row-myprofile-blocked'>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="email">Email: </Label>   {/* Label for Email */}
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.props.userLogin.email}</div>  {/* Displaying the Email */}
                                    </Col>
                                    {/* Edit Icon (Disabled) for Email */}
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />

                                {/* ----------- Faculty Section ------------ */}
                                <Row className='row-myprofile' onClick={this.toggleModalFaculty}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="faculty">Facultate: </Label>    {/* Label for Faculty */}
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.facultate.name}</div>    {/* Displaying the Faculty Name */}
                                    </Col>
                                    {/* Edit Icon for Faculty */}
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />

                                {/* ----------- Group Section ------------ */}
                                <Row className='row-myprofile' onClick={this.toggleModalGroup}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="group">Grupa si seria: </Label> {/* Label for Group */}
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.student.group}</div>     {/* Displaying the Group */}
                                    </Col>
                                    {/* Edit Icon for Group */}
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Col>
                    </div>
                </Card>

                {/* ----------------------------- First Name Modal ----------------------------- */}
                <Modal isOpen={this.state.isModalFirstNameOpen}  >
                    <ModalHeader toggle={this.toggleModalFirstName}>Modificare prenume: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleFirstName(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="firstname">Prenume: </Label>
                                    {/* Form field to input first name */}
                                    <Control.text model=".firstname"
                                        id="firstname"
                                        name="firstname"
                                        defaultValue={this.state.student.firstName}  // Prefill with current first nam
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            {/* Close button for modal */}
                            <Button onClick={this.toggleModalFirstName} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            {/* Save button for submitting changes */}
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* ----------------------------- Last Name Modal ----------------------------- */}
                <Modal isOpen={this.state.isModalLastNameOpen}  >
                    <ModalHeader toggle={this.toggleModalLastName}>Modificare nume familie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleLastName(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="lastname">Nume de familie: </Label>
                                    {/* Form field to input last name */}
                                    <Control.text model=".lastname"
                                        id="lastname"
                                        name="lastname"
                                        defaultValue={this.state.student.lastName}  // Prefill with current last name
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            {/* Close button for modal */}
                            <Button onClick={this.toggleModalLastName} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            {/* Save button for submitting changes */}
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* ----------------------------- Faculty Modal ----------------------------- */}
                <Modal isOpen={this.state.isModalFacultyOpen}  >
                    <ModalHeader toggle={this.toggleModalFaculty}>Modificare facultate: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleFaculty(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="facultuy">Facultate: </Label>
                                    <Col md={9}>
                                        {/* Dropdown to select a faculty */}
                                        <Control.select model=".faculty" id="faculty" name="faculty"
                                            className='form-control'
                                        >
                                            <option value="" disabled selected>Selecteaza o facultate</option>
                                            {/* Mapping through faculties prop to populate the options */}
                                            {this.props.faculties.length === 0 ?
                                                <option></option>
                                                : this.props.faculties.map((i) => (
                                                    <option key={i.id} value={i.id}>
                                                        {i.name}
                                                    </option>
                                                ))}
                                        </Control.select>
                                    </Col>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            {/* Close button for modal */}
                            <Button onClick={this.toggleModalFaculty} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            {/* Save button for submitting changes */}
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                {/* ----------------------------- Group Modal ----------------------------- */}
                <Modal isOpen={this.state.isModalGroupOpen}  >
                    <ModalHeader toggle={this.toggleModalGroup}>Modificare grupa si serie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleGroup(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="group">Grupa si seria: </Label>
                                    {/* Form field to input group */}
                                    <Control.text model=".group"
                                        id="group"
                                        name="group"
                                        defaultValue={this.state.student.group} // Prefill with current group
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            {/* Close button for modal */}
                            <Button onClick={this.toggleModalGroup} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            {/* Save button for submitting changes */}
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
    const faculties = state.receivedUser.faculties;  // Extracting 'faculties' from the Redux state, which would be a list of faculties.
    const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
    return { loggedIn, faculties, userLogin };
};

// Connects the component to the Redux store
export default connect(mapStateToProps, { fetchFaculties })(MyProfile);

