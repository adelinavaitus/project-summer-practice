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
            file: {},   // File to be uploaded
            percent: 0, // Upload progress
            downloadUrl: '',     // URL of the uploaded file
            user: {},    // Logged-in user data
            document: {},   // Document data for the user
            isModalOpen: false,   // Modal visibility state
        }

        this.handleChange = this.handleChange.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    // Handles file input change
    handleChange(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    // Fetches student data and their document info
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

    // Calls getStudentLoggedIn method when the component mounts
    componentDidMount() {
        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            this.getStudentLoggedIn();
        }
    }

    // Toggles the modal state
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }


    // Handles the file upload to Firebase and updates the document data
    handleUpload() {
        // Create a reference to the file location in Firebase storage
        const storageRef = ref(storage, `/files/${this.state.file.name}`);

        // Start uploading the file using uploadBytesResumable
        const uploadTask = uploadBytesResumable(storageRef, this.state.file);

        // Monitor the upload progress
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Calculate the upload progress percentage
                const percent2 = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // Update the progress percentage in the state
                this.setState({
                    percent: percent2
                })
            },
            (err) => console.log(err),    // Handle any upload errors
            () => {
                // Once upload is completed, retrieve the download URL of the file
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // Update the state with the download URL
                    this.setState({
                        downloadUrl: url
                    })

                    // Prepare the data to be sent to the backend
                    const data = {
                        id: this.state.document.id,  // Document ID
                        name: this.state.file.name,  // File name
                        downloadUrl: this.state.downloadUrl,    // URL of the uploaded file
                        nameDocSupervisor: '',   // Supervisor's document name (initially empty)
                        downloadUrlFinal: '',    // Final document URL (initially empty)
                        feedback: '',    // Feedback (initially empty)
                    }

                    // Send a PUT request to update the document in the backend
                    const urlpost = `http://localhost:8080/documents`;
                    axios.put(urlpost, data)
                        .then(response => {
                            console.log(response.data)
                            // Reload the page after the document is successfully updated
                            window.location.reload();
                        })
                        .catch(err => {
                            console.log(err);    // Log any errors during the PUT request
                        })
                });
            }
        );
    }

    render() {
        // Redirects if user is not logged in or not a student
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
                            // Check if the document is null or the URL is not available
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
                                                        // Display the status of the document
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
                                                // If the document is pending or rejected, allow re-upload
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
                                    {
                                        // Display supervisor's final document and feedback if approved
                                        this.state.document.status === "APPROVED"
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
                                        // Show feedback if the document is rejected
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

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
    const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
    return { loggedIn, userLogin };
};

// Connects the component to the Redux store
export default connect(mapStateToProps)(UploadDoc);
