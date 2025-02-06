import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, Col, ModalBody, ModalHeader, ModalFooter,Label, Row, CardTitle, Modal, Button } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';


class Info extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            faculty: {},
            isModalOpen: false,
            isModalAddNewInfoOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.toggleModalAddNewInfo = this.toggleModalAddNewInfo.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    toggleModalAddNewInfo(){
        this.setState({
            isModalAddNewInfoOpen : !this.state.isModalAddNewInfoOpen
        });
    }

    handleSubmit(values) {
        var description = values.info   
        description = description.replace(/(?:\r\n|\r|\n)/g, " ");
        const url = `http://localhost:8080/faculties/${this.state.faculty.id}/description`;
        axios.put(url, { description })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModal();
    }


    handleSubmitNewInfo(values){
        var description = values.info
        description = description.replace(/(?:\r\n|\r|\n)/g, " ");
        const url = `http://localhost:8080/faculties/${this.state.faculty.id}/description`;
        axios.put(url, { description })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleModalAddNewInfo();
    }



    getStudentLoggedIn() {
        axios.get(`http://localhost:8080/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    user: result,
                    faculty: result.faculty
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    getSupervisorLoggedIn() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    user: result,
                    faculty: result.faculty
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            this.getStudentLoggedIn();
        } else if (this.props.userLogin.roles === "ROLE_SUPERVISOR") {
            this.getSupervisorLoggedIn();
        }
    }

    render() {
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_STUDENT' && this.props.userLogin.roles !== 'ROLE_SUPERVISOR') {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>
                {
                    this.props.userLogin.roles === 'ROLE_STUDENT'
                        ? <div>
                            <Card className='text-center principalCard' body outline>
                                <CardHeader>
                                    <CardTitle tag="h4">Informatii stagiu de practica</CardTitle>
                                </CardHeader>
                                <CardBody className='text-left'>

                                    {
                                        this.state.faculty.description === null || this.state.faculty.description === ''
                                            ? <div className='text-center'>Nu sunt disponibile informatii. Reveniti mai tarziu.</div>
                                            : <div>
                                                {this.state.faculty.description}
                                            </div>
                                    }
                                </CardBody>
                            </Card>
                        </div>
                        : this.props.userLogin.roles === 'ROLE_SUPERVISOR'
                            ? <div>
                                <Card className='text-center principalCard' body outline>
                                    <CardHeader>
                                        <CardTitle tag="h4">Informatii stagiu de practica</CardTitle>
                                    </CardHeader>
                                    {
                                        this.state.faculty.description === null || this.state.faculty.description === ""
                                            ? <div className='add-info-div'>
                                                <Row onClick={this.toggleModalAddNewInfo}>
                                                    <Button outline color="secondary" className="btn add-info-btn" block>Adauga informatii despre perioada de practica.</Button>
                                                </Row>
                                            </div>
                                            : <div>
                                                <CardBody className='text-left'>
                                                    <Row className="cv-component" onClick={this.toggleModal}>
                                                        <Col md={11}>
                                                            <div id="mydescription">{this.state.faculty.description}</div>
                                                        </Col>
                                                        <Col className="row flex-column-reverse">
                                                            <i md={1} className="fa fa-edit fa-lg edit-icon-description push-menu"></i>
                                                        </Col>
                                                    </Row>
                                                </CardBody>
                                            </div>
                                    }
                                </Card>

                            </div>
                            : <div></div>
                }

                <Modal isOpen={this.state.isModalOpen}  >
                    <ModalHeader toggle={this.toggleModal}>Modificare descrierea mea: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={12}>
                                    <Control.textarea model=".info"
                                        id="info"
                                        name="info"
                                        defaultValue={this.state.faculty.description}
                                        rows="12" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModal} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                <Modal size="lg" isOpen={this.state.isModalAddNewInfoOpen}  >
                    <ModalHeader toggle={this.toggleModalAddNewInfo}>Adaugare educatie: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleSubmitNewInfo(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3}>
                                    <div className="text-right">
                                        <Label htmlFor="info">Informatii despre perioada de practica: </Label>
                                    </div>
                                </Col>
                                <Col md={9}>
                                <Control.textarea model=".info"
                                        id="info"
                                        name="info"
                                        rows="12" className='form-control'
                                    />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalAddNewInfo} className="btn btn-primary mr-auto close-button">Renunță</Button>
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

export default connect(mapStateToProps)(Info);
