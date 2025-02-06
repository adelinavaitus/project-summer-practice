import React, { Component } from 'react';
import { connect } from "react-redux";
import { Card, CardTitle, CardHeader, CardBody, CardText, CardFooter, Button } from 'reactstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


class MyApplications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            applications: [],
        }

    }

    getAllAplicationsForStudent() {
        axios.get(`http://localhost:8080/applications/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    applications: result,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getAllAplicationsForStudent();
    }


    render() {
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
                            this.state.applications.map(res => (res)).length > 0
                                ? <div> <table class="table">
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
                                            this.state.applications.map(res => (
                                                <tr>
                                                    <td>{res.job.company.name}</td>
                                                    <td>{res.job.title}</td>
                                                    <td>{res.date}</td>
                                                    <td><Link to={`/jobs/${res.job.id}`}>
                                                        <Button className='read-more-btn'>Citeste mai mult</Button>
                                                    </Link></td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table></div>
                                :
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


const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};

export default connect(mapStateToProps)(MyApplications);
