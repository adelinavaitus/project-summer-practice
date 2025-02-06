import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Footer extends Component {

    render() {
        let myAccount;
        if (this.props.loggedIn) {
            myAccount = <li><Link to='/home'>Contul meu</Link></li>
        } else {
            myAccount = <li><Link to='/login'>Contul meu</Link></li>
        }
        return (
            <div className="footer">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-4 offset-1 col-sm-3">
                            <h5>Ajutor</h5>
                            <ul className="list-unstyled">
                                <li><Link to='/aboutus'>Despre noi</Link></li>
                                {myAccount}
                                <li><Link to='/contactus'>Contact</Link></li>
                            </ul>
                        </div>
                        <div className="col-7 col-sm-3">
                            <h5>Contact</h5>
                            <address>
                                Str Florilor, nr. 65<br />
                                Bucuresti, SECTOR 3<br />
                                Romania<br />
                                <p>+40781231234 <br />
                                    +40781436543 <br />
                                    <a href="mailto:practica@univ.net">summer_practice@univ.net</a></p>
                            </address>
                        </div>
                        <div className="col-7 col-sm-5">
                            <h5>Social Media</h5>
                            <div >
                                <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>

                            </div>
                        </div>

                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto ">
                            <p>© Copyright 2022 Summer Practice </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    return { loggedIn };
}

export default connect(mapStateToProps)(Footer);