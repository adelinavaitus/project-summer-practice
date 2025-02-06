import React, { Component } from 'react';
import storage from '../../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { connect } from "react-redux";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Card, CardBody, CardHeader, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { LocalForm, } from 'react-redux-form';


class UploadDoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            percent: 0,
            downloadUrl: '',
            user: {},
            document: {},
            isModalOpen: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleChange(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    getStudentLoggedIn() {
        axios.get(`http://localhost:8080/students/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    user: result,
                    document: result.document
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            this.getStudentLoggedIn();
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleUpload() {
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
                        id: this.state.document.id,
                        name: this.state.file.name,
                        downloadUrl: this.state.downloadUrl,
                        nameDocSupervisor: '',
                        downloadUrlFinal: '',
                        feedback: '',
                    }

                    const urlpost = `http://localhost:8080/documents`;
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
                        <CardTitle tag="h4">Incarcare documente practica</CardTitle>
                    </CardHeader>
                    <CardBody className='text-left'>
                        {
                            this.state.document === null || this.state.document.downloadUrl === null
                                ? <div>
                                    <Row>
                                        <Col md={5} className="text-right">
                                            <input type="file" onChange={(e) => this.handleChange(e)} />
                                        </Col>
                                        <Col md={3}>
                                            <Button className="upload-file-btn" onClick={() => this.handleUpload()}>Incarca</Button>
                                        </Col>
                                        <Col md={4}>
                                            <p>Progres: {this.state.percent} %</p>
                                        </Col>
                                    </Row>


                                </div>
                                : <div>
                                    <table className='table'>
                                        <tbody>
                                            <tr>
                                                <td className="text-right">Document: </td>
                                                <td><a href={this.state.document.downloadUrl}>{this.state.document.name}</a></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">Ultima actualizare:</td>
                                                <td>{this.state.document.date}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className="text-right">Status:</td>
                                                <td>
                                                    {
                                                        this.state.document.status === "PENDING"
                                                            ? <div><b>In asteptare</b></div>
                                                            : this.state.document.status === "REJECTED"
                                                                ? <div className='response-rejected'><b>Respins</b></div>
                                                                : this.state.document.status === "APPROVED"
                                                                    ? <div className='response-approved'><b>Aprobat</b></div>
                                                                    : <div></div>
                                                    }
                                                </td>
                                                <td></td>
                                            </tr>

                                            {
                                                this.state.document.status === "PENDING" || this.state.document.status === "REJECTED"
                                                    ?
                                                    <tr className='reload-doc'>
                                                        <td></td>
                                                        <td> <Button onClick={() => this.toggleModal()}>Reincarca document</Button></td>
                                                        <td></td>
                                                    </tr>

                                                    : <div></div>
                                            }
                                        </tbody>
                                    </table>
                                    {this.state.document.status === "APPROVED"
                                        ? <div className='supervisor-response-div'>
                                            <table className='table'>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-right">Document final: </td>
                                                        <td><a href={this.state.document.downloadUrlFinal}>{this.state.document.nameDocSupervisor}</a></td>
                                                        <td></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-right">Feedback coordonator:</td>
                                                        <td> {this.state.document.feedback}</td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        : <div></div>
                                    }

                                    {
                                        this.state.document.status === "REJECTED"
                                            ? <div className='supervisor-response-div'>

                                                <Row >
                                                    <Col md={3} className="text-right">Feedback coordonator: </Col>
                                                    <Col md={9}> {this.state.document.feedback}</Col>
                                                </Row>
                                            </div>
                                            : <div></div>
                                    }

                                </div>
                        }

                    </CardBody>
                </Card>
                <Modal size="lg" isOpen={this.state.isModalOpen}  >
                    <ModalHeader toggle={this.toggleModal}>Reincarcare document: </ModalHeader>
                    <LocalForm onSubmit={() => this.handleUpload()}>
                        <ModalBody>
                            <Row className='form-group'>
                                <Col md={5} className="text-right">
                                    <input type="file" onChange={(e) => this.handleChange(e)} />
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleModal} className="btn btn-primary mr-auto close-button">Renunță</Button>
                            <p>Progres: {this.state.percent} %</p>
                            <Button className="upload-file-btn" onClick={() => this.handleUpload()}>Incarca</Button>
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

export default connect(mapStateToProps)(UploadDoc);
                 