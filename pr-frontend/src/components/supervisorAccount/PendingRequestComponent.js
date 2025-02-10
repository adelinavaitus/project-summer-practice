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

        // Initializing the component state
        this.state = {
            students: [],              // List of students
            supervisor: {},            // Supervisor information
            faculty: {},               // Faculty information
            isModalApprovedOpen: false, // Modal state for approved request
            isModalRejectedOpen: false, // Modal state for rejected request
            currentStudent: {},        // Information of the student whose request is being handled
            file: {},                  // File data for upload
            percent: 0,                // Upload progress percentage
            downloadUrl: '',           // URL for the uploaded file
        }

        // Binding modal toggle functions to the current context
        this.toggleModalApproved = this.toggleModalApproved.bind(this);
        this.toggleModalRejected = this.toggleModalRejected.bind(this);
    }

    // Function to toggle the approved modal and set the current student
    toggleModalApproved(student) {
        this.setState({
            isModalApprovedOpen: !this.state.isModalApprovedOpen,
            currentStudent: student
        })
    }

    // Function to toggle the rejected modal and set the current student
    toggleModalRejected(student) {
        this.setState({
            isModalRejectedOpen: !this.state.isModalRejectedOpen,
            currentStudent: student
        })
    }

    // Handling the file upload for an approved request
    handleUploadApproved(values) {
        const storageRef = ref(storage, `/files/${this.state.file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, this.state.file);

        // Tracking upload progress
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
                // After successful upload, get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    this.setState({
                        downloadUrl: url
                    })

                    // Prepare data for the API request
                    const data = {
                        id: this.state.currentStudent.document.id,
                        name: '',
                        downloadUrl: '',
                        nameDocSupervisor: this.state.file.name,
                        downloadUrlFinal: this.state.downloadUrl,
                        feedback: values.feedback
                    }

                    // Sending the approved document data
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

    // Handling the file upload for a rejected request
    handleUploadRejected(values) {
        // Prepare data for the API request
        const data = {
            id: this.state.currentStudent.document.id,
            name: '',
            downloadUrl: '',
            nameDocSupervisor: '',
            downloadUrlFinal: '',
            feedback: values.feedback
        }

        // Sending the rejected document data
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

    // Function to handle file input change
    handleChange(event) {
        this.setState({
            file: event.target.files[0]
        });
    }

    // Function to fetch students assigned to the current supervisor
    getStudents() {
        axios.get(`http://localhost:8080/supervisors/${this.props.userLogin.id}`)
            .then(result => {
                return result.data
            }).then(result => {
                this.setState({
                    supervisor: result,
                    faculty: result.faculty
                })

                // Fetch students from the same faculty
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

    // Fetch students on component mount
    componentDidMount() {
        this.getStudents();
    }

    render() {
        // Redirect to login if the user is not logged in or does not have supervisor role
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
                        {/* Check if there are students with pending requests */}
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
                                            {/* Map over the students list */}
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
                                                                                    {/* Show buttons to approve or reject */}
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

                {/* Modal for approving requests */}
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

                {/* Modal for rejecting requests */}
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

// Map state to props for Redux
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
    const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
    return { loggedIn, userLogin };
};

// Connects the component to the Redux store
export default connect(mapStateToProps)(HistoryRequest);
