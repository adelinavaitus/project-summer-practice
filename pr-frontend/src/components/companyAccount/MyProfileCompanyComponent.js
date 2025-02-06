import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { Col, Card, CardBody, CardHeader, CardTitle, Row, Label, Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';
import axios from 'axios';


class MyProfileCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {},
            isModalNameOpen: false,
            isModalDescriptionOpen: false,
            isModalSizeOpen: false,
        }
        this.toggleModalCompanyName = this.toggleModalCompanyName.bind(this);
        this.toggleModalDescription = this.toggleModalDescription.bind(this);
        this.toggleModalSize = this.toggleModalSize.bind(this);
    }


    toggleModalCompanyName() {
        this.setState({
            isModalNameOpen: !this.state.isModalNameOpen
        });
    }

    toggleModalDescription() {
        this.setState({
            isModalDescriptionOpen: !this.state.isModalDescriptionOpen
        });
    }

    toggleModalSize() {
        this.setState({
            isModalSizeOpen: !this.state.isModalSizeOpen
        });
    }

    getCompanyById() {
        const url = `http://localhost:8080/companies/${this.props.userLogin.id}`;
        axios.get(url)
            .then(result => {
                return result.data
            }).then(res => {
                this.setState({
                    company: res,
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getCompanyById();
    }


    handleName(values) {
        var cname = values.cname;
        const url = `http://localhost:8080/companies/${this.state.company.id}/name`;
        axios.put(url, { cname })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalCompanyName();
    }

    handleDescription(values) {
        var description = values.cdescription;
        const url = `http://localhost:8080/companies/${this.state.company.id}/description`;
        axios.put(url, { description })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalDescription();
    }

    handleCompanySize(values) {
        var csize = values.csize;
        const url = `http://localhost:8080/companies/${this.state.company.id}/size`;
        axios.put(url, { csize })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalSize();
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
                    <div className="row align-items-start">
                        <Col sm={12} lg={12}>
                            <CardHeader>
                                <CardTitle tag="h4">Profilul companiei</CardTitle>
                            </CardHeader>
                            <CardBody className='text-left' >
                                {/* ---------------------name -------------------------------------- */}
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
                                {/* ---------------------description -------------------------------------- */}
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
                                {/* ---------------------description -------------------------------------- */}
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

const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;
    return { loggedIn, userLogin };
};

export default connect(mapStateToProps)(MyProfileCompany);
