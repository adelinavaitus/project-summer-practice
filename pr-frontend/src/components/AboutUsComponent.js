import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Button, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
class AboutUs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <Card className='text-center' body outline>
                    <CardHeader>
                        <CardTitle tag="h4">Despre noi</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>
                            Platforma Summer Practice vine in ajutorul atat studentilor ce se afla in cautarea
                            stagiului de practica perfect, cat si pentru companii care cauta juniori cu forte proaspete direct de pe bancile facultatii.
                        </CardText>
                        <CardText>
                            De asemenea, facultatilor ce isi doresc sa colaboreze cu noi le punem la dispozitie posibilatea de a gestiona actele necesare pentru practica direct din aplicatia noastra, astfel totul se poate face simplu si usor la doar un click distanta!
                        </CardText>
                        <CardText>Hai si tu alaturi de noi!</CardText>
                        <Link to="/register">

                            <Button className='to-register-button'>Creeaza-ti un cont &nbsp;&nbsp;<i class="fa fa-arrow-right" /></Button>
                        </Link>
                        <CardImg src='../assets/aboutus.png' alt="About us page presentation image" className='image' />
                    </CardBody>
                </Card>
            </div>
        );
    }
}


export default AboutUs;