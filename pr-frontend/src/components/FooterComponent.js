import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

class Footer extends Component {

    render() {
        let myAccount;
        if (this.props.loggedIn) {
            // Check if the user is logged in and conditionally render the "My Account" link
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
                                {/* Links for About Us, My Account, and Contact */}
                                <li><Link to='/aboutus'>Despre noi</Link></li>
                                {myAccount}
                                <li><Link to='/contactus'>Contact</Link></li>
                            </ul>
                        </div>
                        <div className="col-7 col-sm-3">
                            <h5>Contact</h5>
                            <address>
                                {/* Contact address and information */}
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
                                {/* Social media buttons */}
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
                            {/* Footer copyright */}
                            <p>© Copyright 2022 Summer Practice </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
    return { loggedIn };
}

// Connects the component to the Redux store
export default connect(mapStateToProps)(Footer);