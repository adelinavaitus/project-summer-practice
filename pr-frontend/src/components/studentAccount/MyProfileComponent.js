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
        this.state = {
            student: {},
            facultate: {},
            isModalFirstNameOpen: false,
            isModalLastNameOpen: false,
            isModalFacultyOpen: false,
            isModalGroupOpen: false,
        }

        this.toggleModalFirstName = this.toggleModalFirstName.bind(this);
        this.toggleModalFaculty = this.toggleModalFaculty.bind(this);
        this.toggleModalGroup = this.toggleModalGroup.bind(this);
        this.toggleModalLastName = this.toggleModalLastName.bind(this);

    }

    toggleModalFirstName() {
        this.setState({
            isModalFirstNameOpen: !this.state.isModalFirstNameOpen
        });
    }

    toggleModalLastName() {
        this.setState({
            isModalLastNameOpen: !this.state.isModalLastNameOpen
        });
    }

    toggleModalFaculty() {
        this.setState({
            isModalFacultyOpen: !this.state.isModalFacultyOpen
        });
    }

    toggleModalGroup() {
        this.setState({
            isModalGroupOpen: !this.state.isModalGroupOpen
        });
    }

    handleFirstName(values) {
        var fname = values.firstname;
        const url = `http://localhost:8080/students/${this.state.student.id}/firstname`;
        axios.put(url, { fname })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalFirstName();
    }

    handleLastName(values) {
        var lname = values.lastname;
        const url = `http://localhost:8080/students/${this.state.student.id}/lastname`;
        axios.put(url, { lname })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalLastName();
    }

    handleGroup(values) {
        var group = values.group;
        const url = `http://localhost:8080/students/${this.state.student.id}/group`;
        axios.put(url, { group })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalGroup();
    }

    handleFaculty(values) {
        var facultyId = values.faculty;
        const url = `http://localhost:8080/students/${this.state.student.id}/faculty`;
        axios.put(url, { facultyId })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalFaculty();
    }

    componentDidUpdate(){
        console.log(this.props.userLogin)
    }

    getStudentById() {
        const url = `http://localhost:8080/students/${this.props.userLogin.id}`;
        axios.get(url)
            .then(result => {
                return result.data
            }).then(res => {
                this.setState({
                    student: res,
                    facultate: res.faculty
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.props.fetchFaculties();
        this.getStudentById();
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
                                        <div id="mydescription">{this.state.student.firstName}</div>
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
                                        <div id="mydescription">{this.state.student.lastName}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* -----------------------------------phone number --------------------------- */}
                                <Row className='row-myprofile-blocked'>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="phoneNo">Numar de telefon: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.student.phoneNo}</div>
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
                                <Row className='row-myprofile' onClick={this.toggleModalFaculty}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="faculty">Facultate: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.facultate.name}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* -----------------------------------group--------------------------- */}
                                <Row className='row-myprofile' onClick={this.toggleModalGroup}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="group">Grupa si seria: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.state.student.group}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Col>
                    </div>
                </Card>


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
                                        defaultValue={this.state.student.firstName}
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
                                        defaultValue={this.state.student.lastName}
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

                <Modal isOpen={this.state.isModalFacultyOpen}  >
                    <ModalHeader toggle={this.toggleModalFaculty}>Modificare facultate: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleFaculty(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="facultuy">Facultate: </Label>
                                    <Col md={9}>
                                        <Control.select model=".faculty" id="faculty" name="faculty"
                                            className='form-control'
                                        >
                                            <option value="" disabled selected>Selecteaza o facultate</option>

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
                            <Button onClick={this.toggleModalFaculty} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>


                <Modal isOpen={this.state.isModalGroupOpen}  >
                    <ModalHeader toggle={this.toggleModalGroup}>Modificare grupa si serie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleGroup(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="group">Grupa si seria: </Label>
                                    <Control.text model=".group"
                                        id="group"
                                        name="group"
                                        defaultValue={this.state.student.group}
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalGroup} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const faculties = state.receivedUser.faculties;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, faculties, userLogin };
};


export default connect(mapStateToProps, { fetchFaculties })(MyProfile);

