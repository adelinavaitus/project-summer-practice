import React, { Component } from 'react';
import { Card, CardFooter, CardHeader, CardTitle, Button, CardBody, Row, Label, Col } from 'reactstrap';
import { Control, Errors, LocalForm, } from 'react-redux-form';
import { connect } from "react-redux";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// Validation function to check if the field is filled
const required = (val) => val && val.length;

class AddJobPage extends Component {
    constructor(props) {
        super(props);
    }

    // Handle form submission and send job data to the server
    handleSubmit(values) {
        var jdesc = values.jobdescription
        // Replace line breaks with spaces for clean description
        jdesc = jdesc.replace(/(?:\r\n|\r|\n)/g, " ");
        const data = {
            id: -1, // Default ID for a new job
            companyId: this.props.userLogin.id, // Company ID from user login
            jobType: values.jobType,    // Job type (part-time, full-time, internship)
            description: jdesc, // Processed job description
            title: values.title // Job title
        }

        const url = `http://localhost:8080/jobs`;   // Backend API endpoint
        axios.post(url, data)   // Send POST request to the server
            .then(response => {
                console.log(response.data)  // Log the server response
                window.location.href = "http://localhost:3000/jobs";    // Redirect to the jobs page
            })
            .catch(err => {
                console.log(err);   // Log any errors
            })
    }

    render() {
        // Redirect user to login if not logged in or not a company user
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_COMPANY') {
            return (
                <Redirect to="/login" />
            );
        }
        // Render the job addition form
        return (
            <div className='container'>

                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Adauga un job nou</CardTitle>
                    </CardHeader>
                    {/* Form for adding a job */}
                    <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <CardBody>
                            {/* Job Title Field */}
                            <Row className='form-group text-right'>
                                <Label htmlFor='title' md={4}>Titlu job: <span className='req'>*</span></Label>
                                <Col md={8}>
                                    <Control.text model=".title" id="title" name='title'
                                        placeholder='Titlu'
                                        className='form-control'
                                        validators={{ required }}   // Validation for required field
                                    />
                                    <Errors
                                        className='text-danger'
                                        model=".title"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            required: 'Acest câmp este obligatoriu. '   // Error message
                                        }}
                                    />
                                </Col>
                            </Row>
                            {/* Job Type Dropdown */}
                            <Row className='form-group  text-right'>
                                <Label htmlFor='jobType' md={4}>Tip job: <span className='req'>*</span></Label>
                                <Col md={8}>
                                    <Control.select model=".jobType" name="jobType" id="jobType" className='form-control'
                                        validators={{ required }}   // Validation for required field
                                    >
                                        <option value="" disabled selected>Selecteaza tipul jobului</option>
                                        <option>part-time</option>
                                        <option>full-time</option>
                                        <option>internship</option>

                                    </Control.select>
                                    <Errors
                                        className='text-danger'
                                        model=".jobtype"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            required: 'Acest câmp este obligatoriu. '   // Error message
                                        }}
                                    />
                                </Col>
                            </Row>
                            {/* Job Description Field */}
                            <Row className='form-group text-right'>
                                <Label htmlFor='jobdescription' md={4}>Descriere job: <span className='req'>*</span></Label>
                                <Col md={8}>
                                    <Control.textarea model=".jobdescription" id="jobdescription" name="jobdescription"
                                        rows="6" validators={{ required }}   // Validation for required field
                                        className='form-control'
                                    />
                                    <Errors
                                        className='text-danger'
                                        model=".jobdescription"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            required: 'Acest câmp este obligatoriu. '    // Error message
                                        }}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            {/* Submit Button */}
                            <Col md={{ size: 8, offset: 4 }}>
                                <Button block type="submit" className='submit-button' >
                                    Submit
                                </Button>
                            </Col>
                        </CardFooter>
                    </LocalForm>
                </Card>
            </div>
        );
    }
}

// Map state from Redux to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Check if user is logged in
    const userLogin = state.receivedUser.userLogin; // Get logged-in user's details
    return { loggedIn, userLogin };
};

// Connect component to Redux
export default connect(mapStateToProps)(AddJobPage);
