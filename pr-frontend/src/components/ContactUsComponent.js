import React, { Component } from 'react';
import { Card, CardHeader, Col, CardTitle, CardBody, CardText, CardImg } from 'reactstrap';

class ContactUs extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='container'>
                <Card className='text-center contactus-card' body outline>
                    <div className="row align-items-start">
                        <Col sm={12} lg={8}>
                            <CardBody>
                                <CardHeader>
                                    <CardTitle tag='h4'>Contact</CardTitle>
                                </CardHeader>
                                <CardBody className='text-left'>
                                    <CardText>
                                        Adresa : Str Florilor, nr. 65
                                        Bucuresti, SECTOR 3
                                        Romania
                                    </CardText>
                                    <CardText>
                                        Telefon:
                                        <ul className="list-unstyled">
                                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                                            <i className="fa fa-phone"></i>: +40781436543<br />
                                          
                                        </ul>
                                    </CardText>
                                    <CardText>
                                    <i className="fa fa-envelope"></i>: <a href="mailto:summer_practice@univ.net">summer_practice@univ.net</a>
                                    </CardText>
                                </CardBody>
                            </CardBody>
                        </Col>
                        <Col sm={12} lg={4} className="d-none d-lg-block ">
                            <CardImg src='../assets/contactus.png' alt="Contact us page presentation image" className='image' />
                        </Col>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ContactUs;