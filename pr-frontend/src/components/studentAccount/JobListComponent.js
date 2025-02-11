import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardBody, Button, CardText, CardHeader, Row, Col } from 'reactstrap';

class JobList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            jobs: [], // Holds the list of jobs
        };
    }

    // Fetches the list of jobs from the server
    componentDidMount() {
        axios.get('http://localhost:8080/jobs')
            .then(response => {
                this.setState({ jobs: response.data }); // Stores jobs in state
            })
            .catch(err => {
                console.error('Error fetching jobs:', err);
            });
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col>
                        <h2 className="text-center my-4">Lista Joburilor</h2>
                    </Col>
                </Row>

                <Row>
                    {/* Map through jobs and render each job as a Card */}
                    {this.state.jobs.map(job => (
                        <Col md={4} key={job.id} className="mb-4">
                            <Card className="job-card">
                                <CardHeader>
                                    <CardTitle tag="h5">{job.title}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <CardText><b>Companie:</b> {job.company.name}</CardText>
                                    <CardText><b>Tip job:</b> {job.jobType}</CardText>
                                    <CardText><b>Data publicării:</b> {job.date}</CardText>
                                    <CardText>
                                        {job.description.length > 100
                                            ? `${job.description.substring(0, 100)}...`
                                            : job.description}
                                    </CardText>
                                    <Link to={`/jobs/${job.id}`}>
                                        <Button className="read-more-button">Citește mai mult</Button>
                                    </Link>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }
}

export default JobList;
