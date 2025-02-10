import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { Control } from 'react-redux-form';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from 'reactstrap';
import { fetchFaculties } from '../redux/ActionCreators';

class Supervisors extends Component {
    constructor(props) {
        super(props);

        // Initialize the component's state
        this.state = {
            supervisors: [],
            option: '',
        }

        // Bind the handleChange method to this component
        this.handleChange = this.handleChange.bind(this);
    }

    // Fetch all supervisors from the backend
    getAllSupervisors() {
        axios.get(`http://localhost:8080/supervisors`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    supervisors: result,
                })

            })
            .catch(err => {
                console.log(err);
            })
    }

    // Fetch data when the component mounts
    componentDidMount() {
        this.getAllSupervisors();
    }

    // Handle the change of sorting option
    handleChange(e) {
        this.setState({ option: e.target.value });
        console.log("option: " + this.state.option);
    }

    render() {
        // Redirect to login if the user is not logged in or is not an admin
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_ADMIN') {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Coordonatori facultate</CardTitle>
                    </CardHeader>

                    <CardBody>
                        <Row className='select-row'>
                            <Col md={9}></Col>
                            <Col md={3}>
                                {/* Dropdown for sorting supervisors */}
                                <Control.select model=".faculty" name="faculty" className='form-control'
                                    value={this.state.option} onChange={this.handleChange}>
                                    <option value="" disabled selected>Sorteaza</option>
                                    <option value="all">Afiseaza toti coordonatorii</option>
                                    <option value="byFaculty">Sortare pe facultate</option>
                                </Control.select>
                            </Col>
                        </Row>
                        {
                            this.state.option === 'all' || this.state.option === ''
                                ? <div>
                                    {/* Display all supervisors */}
                                    {
                                        this.state.supervisors.map(res => (res)).length > 0
                                            ? <table class="table">
                                                <thead>
                                                    <th>Nume</th>
                                                    <th>Facultate</th>
                                                    <th>Email</th>
                                                </thead>
                                                {
                                                    this.state.supervisors.map(supervisor => (
                                                        <tbody>
                                                            <td>{supervisor.firstName} {supervisor.lastName}</td>
                                                            <td>{supervisor.facultyName}</td>
                                                            <td><a href={`mailto:${supervisor.email}`}>{supervisor.email}</a></td>
                                                        </tbody>
                                                    ))
                                                }
                                            </table>
                                            : <div>Nu exista niciun coordonator!</div>
                                    }
                                </div>
                                : this.state.option === 'byFaculty'
                                    ? <div className='text-left'>
                                        {/* Display supervisors grouped by faculty */}
                                        {
                                            this.props.faculties.map(res => (res)).length > 0
                                                ? <div >
                                                    {
                                                        this.props.faculties.map(faculty => (
                                                            <div className='faculty-filter-div'>
                                                                <CardTitle tag="h5">{faculty.name}</CardTitle>
                                                                {this.state.supervisors.filter(supervisor => supervisor.facultyName === faculty.name).map(filteredSupervisor => (filteredSupervisor)).length > 0
                                                                    ? <div >
                                                                        <table className='table'>
                                                                            <thead>
                                                                                <th>Nume</th>
                                                                                <th>Email</th>
                                                                            </thead>
                                                                            {
                                                                                this.state.supervisors.filter(supervisor => supervisor.facultyName === faculty.name).map(filteredSupervisor => (
                                                                                    <tbody>
                                                                                        <td>{filteredSupervisor.firstName} {filteredSupervisor.lastName}</td>
                                                                                        <td><a href={`mailto:${filteredSupervisor.email}`}>{filteredSupervisor.email}</a></td>
                                                                                    </tbody>
                                                                                ))
                                                                            }
                                                                        </table>
                                                                    </div>
                                                                    : <div>Nu exista coordonatori inregistrati pentru aceasta facultate.</div>}
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
                </Card>
            </div>
        );
    }
}

// Map state from Redux to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const faculties = state.receivedUser.faculties;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, faculties, userLogin };
};

// Connect the component to Redux
export default connect(mapStateToProps, { fetchFaculties })(Supervisors);
