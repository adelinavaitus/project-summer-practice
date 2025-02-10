import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

class HistoryRequest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            supervisor: {},
            faculty: {},
        }
    }

    // Fetch the supervisor's data and then fetch the students based on the supervisor's faculty
    getStudents() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    supervisor: result,
                    faculty: result.faculty
                })

                axios.get(`http://localhost:8080/students/faculty/${this.state.faculty.id}`)
                    .then(result => {
                        return result.data
                    }).then(result => {
                        this.setState({
                            students: result,
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Fetch students when component is mounted
    componentDidMount() {
        this.getStudents();
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
                    <CardHeader>
                        <CardTitle tag="h4">Istoric cereri</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            // Display student table if any student's document is not null and has status
                            this.state.students.filter(res => ((res.document === null || res.document.status === null))).length < this.state.students.map(res => (res)).length
                                ? <div>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Nume</th>
                                                <th>Grupa</th>
                                                <th>Document</th>
                                                <th>Raspuns</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                // Loop through the students and display document status
                                                this.state.students.map(student => (
                                                    <React.Fragment>
                                                        {
                                                            student.document === null || student.document.status === null
                                                                ? <div></div>
                                                                : <React.Fragment>
                                                                    {
                                                                        student.document.status === "APPROVED" || student.document.status === "REJECTED"
                                                                            ? <tr>
                                                                                <td>{student.firstName} {student.lastName}</td>
                                                                                <td>{student.group}</td>
                                                                                <td><a href={student.document.downloadUrl}>{student.document.name}</a></td>
                                                                                <td>
                                                                                    {
                                                                                        student.document.status === "APPROVED"
                                                                                            ? <div className='response-approved'><b>Aprobat</b></div>
                                                                                            : student.document.status === "REJECTED"
                                                                                                ? <div className='response-rejected'><b>Respins</b></div>
                                                                                                : <div></div>
                                                                                    }
                                                                                </td>
                                                                            </tr>
                                                                            : <div></div>
                                                                    }
                                                                </React.Fragment>
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                                : <div></div>
                        }
                    </CardBody>
                </Card>
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
export default connect(mapStateToProps)(HistoryRequest);
