import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardTitle, CardHeader, CardBody, CardText, CardFooter, Button } from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class MyApplications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: [],   // State to hold the list of applications
        }
    }

    // Fetch applications for the logged-in student from the API
    getAllAplicationsForStudent() {
        axios.get(`http://localhost:8080/applications/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data  // Return the application data
            }).then(result => {
                // Set the applications data to the state
                this.setState({
                    applications: result,
                })
            })
            .catch(err => {
                console.log(err);   // Log any errors
            })
    }

    // Call the function to fetch applications after the component is mounted
    componentDidMount() {
        this.getAllAplicationsForStudent();
    }

    render() {
        // Redirect to login page if not logged in or if the user is not a student
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_STUDENT') {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className='container'>

                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Joburile la care am aplicat</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            // Check if the student has applied to any jobs
                            this.state.applications.map(res => (res)).length > 0
                                ? <div>
                                    {/* Display the list of applied jobs in a table */}
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>Companie</th>
                                                <th>Job</th>
                                                <th>Data</th>
                                                <th>Actiuni</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                // Map through the applications and display job details
                                                this.state.applications.map(res => (
                                                    <tr>
                                                        <td>{res.job.company.name}</td>
                                                        <td>{res.job.title}</td>
                                                        <td>{res.date}</td>
                                                        <td>
                                                            {/* Link to view more details about the job */}
                                                            <Link to={`/jobs/${res.job.id}`}>
                                                                <Button className='read-more-btn'>Citeste mai mult</Button>
                                                            </Link></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table></div>
                                :
                                // Display message if no applications exist
                                <div>
                                    <Card className='card-body-empty'>
                                        <CardBody className='text-center '>
                                            <CardText>Nu ai aplicat la niciun job pana acum.</CardText>
                                        </CardBody>
                                    </Card>
                                </div>
                        }
                    </CardBody>
                </Card>
            </div>
        );
    }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
    const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
    return { loggedIn, userLogin };
};

// Connects the component to the Redux store
export default connect(mapStateToProps)(MyApplications);
