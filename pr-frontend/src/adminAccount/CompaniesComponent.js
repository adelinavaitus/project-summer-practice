import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';


class Companies extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
        }
    }

    getCompanies() {
        axios.get(`http://localhost:8080/companies`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    companies: result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getCompanies();
    }


    render() {
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_ADMIN') {
            return (
                <Redirect to="/login" />
            );
        }

        return (
            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Companii</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            this.state.companies.map(res => (res)).length > 0
                                ? <div>
                                    <table class="table">
                                        <thead>
                                            <th>Nume</th>
                                            <th>Email</th>
                                        </thead>
                                        {
                                            this.state.companies.map(company => (
                                                <tbody>
                                                    <td>{company.name}</td>
                                                    <td><a href={`mailto:${company.email}`}>{company.email}</a></td>
                                                </tbody>
                                            ))
                                        }
                                    </table>
                                </div>
                                : <div>Nu exista companii inregistrate.</div>
                        }
                    </CardBody>
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

export default connect(mapStateToProps)(Companies);
