import React, { Component } from 'react';
import { Card, CardTitle, Col, Button, CardHeader, CardText, CardImg, CardBody, Row, Label } from 'reactstrap';
import { Control, Form, Errors, LocalForm, } from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';
import { postFormRegisterCompany, ReloadPage } from '../redux/ActionCreators';
import { connect } from "react-redux";

// Validation for required fields
const required = (val) => val && val.length;

// Validation for minimum length
const minLength = (len) => (val) => !(val) || (val.length >= len);

// Validation for email format
const validEmail = (val) => !(val) || /^[A-Z0-9._%=-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i.test(val);

// Checks if the password contains at least one lowercase letter
function isLower(val) {
    if (val && val.length >= 6) {
        if (val === val.toLowerCase()) {
            return false;
        } else return true;
    } else return true
}

// Checks if the password contains at least one uppercase letter
function isUpper(val) {
    if (val && val.length >= 6) {
        if (val === val.toUpperCase()) {
            return false;
        } else return true;
    } else return true
}

// Checks if the password contains at least one number
function containsNumber(val) {
    if (val && val.length >= 6) {
        if (isLower(val) === true && isUpper(val) === true)
            return /\d/.test(val);
        else return true
    } else return true;
}

class RegisterCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validPass: true // State to manage password validation
        }
        this.handleSubmit = this.handleSubmit.bind(this);   // Bind the submit handler
        this.handleChange = this.handleChange.bind(this);    // Bind the change handler

        // Reload page if the user performs a refresh
        if (window.performance) {
            if (performance.navigation.type == 1) {
                this.props.ReloadPage();
            }
        }
    }

    // Handles form submission
    handleSubmit(values) {
        this.props.postFormRegisterCompany(values);
    }

    // Validates if passwords match
    handleChange(values) {
        if (values.password && values.password !== "" && values.conpassword && values.conpassword !== "")
            if (values.password === values.conpassword)
                this.setState({ validPass: true })
            else
                this.setState({ validPass: false })
    }

    render() {
        // Redirect if the user is already logged in
        if (this.props.loggedIn) {
            return (
                <Redirect to="home" />
            );
        }

        return (
            <div className='container card-register'>
                <Card className='text-center' body outline>
                    <div className="row align-items-start">
                        <Col sm={12} lg={8}>
                            <CardBody>
                                {/* Title for the company registration */}
                                <CardHeader>
                                    <CardTitle tag="h4">Cont nou companie</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}
                                        onChange={(values) => this.handleChange(values)}

                                    >

                                        <Row className='form-group'>
                                            <Label htmlFor='name' md={4}>Nume companie<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text model=".name" id="name" name='name'
                                                    placeholder='Nume'
                                                    className='form-control'
                                                    validators={{ required }}
                                                />
                                                <Errors
                                                    className='text-danger'
                                                    model=".name"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. '
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className='form-group'>
                                            <Label htmlFor='email' md={4}>Email<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text model=".email" id="email" name="email"
                                                    placeholder="Email"
                                                    className='form-control'
                                                    onChange={() => this.props.ReloadPage()}
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

                                        <Row className='form-group'>
                                            <Label htmlFor='size' md={4}>Marime companie<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.select model=".size" name="size" className='form-control'
                                                    validators={{ required }}
                                                >
                                                    <option value="" disabled selected>Selecteaza marimea companiei</option>
                                                    <option>1-100</option>
                                                    <option>101-200</option>
                                                    <option>201-500</option>
                                                    <option>501-1000</option>
                                                    <option>1001-5000</option>
                                                    <option> &#8805;5001</option>
                                                </Control.select>
                                                <Errors
                                                    className='text-danger'
                                                    model=".size"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. '
                                                    }}
                                                />
                                            </Col>
                                        </Row>


                                        <Row className='form-group'>
                                            <Label htmlFor="description" md={4}>Descrierea companiei</Label>
                                            <Col md={8}>
                                                <Control.textarea model=".description" id="description" name="description"
                                                    rows="6"
                                                    className='form-control'
                                                />
                                            </Col>
                                        </Row>

                                        <Row className='form-group'>
                                            <Label htmlFor='password' md={4}>Parola<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text type="password" model=".password" id="password" name="password"
                                                    placeholder="Parola"
                                                    className='form-control'
                                                    validators={{ required, minLength: minLength(6), isLower, isUpper, containsNumber }}
                                                />
                                                <Errors
                                                    className='text-danger'
                                                    model=".password"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. ',
                                                        minLength: 'Parola trebuie sa aiba minim 6 caractere ',
                                                        isLower: 'Parola trebuie sa contina cel putin o majuscula ',
                                                        isUpper: 'Parola trebuie sa contina cel putin o minuscula ',
                                                        containsNumber: "Parola trebuie sa contina cel putin un numar "

                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className='form-group'>
                                            <Label htmlFor='conpassword' md={4}>Confirma Parola<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text type="password" model=".conpassword" id="conpassword" name="conpassword"
                                                    placeholder="Confima Parola"
                                                    className='form-control'
                                                    validators={{ required }}

                                                />
                                                <Errors
                                                    className='text-danger'
                                                    model=".conpassword"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. '
                                                    }}
                                                />

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={4}></Col>
                                            <Col md={8}>
                                                {
                                                    !this.state.validPass
                                                        ? <div className='invalid-credentials'>Parolele trebuie sa fie identice.</div>
                                                        : <div></div>

                                                }
                                                {
                                                    this.props.errRegister && this.props.errRegister.length > 0
                                                        ? <div className='invalid-credentials'>{this.props.errRegister}</div>
                                                        : <div></div>
                                                }
                                            </Col>
                                        </Row>
                                        <Row className='form-group'>
                                            <Col md={{ size: 8, offset: 4 }}>
                                                <Button block type="submit" className='submit-button' >
                                                    Submit
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={{ size: 8, offset: 4 }}>
                                                <h6>Ai deja cont? &nbsp;
                                                    <Link className='login-link' to="/login" onPress={() => this.formValidation()} >Login</Link>
                                                </h6>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </CardBody>
                            </CardBody>
                        </Col>
                        <Col sm={12} lg={4} className="d-none d-lg-block ">
                            <CardImg src='../assets/company.png' alt="Student presentation image" className='image img-register-company' />
                        </Col>
                    </div>
                </Card>
            </div>
        );
    }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const isRegisered = state.receivedUser.isRegistered;     // Tracks if the company is registered
    const loggedIn = state.receivedUser.isLoggedIn;  // Tracks if the user is logged in
    const errRegister = state.receivedUser.err_register_comp;    // Stores registration errors
    return { isRegisered, loggedIn, errRegister };
};

// Connect to Redux store
export default connect(mapStateToProps, { postFormRegisterCompany, ReloadPage })(RegisterCompany);
