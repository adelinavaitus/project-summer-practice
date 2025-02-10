import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Col, Card, CardBody, CardHeader, CardTitle, Row, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import axios from 'axios';

class MyProfileCompany extends Component {
    constructor(props) {
        super(props);

        // Initialize the component's state to manage company data and modal visibility
        this.state = {
            company: {},    // Object to hold the company details
            isModalNameOpen: false, // Boolean to manage the visibility of the "Edit Name" modal
            isModalDescriptionOpen: false,   // Boolean for the "Edit Description" modal
            isModalSizeOpen: false, // Boolean for the "Edit Company Size" modal
        }
        // Bind modal toggling methods to the component
        this.toggleModalCompanyName = this.toggleModalCompanyName.bind(this);
        this.toggleModalDescription = this.toggleModalDescription.bind(this);
        this.toggleModalSize = this.toggleModalSize.bind(this);
    }

    // Toggle the visibility of the "Edit Name" modal
    toggleModalCompanyName() {
        this.setState({
            isModalNameOpen: !this.state.isModalNameOpen
        });
    }

    // Toggle the visibility of the "Edit Description" modal
    toggleModalDescription() {
        this.setState({
            isModalDescriptionOpen: !this.state.isModalDescriptionOpen
        });
    }

    // Toggle the visibility of the "Edit Company Size" modal
    toggleModalSize() {
        this.setState({
            isModalSizeOpen: !this.state.isModalSizeOpen
        });
    }

    // Fetch company data from the backend using the logged-in user's ID
    getCompanyById() {
        const url = `http://localhost:8080/companies/${this.props.userLogin.id}`;
        axios.get(url)
            .then(result => {
                return result.data  // Extract company data from the API response
            }).then(res => {
                this.setState({
                    company: res,   // Update the state with company data
                })
            })
            .catch(err => {
                console.log(err);   // Log errors in case of a failed request
            })
    }

    // Fetch the company data when the component mounts
    componentDidMount() {
        this.getCompanyById();
    }

    // Handle updating the company name via the backend API
    handleName(values) {
        var cname = values.cname;   // Extract the company name from form values
        const url = `http://localhost:8080/companies/${this.state.company.id}/name`;
        axios.put(url, { cname })   // Send PUT request to update the name
            .then(response => {
                console.log(response.data)  // Log the response data
                window.location.reload();   // Reload the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Log any errors
            })
        this.toggleModalCompanyName();  // Close the modal after submission
    }

    // Handle updating the company description via the backend API
    handleDescription(values) {
        var description = values.cdescription;  // Extract the description from form values
        const url = `http://localhost:8080/companies/${this.state.company.id}/description`;
        axios.put(url, { description }) // Send PUT request to update the description
            .then(response => {
                console.log(response.data)  // Log the response data
                window.location.reload();   // Reload the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Log any errors
            })
        this.toggleModalDescription();  // Close the modal after submission
    }

    // Handle updating the company size via the backend API
    handleCompanySize(values) {
        var csize = values.csize;   // Extract the company size from form values
        const url = `http://localhost:8080/companies/${this.state.company.id}/size`;
        axios.put(url, { csize })   // Send PUT request to update the company size
            .then(response => {
                console.log(response.data)  // Log the response data
                window.location.reload();   // Reload the page to reflect the changes
            })
            .catch(err => {
                console.log(err);   // Log any errors
            })
        this.toggleModalSize(); // Close the modal after submission
    }


    render() {
        // Redirect to the login page if the user is not logged in or does not have the "ROLE_COMPANY" role
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_COMPANY') {
            return (
                <Redirect to="/login" />
            );
        }

        // Render the company profile page
        return (
            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <div className="row align-items-start">
                        <Col sm={12} lg={12}>
                            <CardHeader>
                                <CardTitle tag="h4">Profilul companiei</CardTitle>
                            </CardHeader>
                            <CardBody className='text-left' >
                                {/* Display company name with an option to edit */}
                                <Row className='row-myprofile' onClick={this.toggleModalCompanyName}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="cname">Nume companie: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="cname">{this.state.company.name}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* Display email address (non-editable) */}
                                <Row className='row-myprofile-blocked'>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="email">Email: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="mydescription">{this.props.userLogin.email}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* Display company description with an option to edit */}
                                <Row className='row-myprofile' onClick={this.toggleModalDescription}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="description">Descriere: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="description">{this.state.company.description}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                                <hr />
                                {/* Display company size with an option to edit */}
                                <Row className='row-myprofile' onClick={this.toggleModalSize}>
                                    <Col md={4}>
                                        <div className="text-right">
                                            <Label htmlFor="description">Marime companie: </Label>
                                        </div>
                                    </Col>
                                    <Col md={7}>
                                        <div id="description">{this.state.company.size}</div>
                                    </Col>
                                    <Col className="row flex-column-reverse">
                                        <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Col>
                    </div>
                </Card>
                {/* Modal for editing company name */}
                <Modal isOpen={this.state.isModalNameOpen}  >
                    <ModalHeader toggle={this.toggleModalCompanyName}>Modificare nume companie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleName(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="cname">Nume companie: </Label>
                                    <Control.text model=".cname"
                                        id="cname"
                                        name="cname"
                                        defaultValue={this.state.company.name}
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalCompanyName} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
                {/* Modal for editing company description */}
                <Modal isOpen={this.state.isModalDescriptionOpen}  >
                    <ModalHeader toggle={this.toggleModalDescription}>Modificare descriere: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleDescription(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="cdescription">Descrierea: </Label>
                                    <Control.textarea model=".cdescription"
                                        id="cdescription"
                                        name="cdescription"
                                        defaultValue={this.state.company.description}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalDescription} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
                {/* Modal for editing company size */}
                <Modal isOpen={this.state.isModalSizeOpen}  >
                    <ModalHeader toggle={this.toggleModalSize}>Modificare dimensiune companie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleCompanySize(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Label htmlFor="csize">Dimensiune companie: </Label>
                                    <Col md={9}>
                                        <Control.select model=".csize" id="csize" name="csize"
                                            className='form-control'
                                        >
                                            <option value="" disabled selected>Selecteaza marimea companiei</option>
                                            <option>1-100</option>
                                            <option>101-200</option>
                                            <option>201-500</option>
                                            <option>501-1000</option>
                                            <option>1001-5000</option>
                                            <option> &#8805;5001</option>


                                        </Control.select>
                                    </Col>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalSize} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>
            </div>
        );
    }

}
// Map Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;  // Check if the user is logged in
    const userLogin = state.receivedUser.userLogin; // Retrieve user login details
    return { loggedIn, userLogin };
};

// Connect the component to Redux
export default connect(mapStateToProps)(MyProfileCompany);
