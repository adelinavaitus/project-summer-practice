import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Button, CardImg } from 'reactstrap';
import { Link } from 'react-router-dom';

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container'>
                <Card className='text-center' body outline>
                    <CardHeader>
                        {/* Card title */}
                        <CardTitle tag="h4">Despre noi</CardTitle>
                    </CardHeader>
                    <CardBody>
                        {/* Description of the platform's purpose */}
                        <CardText>
                            Platforma Summer Practice vine in ajutorul atat studentilor ce se afla in cautarea
                            stagiulu
                        </CardText>
                        {/* Description of the platform's features for faculties */}
                        <CardText>
                            De asemenea, facultatilor ce isi doresc sa colaboreze cu noi le punem la dispozitie posibilatea de a gestiona actele necesare pentru practica direct din aplicatia noastra, astfel totul se poate face simplu si usor la doar un click distanta!
                        </CardText>
                        <CardText>Hai si tu alaturi de noi!</CardText>
                        <Link to="/register">
                            {/* Registration button */}
                            <Button className='to-register-button'>Creeaza-ti un cont &nbsp;&nbsp;<i class="fa fa-arrow-right" /></Button>
                        </Link>
                        {/* Image related to About Us section */}
                        <CardImg src='../assets/aboutus.png' alt="About us page presentation image" className='image' />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default AboutUs;
