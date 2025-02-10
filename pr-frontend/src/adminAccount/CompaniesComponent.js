import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';


class Companies extends Component {
    constructor(props) {
        super(props);

        // Initialize state to hold the list of companies
        this.state = {
            companies: [],
        }
    }

    // Method to fetch the list of companies from the backend API
    getCompanies() {
        axios.get(`http://localhost:8080/companies`)
            .then(result => {
                return result.data
            }).then(result => {
                // Update state with the fetched companies
                this.setState({
                    companies: result,
                })
            })
            .catch(err => {
                // Log any error that occurs during the API call
                console.log(err);
            })
    }

    // Lifecycle method to fetch companies when the component is mounted
    componentDidMount() {
        this.getCompanies();
    }

    render() {
        // Redirect the user to the login page if they are not logged in or not an admin
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_ADMIN') {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        {/* Title for the companies card */}
                        <CardTitle tag="h4">Companii</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            this.state.companies.map(res => (res)).length > 0
                                ? <div>
                                    <table class="table">
                                        <thead>
                                            {/* Table headers for displaying company details */}
                                            <th>Nume</th>
                                            <th>Email</th>
                                        </thead>
                                        {
                                            // Map over the companies and create table rows for each
                                            this.state.companies.map(company => (
                                                <tbody>
                                                    <td>{company.name}</td>
                                                    {/* Link to send an email to the company's email address */}
                                                    <td><a href={`mailto:${company.email}`}>{company.email}</a></td>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                                // Display a fallback message if no companies are found
                                : <div>Nu exista companii inregistrate.</div>
                        }
                    </CardBody>
                </Card>
            </div>
        );
    }
}

// Map the Redux state to component props to check user authentication and role
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};

// Connect the component to the Redux store
export default connect(mapStateToProps)(Companies);
