import React, { Component } from 'react';
import { Card, CardFooter, CardHeader, CardTitle, Button, CardBody, Row, Label, Col } from 'reactstrap';
import { Control, Errors, LocalForm, } from 'react-redux-form';
import { connect } from "react-redux";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const required = (val) => val && val.length;

class AddJobPage extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(values) {
        var jdesc = values.jobdescription
        jdesc = jdesc.replace(/(?:\r\n|\r|\n)/g, " ");
        const data = {
            id: -1,
            companyId: this.props.userLogin.id,
            jobType: values.jobType,
            description: jdesc,
            title: values.title
        }
        const url = `http://localhost:8080/jobs`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                window.location.href = "http://localhost:3000/jobs";
            })
            .catch(err => {
                console.log(err);
            })
    }


    render() {
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_COMPANY') {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>

                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Adauga un job nou</CardTitle>
                    </CardHeader>
                    <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                        <CardBody>
                            <Row className='form-group text-right'>
                                <Label htmlFor='title' md={4}>Titlu job: <span className='req'>*</span></Label>
                                <Col md={8}>
                                    <Control.text model=".title" id="title" name='title'
                                        placeholder='Titlu'
                                        className='form-control'
                                        validators={{ required }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model=".title"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            required: 'Acest câmp este obligatoriu. '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group  text-right'>
                                <Label htmlFor='jobType' md={4}>Tip job: <span className='req'>*</span></Label>
                                <Col md={8}>
                                    <Control.select model=".jobType" name="jobType" id="jobType" className='form-control'
                                        validators={{ required }}
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
                                            required: 'Acest câmp este obligatoriu. '
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className='form-group text-right'>
                                <Label htmlFor='jobdescription' md={4}>Descriere job: <span className='req'>*</span></Label>
                                <Col md={8}>
                                    <Control.textarea model=".jobdescription" id="jobdescription" name="jobdescription"
                                        rows="6" validators={{ required }}
                                        className='form-control'
                                    />
                                    <Errors
                                        className='text-danger'
                                        model=".jobdescription"
                                        show={(field) => field.touched && !field.focus}
                                        messages={{
                                            required: 'Acest câmp este obligatoriu. '
                                        }}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
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


const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};


export default connect(mapStateToProps)(AddJobPage);
