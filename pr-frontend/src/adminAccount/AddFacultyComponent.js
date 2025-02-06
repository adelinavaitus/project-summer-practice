import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, CardFooter, CardHeader, CardBody, Col, Row, CardTitle, Label, Button } from 'reactstrap';
import { Control, Form, Errors, LocalForm, } from 'react-redux-form';
import { fetchFaculties, postFormRegisterSupervisor } from '../redux/ActionCreators';

const required = (val) => val && val.length;
const validEmail = (val) => !(val) || /^[A-Z0-9._%=-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i.test(val);
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

function onlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}

class AddFaculty extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmitFaculty(values) {
        const data = {
            id: -1,
            name: values.facultyname
        }
        const url = `http://localhost:8080/faculties`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleSubmitSupervisor(values) {
        const data = {
            email: values.email,
            firstName: values.fname,
            lastName: values.lname,
            facultyId: values.faculty,
            password: values.password
        }
        this.props.postFormRegisterSupervisor(data);
    }

    componentDidMount() {
        this.props.fetchFaculties();
    }

    render() {

        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_ADMIN') {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>
                <Row>
                    <Col md={6}>
                        <Card className='text-center principalCard' body outline>
                            <CardHeader>
                                <CardTitle tag="h4">Adauga o facultate</CardTitle>
                            </CardHeader>
                            <LocalForm model="feedback" onSubmit={(values) => this.handleSubmitFaculty(values)}>
                                <CardBody>
                                    <Row className='form-group text-right'>
                                        <Label htmlFor='facultyname' md={4}>Nume facultate:  <span className='req'>*</span></Label>
                                        <Col md={8}>
                                            <Control.text model=".facultyname" id="facultyname" name='facultyname'
                                                placeholder='Nume facultate'
                                                className='form-control'
                                                validators={{ required }}
                                            />
                                            <Errors
                                                className='text-danger'
                                                model=".facultyname"
                                                show={(field) => field.touched && !field.focus}
                                                messages={{
                                                    required: 'Acest câmp este obligatoriu. '
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button block type="submit" className='submit-button' >
                                        Adauga
                                    </Button>
                                </CardFooter>
                            </LocalForm>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className='text-center principalCard' body outline>
                            <CardHeader>
                                <CardTitle tag="h4">Adauga un coordonator</CardTitle>
                            </CardHeader>
                            <LocalForm model="feedback" onSubmit={(values) => this.handleSubmitSupervisor(values)}>
                                <CardBody>
                                    <Row className='form-group text-right'>
                                        <Label htmlFor='fname' md={4}>Nume:  <span className='req'>*</span></Label>
                                        <Col md={8}>
                                            <Control.text model=".fname" id="fname" name='fname'
                                                placeholder='Nume'
                                                className='form-control'
                                                validators={{ required, minLength: minLength(3), onlyLetters }}
                                            />
                                            <Errors
                                                className='text-danger'
                                                model=".fname"
                                                show={(field) => field.touched && !field.focus}
                                                messages={{
                                                    required: 'Acest câmp este obligatoriu. ',
                                                    minLength: "Numele trebuie sa contina mai mult de 2 caractere. ",
                                                    onlyLetters: "Textul nu poate contine cifre sau caractere speciale. "
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className='form-group text-right'>
                                        <Label htmlFor='lname' md={4}>Prenume:  <span className='req'>*</span></Label>
                                        <Col md={8}>
                                            <Control.text model=".lname" id="lname" name='lname'
                                                placeholder='Prenume'
                                                className='form-control'
                                                validators={{ required, minLength: minLength(3), onlyLetters }}
                                            />
                                            <Errors
                                                className='text-danger'
                                                model=".lname"
                                                show={(field) => field.touched && !field.focus}
                                                messages={{
                                                    required: 'Acest câmp este obligatoriu. ',
                                                    minLength: "Numele trebuie sa contina mai mult de 2 caractere. ",
                                                    onlyLetters: "Textul nu poate contine cifre sau caractere speciale. "
                                                }}
                                            />
                                        </Col>
                                    </Row>


                                    <Row className='form-group text-right'>
                                        <Label htmlFor='email' md={4}>Email<span className='req'>*</span></Label>
                                        <Col md={8}>
                                            <Control.text model=".email" id="email" name="email"
                                                placeholder="Email"
                                                className='form-control'

                                                validators={{ required, validEmail }}
                                            />
                                            <Errors
                                                className='text-danger'
                                                model=".email"
                                                show={(field) => field.touched && !field.focus}
                                                messages={{
                                                    required: 'Acest câmp este obligatoriu. ',
                                                    validEmail: 'Adresa de email invalida'
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='form-group  text-right'>
                                        <Label htmlFor='faculty' md={4}>Facultate<span className='req'>*</span></Label>
                                        <Col md={8}>
                                            <Control.select model=".faculty" name="faculty" className='form-control' validators={{ required }}>

                                                <option value="" disabled selected>Selecteaza o facultate</option>

                                                {this.props.faculties.length === 0 ?
                                                    <option></option>
                                                    : this.props.faculties.map((i) => (
                                                        <option key={i.id} value={i.id}>
                                                            {i.name}
                                                        </option>
                                                    ))}
                                            </Control.select>
                                            <Errors
                                                className='text-danger'
                                                model=".faculty"
                                                show={(field) => field.touched && !field.focus}
                                                messages={{
                                                    required: 'Acest câmp este obligatoriu. ',
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className='form-group text-right'>
                                        <Label htmlFor='password' md={4}>Parola<span className='req'>*</span></Label>
                                        <Col md={8}>
                                            <Control.text type="password" model=".password" id="password" name="password"
                                                placeholder="Parola"
                                                className='form-control'
                                                validators={{ required }}
                                            />
                                            <Errors
                                                className='text-danger'
                                                model=".password"
                                                show={(field) => field.touched && !field.focus}
                                                messages={{
                                                    required: 'Acest câmp este obligatoriu. ',
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <Button block type="submit" className='submit-button' >
                                        Adauga
                                    </Button>
                                </CardFooter>
                            </LocalForm>
                        </Card>
                    </Col>
                </Row>
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

export default connect(mapStateToProps, { fetchFaculties, postFormRegisterSupervisor })(AddFaculty);
