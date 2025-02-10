import React, { Component } from 'react';
import { Card, CardTitle, CardBody, CardText, CardHeader, CardImg, CardImgOverlay, Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Redirect to home if the user is already logged in
        if (this.props.loggedIn) {
            return (
                <Redirect to="home" />
            );
        }

        return (
            <div className='container card-register'>
                <Card className='text-center' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Creeaza un cont nou</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <div className="row align-items-start">
                        </div>
                        <div className="row align-items-start">
                            <div className="col-12 col-md m-1 card-student">
                                {/* Card for Student registration */}
                                <CardImg src='../assets/student.png' alt="Student presentation image" className='image' />
                                <div className='middle'>
                                    <Link to="/register/student">
                                        <Button className='button-register'>Creeaza cont student</Button>
                                    </Link>
                                </div>
                                <CardText>Student</CardText>
                            </div>
                            <div className="col-12 col-md-1 m-1">
                            </div>
                            <div className="col-12 col-md m-1 card-companie" >
                                {/* Card for Company registration */}
                                <CardImg src='../assets/company.png' alt="Student presentation image" className='image' />
                                <div className='middle'>
                                    <Link to="/register/company">
                                        <Button className='button-register'>Creeaza cont companie</Button>
                                    </Link>
                                </div>
                                <CardText>Companie</CardText>
                            </div>
                        </div>

                    </CardBody>
                    <CardBody>
                        <CardHeader>
                            <div className="col-12 col-md m-1">
                                {/* Link to login page if the user already has an account */}
                                <h6>Ai deja cont? &nbsp;
                                    <Link className='login-link' to="/login">Login</Link>
                                </h6>
                            </div>
                        </CardHeader>
                    </CardBody>
                </Card>

            </div>
        );
    }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Tracks if the user is logged in
    return { loggedIn };
}

// Connect to Redux store
export default connect(mapStateToProps)(Register);
