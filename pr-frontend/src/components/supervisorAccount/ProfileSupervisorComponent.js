import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Col, Card, CardBody, CardHeader, CardTitle, Row, Label, CardFooter, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import axios from 'axios';
import { toHaveFocus } from '@testing-library/jest-dom/dist/matchers';


class ProfileSupervisor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            faculty: {},
            isModalFirstNameOpen: false,
            isModalLastNameOpen: false
        }

        this.toggleModalFirstName = this.toggleModalFirstName.bind(this);
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

    handleFirstName(values) {
        var fname = values.firstname;
        const url = `http://localhost:8080/supervisors/${this.state.userInfo.id}/firstname`;
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
        const url = `http://localhost:8080/supervisors/${this.state.userInfo.id}/lastname`;
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

    getSupervisorById() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    userInfo: result,
                    faculty: result.faculty
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getSupervisorById();
    }

    render() {
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

const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};


export default connect(mapStateToProps)(ProfileSupervisor);

