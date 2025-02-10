import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { Control } from 'react-redux-form';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Label } from 'reactstrap';
import { fetchFaculties } from '../redux/ActionCreators';

class Students extends Component {
    constructor(props) {
        super(props);

        // Initialize state to hold students, selected option, supervisor, and faculty details
        this.state = {
            students: [],
            option: '',
            supervisor: {},
            faculty: {}
        }
        // Bind the handleChange method to the component
        this.handleChange = this.handleChange.bind(this);
    }

    // Fetch all students for admin users
    getAllStudentsForAdmin() {
        axios.get(`http://localhost:8080/students`)
            .then(result => {
                return result.data
            }).then(result => {
                // Update the state with the list of students
                this.setState({
                    students: result,
                })

            })
            .catch(err => {
                // Log any error that occurs during the API call
                console.log(err);
            })
    }

    // Fetch supervisor and corresponding faculty details
    getSupervisor() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                // Update state with supervisor and faculty details
                this.setState({
                    supervisor: result,
                    faculty: result.faculty
                })

                // Fetch students filtered by the supervisor's faculty
                axios.get(`http://localhost:8080/students?facultyId=${this.state.faculty.id}`)
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

    // Lifecycle method to fetch data based on user role when the component mounts
    componentDidMount() {
        if (this.props.userLogin.roles === "ROLE_ADMIN") {
            this.getAllStudentsForAdmin();
        }

        if (this.props.userLogin.roles === "ROLE_SUPERVISOR") {
            this.getSupervisor();
        }
    }

    // Handle changes in the selected dropdown option or search input
    handleChange(e) {
        this.setState({ option: e.target.value });
        console.log("option: " + this.state.option);
    }

    render() {
        // Redirect to login page if the user is not logged in or doesn't have the correct role
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_ADMIN' && this.props.userLogin.roles !== 'ROLE_SUPERVISOR') {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        {/* Display the title for the Students card */}
                        <CardTitle tag="h4">Studenti</CardTitle>
                    </CardHeader>

                    {
                        this.props.userLogin.roles === "ROLE_ADMIN"
                            ? <CardBody>
                                {/* Dropdown to select sorting or filtering options */}
                                <Row className='select-row'>
                                    <Col md={9}></Col>
                                    <Col md={3}>
                                        <Control.select model=".faculty" name="faculty" className='form-control'
                                            value={this.state.option} onChange={this.handleChange}>
                                            <option value="" disabled selected>Sorteaza</option>
                                            <option value="all">Afiseaza toti studentii</option>
                                            <option value="byFaculty">Sortare pe facultate</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                {
                                    this.state.option === 'all' || this.state.option === ''
                                        ? <div>
                                            {
                                                // Display all students if the "all" option is selected
                                                this.state.students.map(res => (res)).length > 0
                                                    ? <table class="table">
                                                        <thead>
                                                            {/* Table headers for displaying student details */}
                                                            <th>Nume</th>
                                                            <th>Facultate</th>
                                                            <th>Grupa si seria</th>
                                                            <th>Email</th>
                                                        </thead>
                                                        {
                                                            // Map over the students and render their details in the table
                                                            this.state.students.map(student => (
                                                                <tbody>
                                                                    <td>{student.firstName} {student.lastName}</td>
                                                                    <td>{student.facultyName}</td>
                                                                    <td>{student.group}</td>
                                                                    <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                                                                </tbody>
                                                            ))
                                                        }
                                                    </table>
                                                    : <div>Nu exista niciun student!</div>
                                            }
                                        </div>
                                        : this.state.option === 'byFaculty'
                                            ? <div className='text-left' >
                                                {
                                                    // Display students grouped by faculty
                                                    this.props.faculties.map(res => (res)).length > 0
                                                        ? <div >
                                                            {
                                                                this.props.faculties.map(faculty => (
                                                                    <div className='faculty-filter-div'>
                                                                        {/* Display faculty name */}
                                                                        <CardTitle tag="h5">{faculty.name}</CardTitle>
                                                                        {
                                                                            // Display students belonging to a specific faculty
                                                                            this.state.students.filter(student => student.facultyName === faculty.name).map(filteredStudent => (filteredStudent)).length > 0
                                                                                ? <div >
                                                                                    <table className='table'>
                                                                                        <thead>
                                                                                            <th>Nume</th>
                                                                                            <th>Grupa si seria</th>
                                                                                            <th>Email</th>
                                                                                        </thead>
                                                                                        {
                                                                                            // Map over filtered students and render their details in the table
                                                                                            this.state.students.filter(student => student.facultyName === faculty.name).map(filteredStudent => (
                                                                                                <tbody>
                                                                                                    <td>{filteredStudent.firstName} {filteredStudent.lastName}</td>
                                                                                                    <td>{filteredStudent.group}</td>
                                                                                                    <td><a href={`mailto:${filteredStudent.email}`}>{filteredStudent.email}</a></td>
                                                                                                </tbody>
                                                                                            ))
                                                                                        }
                                                                                    </table>
                                                                                </div>
                                                                                : <div>Nu exista studenti inregistrati pentru aceasta facultate.</div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        : <div>Nu exista facultati in baza de date!</div>
                                                }
                                            </div>
                                            : <div></div>
                                }
                            </CardBody>
                            : this.props.userLogin.roles === "ROLE_SUPERVISOR"
                                ? <div>
                                    <CardBody>
                                        {/* Search bar for supervisors to find students by group */}
                                        <Row className='select-row text-right'>
                                            <Col md={3}>   <Label for="group">Cauta grupa: </Label></Col>
                                            <Col md={9}>
                                                <Control.text model=".group" name="group" className='form-control'
                                                    value={this.state.option} onChange={this.handleChange}>
                                                </Control.text>
                                            </Col>
                                        </Row>
                                        {
                                            this.state.option === ''
                                                ? <div>
                                                    {
                                                        // Display all students supervised by the user if no group is searched
                                                        this.state.students.map(res => (res)).length > 0
                                                            ? <table class="table">
                                                                <thead>
                                                                    <th>Nume</th>
                                                                    <th>Grupa si seria</th>
                                                                    <th>Email</th>
                                                                </thead>
                                                                {
                                                                    this.state.students.map(student => (
                                                                        <tbody>
                                                                            <td>{student.firstName} {student.lastName}</td>
                                                                            <td>{student.group}</td>
                                                                            <td><a href={`mailto:${student.email}`}>{student.email}</a></td>
                                                                        </tbody>
                                                                    ))
                                                                }
                                                            </table>
                                                            : <div>Nu sunt studenti inregistrati!</div>
                                                    }
                                                </div>
                                                : <div>
                                                    {
                                                        // Display students matching the searched group
                                                        this.state.students.filter(student => (student.group).includes(this.state.option)).map(filteredStudent => (filteredStudent)).length > 0
                                                            ? <div >
                                                                <table className='table'>
                                                                    <thead>
                                                                        <th>Nume</th>
                                                                        <th>Grupa si seria</th>
                                                                        <th>Email</th>
                                                                    </thead>
                                                                    {
                                                                        // Map over filtered students and render their details
                                                                        this.state.students.filter(student => (student.group).includes(this.state.option)).map(filteredStudent => (
                                                                            <tbody>
                                                                                <td>{filteredStudent.firstName} {filteredStudent.lastName}</td>
                                                                                <td>{filteredStudent.group}</td>
                                                                                <td><a href={`mailto:${filteredStudent.email}`}>{filteredStudent.email}</a></td>
                                                                            </tbody>
                                                                        ))
                                                                    }
                                                                </table>
                                                            </div>
                                                            : <div>Nu exista studenti inregistrati la aceasta grupa!</div>
                                                    }
                                                </div>
                                        }
                                    </CardBody>
                                </div>
                                : <div></div>
                    }
                </Card>
            </div>
        );
    }
}

// Map Redux state to component props for authentication, faculties, and user details
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const faculties = state.receivedUser.faculties;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, faculties, userLogin };
};

// Connect the component to Redux with the fetchFaculties action
export default connect(mapStateToProps, { fetchFaculties })(Students);
