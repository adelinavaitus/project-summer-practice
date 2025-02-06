import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, CardTitle, CardBody, Button, CardText, Modal, ModalHeader, Row, Col, CardHeader, Label, CardFooter, ModalBody, ModalFooter } from 'reactstrap';
import { Control, LocalForm } from 'react-redux-form';


class JobDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: {},
            company: {},
            isModalEditOpen: false,
            isModalAfterApplicationOpen: false,
            applicationsByStudentId: [],
            applicationsJobsByStudentId: [],
            applybool: false,
            applicationsByJobId: []
        }

        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleModalAfterApplication = this.toggleModalAfterApplication.bind(this);
    }

    toggleEditModal() {
        this.setState({
            isModalEditOpen: !this.state.isModalEditOpen
        });
    }

    toggleModalAfterApplication() {
        this.setState({
            isModalAfterApplicationOpen: !this.state.isModalAfterApplicationOpen
        });
    }

    handleDisable() {
        var jobid = this.state.job.id;
        const url = `http://localhost:8080/job-disable`;
        axios.put(url, { jobid })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleApplication() {
        const data = {
            id: -1,
            jobId: this.state.job.id,
            studentId: this.props.userLogin.id
        }
        const url = `http://localhost:8080/applications`;
        axios.post(url, data)
            .then(response => {
                console.log(response.data)
                this.toggleModalAfterApplication();
            })
            .catch(err => {
                console.log(err);
            })

    }

    handleEnable() {
        var jobid = this.state.job.id;
        const url = `http://localhost:8080/job-enable`;
        axios.put(url, { jobid })
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log("http://localhost:3000/myapplications");
            })
    }

    handleCloseModal() {
        this.toggleModalAfterApplication();
        window.location.assign("http://localhost:3000/jobs");

    }

    handleEdit(values) {
        const data = {
            id: this.state.job.id,
            companyId: this.state.company.id,
            jobType: values.jobtype === undefined ? this.state.job.jobType : values.jobtype,
            description: values.description,
            title: values.title
        }
        const url = `http://localhost:8080/jobs`;
        axios.put(url, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
        this.toggleEditModal();
    }

    getJobById() {
        axios.get(`http://localhost:8080/jobs/${this.props.match.params.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    job: result,
                    company: result.company
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    getAllAplicationByStudentId() {
        axios.get(`http://localhost:8080/applications/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    applicationsByStudentId: result,
                })
                result.map((res) => this.setState(prevState => ({
                    applicationsJobsByStudentId: [...prevState.applicationsJobsByStudentId, res.job.id]
                })))
            })
            .catch(err => {
                console.log(err);
            })
    }

    getAllAplicationByJobId() {
        axios.get(`http://localhost:8080/applications/jobs/${this.props.match.params.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    applicationsByJobId: result,
                })

            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.getJobById();

        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            this.getAllAplicationByStudentId();
        }

        if (this.props.userLogin.roles === "ROLE_COMPANY") {
            this.getAllAplicationByJobId();
        }
    }


    render() {
        if (!this.props.loggedIn || (this.props.userLogin.roles !== 'ROLE_STUDENT' && this.props.userLogin.roles !== 'ROLE_COMPANY')) {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>
                <div className='div-button-back'>
                    <Button className='back-button' onClick={(() => this.props.history.goBack())}><i class="fa fa-arrow-left" />	&nbsp;Inapoi</Button>
                </div>
                <Card className='card-job-detail'>
                    <CardHeader>
                        <CardTitle tag="h4">{this.state.job.title}</CardTitle>
                        <CardText>{this.state.company.name}
                            <br />{this.state.job.date}</CardText>
                    </CardHeader>
                    <CardBody>
                        <CardTitle tag="h5">Descrierea jobului: </CardTitle>
                        <CardText>{this.state.job.description}</CardText>
                        {
                            this.state.company.description
                                ? <div><CardTitle tag="h5">Descrierea companiei: </CardTitle>
                                    <CardText>{this.state.company.description}</CardText></div>
                                : <div></div>
                        }
                        <CardText><b>Tipul jobului:</b> {this.state.job.jobType}</CardText>
                        <CardText><b>Marimea companiei:</b> {this.state.company.size} angajati</CardText>
                    </CardBody>
                    <CardFooter>
                        <div className='row flex-row-reverse'>
                            {
                                this.props.userLogin.roles === "ROLE_STUDENT"
                                    ? <div>
                                        {
                                            this.state.applicationsJobsByStudentId.filter((job) => job === this.state.job.id).length === 0
                                                ? <Button className='apply-button' onClick={() => this.handleApplication()} >Aplica</Button>
                                                : <Button className='apply-button' disabled><i class=" fa fa-solid fa-check" />Aplicat</Button>
                                        }
                                    </div>
                                    : this.props.userLogin.roles === "ROLE_COMPANY"
                                        ? <div>
                                            {
                                                this.state.job.available === true
                                                    ? <Button className='disable-button' onClick={() => this.handleDisable()}>Dezactiveaza job</Button>
                                                    : <Button className='enable-button' onClick={() => this.handleEnable()}>Reactiveaza job</Button>
                                            }
                                            <Button className='edit-button' onClick={this.toggleEditModal}>Editeaza</Button>
                                        </div>
                                        : <div> </div>
                            }
                        </div>
                    </CardFooter>
                </Card>

                {
                    this.props.userLogin.roles === "ROLE_COMPANY"
                        ? <Card className='card-job-detail'>
                            <CardHeader>
                                <CardTitle tag="h4">Aplicanti</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Nume student</th>
                                            <th>Facultate</th>
                                            <th>Data</th>
                                            <th>Actiuni</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            this.state.applicationsByJobId.map(res => (
                                                <tr>
                                                    <td>{res.student.firstName} {res.student.lastName}</td>
                                                    <td>{res.student.faculty.name}</td>
                                                    <td>{res.date}</td>
                                                    <td>
                                                        <Link to={`/students/${res.student.id}`}>
                                                            <Button className='read-more-btn'>Vezi CV</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                        : <div></div>
                }


                <Modal isOpen={this.state.isModalEditOpen} size="lg">

                    <ModalHeader toggle={this.toggleEditModal}>Modificare job: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleEdit(values)}>
                        <ModalBody>
                            <Row className='form-group text-right'>

                                <Label md={2} htmlFor="title">Titlul jobului: </Label>
                                <Col md={10}>
                                    <Control.text model=".title"
                                        id="title"
                                        name="title"
                                        defaultValue={this.state.job.title}
                                        className='form-control'
                                    />
                                </Col>

                            </Row>

                            <Row className='form-group'>
                                <Label md={2} htmlFor="jobtype">Tipul jobului: </Label>
                                <Col md={10}>
                                    <Control.select model=".jobtype" id="jobtype" name="jobtype"
                                        className='form-control'
                                    >

                                        <option value="" disabled selected>
                                            {this.state.job.jobType}
                                        </option>
                                        <option>part-time</option>
                                        <option>full-time</option>
                                        <option>internship</option>

                                    </Control.select>
                                </Col>

                            </Row>

                            <Row className='form-group'>
                                <Label md={2} htmlFor="description">Descriere job: </Label>
                                <Col md={10}>
                                    <Control.textarea model=".description"
                                        id="description"
                                        name="description"
                                        defaultValue={this.state.job.description}
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleEditModal} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                <Modal isOpen={this.state.isModalAfterApplicationOpen} >
                    <ModalHeader > </ModalHeader>
                    <ModalBody className='text-center'>Ai aplicat cu succes!</ModalBody>
                    <ModalFooter className="justify-content-center">
                        <Button onClick={() => this.handleCloseModal()} className="btn btn-primary ok-button">OK</Button>
                    </ModalFooter>
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


export default connect(mapStateToProps)(JobDetails);

