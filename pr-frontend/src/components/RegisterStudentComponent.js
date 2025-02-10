import React, { Component } from 'react';
import { Card, CardTitle, Col, Button, CardHeader, CardText, CardImg, CardBody, Row, Label } from 'reactstrap';
import { Control, Form, Errors, LocalForm, } from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchFaculties, postFormRegisterStudent, ReloadPage } from '../redux/ActionCreators';

// Validator to check if a value exists and is not empty
const required = (val) => val && val.length;

// Validator to check if a value has a minimum length
const minLength = (len) => (val) => !(val) || (val.length >= len);

// Validator to check if a value is a valid email address
const validEmail = (val) => !(val) || /^[A-Z0-9._%=-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i.test(val);

// Validator to check if a value has a maximum length
const maxLength = (len) => (val) => !(val) || (val.length <= len);

// Validator to check if a value contains only numeric characters
const isNum = (val) => /^\d+$/.test(val);

// Validator to check if a value contains at least one lowercase character
function isLower(val) {
    if (val && val.length >= 6) {
        if (val === val.toLowerCase()) {
            return false;
        } else return true;
    } else return true

}

// Validator to check if a value contains at least one uppercase character
function isUpper(val) {
    if (val && val.length >= 6) {
        if (val === val.toUpperCase()) {
            return false;
        } else return true;
    } else return true
}

// Validator to check if a value contains at least one number
function containsNumber(val) {
    if (val && val.length >= 6) {
        if (isLower(val) === true && isUpper(val) === true)
            return /\d/.test(val);
        else return true
    } else return true;
}

// Validator to check if a value contains only letters
function onlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}

class RegisterStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validPass: true // State to track if the password and confirmation match
        };

        // Bind methods to the component instance
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        // Check if the page was reloaded, then trigger the ReloadPage action
        if (window.performance) {
            if (performance.navigation.type == 1) {
                this.props.ReloadPage();
            }
        }
    }

    // Handler to check if password and confirmation password match
    handleChange(values) {
        if (values.password && values.password !== "" && values.conpassword && values.conpassword !== "")
            if (values.password === values.conpassword)
                this.setState({ validPass: true })
            else
                this.setState({ validPass: false })
    }

    // Lifecycle method to fetch the list of faculties on component mount
    componentDidMount() {
        this.props.fetchFaculties();
    }

    // Handler to submit the form with student registration data
    handleSubmit(values) {
        const data = {
            email: values.email,
            password: values.password,
            firstName: values.firstname,
            lastName: values.lastname,
            phoneNo: values.telephoneno,
            group: values.groupF,
            facultyId: values.faculty,
        }

        this.props.postFormRegisterStudent(data);
    }

    render() {
        // Redirect to home page if the user is already logged in
        if (this.props.loggedIn) {
            return (
                <Redirect to="/home" />
            );
        }

        return (
            <div className='container card-register'>
                <Card className='text-center' body outline>
                    <div className="row align-items-start">
                        {/* Form Section */}
                        <Col sm={12} lg={8}>
                            <CardBody>
                                <CardHeader>
                                    <CardTitle tag="h4">Cont nou student</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}
                                        onChange={(values) => this.handleChange(values)}>
                                        {/* Last Name Field */}
                                        <Row className='form-group'>
                                            <Label htmlFor='lastname' md={4}>Nume<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text model=".lastname" id="lastname" name='lastname'
                                                    placeholder='Nume'
                                                    className='form-control'
                                                    validators={{ required, minLength: minLength(3), onlyLetters }} />
                                                <Errors
                                                    className='text-danger'
                                                    model=".lastname"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. ',
                                                        minLength: "Numele trebuie sa contina mai mult de 2 caractere. ",
                                                        onlyLetters: "Textul nu poate contine cifre sau caractere speciale. "
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        {/* First Name Field */}
                                        <Row className='form-group'>
                                            <Label htmlFor='firstname' md={4}>Prenume<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text model=".firstname" id="firstname" name='firstname'
                                                    placeholder='Prenume'
                                                    className='form-control'
                                                    validators={{ required, minLength: minLength(3), onlyLetters }} />
                                                <Errors
                                                    className='text-danger'
                                                    model=".firstname"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. ',
                                                        minLength: "Prenumele trebuie sa contina mai mult de 2 caractere",
                                                        onlyLetters: "Textul nu poate contine cifre sau caractere speciale"
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        {/* Email Field */}
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

                                        {/* Phone Number Field */}
                                        <Row className='form-group'>
                                            <Label htmlFor='telephoneno' md={4}>Numar de telefon<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text model=".telephoneno" id="telephoneno" name="telephoneno"
                                                    placeholder="Numar de telefon"
                                                    className='form-control'
                                                    onChange={() => this.props.ReloadPage()}
                                                    validators={{ required, minLength: minLength(10), maxLength: maxLength(12), isNum }}
                                                />
                                                <Errors
                                                    className='text-danger'
                                                    model=".telephoneno"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. ',
                                                        minLength: "Numarul trebuie sa contina minim 10 caractere. ",
                                                        maxLength: "Numarul trebuie sa contina maxim 12 caractere. ",
                                                        isNum: "Numarul de telefon trebuie sa contina doar cifre. "
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        {/* Faculty Field */}
                                        <Row className='form-group'>
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


                                        {/* Class Field */}
                                        <Row className='form-group'>
                                            <Label htmlFor='groupF' md={4}>Grupa si seria<span className='req'>*</span></Label>
                                            <Col md={8}>
                                                <Control.text model=".groupF" id="groupF" name="groupF"
                                                    placeholder="Grupa si seria"
                                                    className='form-control'
                                                    validators={{ required }}
                                                />
                                                <Errors
                                                    className='text-danger'
                                                    model=".groupF"
                                                    show={(field) => field.touched && !field.focus}
                                                    messages={{
                                                        required: 'Acest câmp este obligatoriu. ',
                                                    }}
                                                />
                                            </Col>
                                        </Row>

                                        {/* Password Field */}
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

                                        {/* Confirmation Password Field */}
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
                                                    this.props.err_register && this.props.err_register.length > 0
                                                        ? <div className='invalid-credentials'>{this.props.err_register}</div>
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

                                        {/* Login link */}
                                        <Row>
                                            <Col md={{ size: 8, offset: 4 }}>
                                                <h6>Ai deja cont? &nbsp;
                                                    <Link className='login-link' to="/login">Login</Link>
                                                </h6>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </CardBody>
                            </CardBody>
                        </Col>
                        <Col sm={12} lg={4} className="d-none d-lg-block ">
                            <CardImg src='../assets/student.png' alt="Student presentation image" className='image img-register' />
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
    const faculties = state.receivedUser.faculties;
    const err_register = state.receivedUser.err_register_stud;
    return { loggedIn, faculties, err_register };
}

// Connect to Redux store
export default connect(mapStateToProps, { fetchFaculties, postFormRegisterStudent, ReloadPage })(RegisterStudent);
