import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { Control, LocalForm, } from 'react-redux-form';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from '../../firebase/firebaseConfig';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Button, Modal, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';



class PendingRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            students: [],
            supervisor: {},
            faculty: {},
            isModalApprovedOpen: false,
            isModalRejectedOpen: false,
            currentStudent: {},
            file: {},
            percent: 0,
            downloadUrl: '',
        }

        this.toggleModalApproved = this.toggleModalApproved.bind(this);
        this.toggleModalRejected = this.toggleModalRejected.bind(this);
    }

    toggleModalApproved(student) {
        this.setState({
            isModalApprovedOpen: !this.state.isModalApprovedOpen,
            currentStudent: student
        })
    }

    toggleModalRejected(student) {
        this.setState({
            isModalRejectedOpen: !this.state.isModalRejectedOpen,
            currentStudent: student
        })
    }

    handleUploadApproved(values) {
        const storageRef = ref(storage, `/files/${this.state.file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, this.state.file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent2 = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                this.setState({
                    percent: percent2
                })
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    this.setState({
                        downloadUrl: url
                    })

                    const data = {
                        id: this.state.currentStudent.document.id,
                        name: '',
                        downloadUrl: '',
                        nameDocSupervisor: this.state.file.name,
                        downloadUrlFinal: this.state.downloadUrl,
                        feedback: values.feedback
                    }

                    const urlpost = `http://localhost:8080/documents/approved`;
                    axios.put(urlpost, data)
                        .then(response => {
                            console.log(response.data)
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log(err);
                        })
                });
            }
        );
    }


    handleUploadRejected(values) {
        const data = {
            id: this.state.currentStudent.document.id,
            name: '',
            downloadUrl: '',
            nameDocSupervisor: '',
            downloadUrlFinal: '',
            feedback: values.feedback
        }

        const urlpost = `http://localhost:8080/documents/rejected`;
        axios.put(urlpost, data)
            .then(response => {
                console.log(response.data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })

    }

    handleChange(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    getStudents() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    supervisor: result,
                    faculty: result.faculty
                })

                axios.get(`http://localhost:8080/students/faculty/${this.state.faculty.id}`)
                    .then(result => {
                        return result.data
                    }).then(result => {
                        this.setState({
                            students: result,
                        })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })

    }


    componentDidMount() {
        this.getStudents();
    }

    render() {
        if (!this.props.loggedIn || this.props.userLogin.roles !== 'ROLE_SUPERVISOR') {
            return (
                <Redirect to="/login" />
            );
        }
        return (
            <div className='container'>
                <Card className='text-center principalCard' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Cereri in asteptare</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            this.state.students.filter(res => ((res.document === null || res.document.status === null))).length < this.state.students.map(res => (res)).length
                                ? <div>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Nume</th>
                                                <th>Grupa</th>
                                                <th>Document</th>
                                                <th>Actiuni</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.students.map(student => (
                                                    <React.Fragment>
                                                        {
                                                            student.document === null || student.document.status === null
                                                                ? <div></div>
                                                                : <React.Fragment>
                                                                    {
                                                                        student.document.status === "PENDING"
                                                                            ? <tr>
                                                                                <td>{student.firstName} {student.lastName}</td>
                                                                                <td>{student.group}</td>
                                                                                <td><a href={student.document.downloadUrl}>{student.document.name}</a></td>
                                                                                <td>
                                                                                    <Button onClick={() => this.toggleModalApproved(student)} className='approve-btn'>Aprobat</Button>
                                                                                    <Button onClick={() => this.toggleModalRejected(student)} className='reject-btn'>Respins</Button>
                                                                                </td>
                                                                            </tr>
                                                                            : <div></div>
                                                                    }
                                                                </React.Fragment>
                                                        }
                                                    </React.Fragment>
                                                ))
                                            }
                                        </tbody>
                                    </table>

                                </div>
                                : <div></div>
                        }
                    </CardBody>
                </Card>
                <Modal size="lg" isOpen={this.state.isModalApprovedOpen}  >
                    <ModalHeader toggle={this.toggleModalApproved}>Feedback: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleUploadApproved(values)}>
                        <ModalBody>
                            <Row className='form-group text-right'>
                                <Col md={3}>
                                    Fisier semnat:
                                </Col>
                                <Col md={9} className="text-left">
                                    <input type="file" onChange={(e) => this.handleChange(e)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3} className="text-right">
                                    <Label>Feedback: </Label>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".feedback"
                                        id="feedback"
                                        name="feedback"
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalApproved} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <p>Progres: {this.state.percent} %</p>
                            <Button type="submit" value="submit" color="primary" className="btn btn-secondary save-button">Salvează</Button>
                        </ModalFooter>
                    </LocalForm>
                </Modal>

                <Modal size="lg" isOpen={this.state.isModalRejectedOpen}  >
                    <ModalHeader toggle={this.toggleModalRejected}>Feedback: </ModalHeader>
                    <LocalForm onSubmit={(values) => this.handleUploadRejected(values)}>
                        <ModalBody>
                            <Row>
                                <Col md={3} className="text-right">
                                    <Label>Feedback: </Label>
                                </Col>
                                <Col md={9}>
                                    <Control.textarea model=".feedback"
                                        id="feedback"
                                        name="feedback"
                                        rows="6" className='form-control'
                                    />
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModalRejected} className="btn btn-primary mr-auto close-button">Renunță</Button>
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

export default connect(mapStateToProps)(PendingRequest);

