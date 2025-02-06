import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Dropdown, DropdownItem, } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../redux/ActionCreators';
import { connect } from 'react-redux';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    handleLogout = () => {
        localStorage.removeItem("token");
        this.props.logoutUser();
    }


    render() {
        let homeButton;
        if (this.props.loggedIn && (this.props.userLogin.roles === "ROLE_STUDENT" || this.props.userLogin.roles === "ROLE_COMPANY")) {
            if (this.state.isNavOpen) {
                homeButton = <NavLink className="nav-link menu-button" to="/home">Joburi</NavLink>;
            } else {
                homeButton = <NavLink className="nav-link home-menu-button " to="/home">Joburi</NavLink>;
            }
        }

        if (!this.props.loggedIn) {
            return (
                <React.Fragment>
                    <Navbar dark expand="md">
                        <div className='container'>
                            <NavbarBrand className="nav-link menu-button" href="/login">
                                <img src="assets/logo.png" height="100" width="100" alt="Logo Summer Practice" />
                            </NavbarBrand>
                        </div>
                    </Navbar>
                </React.Fragment>
            );
        }

        if (this.props.userLogin.roles === "ROLE_STUDENT") {
            return (
                <React.Fragment>
                    <Navbar dark expand="md" >
                        <div className='container'>
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="nav-link home-menu-button" href="/">
                                <img src="assets/logo.png" height="100" width="100" alt="Logo Summer Practice" />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        {homeButton}
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/myapplications">Aplicarile mele</NavLink>
                                    </NavItem>

                                </Nav>
                                <Nav navbar className='push-menu'>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/info">Informatii practica</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/uploaddoc">Documente</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/addcv">Adauga CV</NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/myprofile">Profil</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/login" onClick={this.handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse >
                        </div>
                    </Navbar>
                </React.Fragment>
            );
        }
        else if (this.props.userLogin.roles === "ROLE_COMPANY") {
            return (
                <React.Fragment>
                    <Navbar dark expand="md" >
                        <div className='container'>
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="nav-link home-menu-button" href="/">
                                <img src="assets/logo.png" height="100" width="100" alt="Logo Summer Practice" />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        {homeButton}
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/addjob">Adauga un job</NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav navbar className='push-menu'>

                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/myprofilecompany">Profil</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/login" onClick={this.handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse >
                        </div>
                    </Navbar>
                </React.Fragment>
            );
        }


        else if (this.props.userLogin.roles === "ROLE_ADMIN") {
            return (
                <React.Fragment>
                    <Navbar dark expand="md" >
                        <div className='container'>
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="nav-link menu-button" href="/">
                                <img src="assets/logo.png" height="100" width="100" alt="Logo Summer Practice" />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/students">Studenti</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/companies">Companii</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/supervisors">Coordonatori</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/addfaculty">Adauga facultate/coordonator</NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav navbar className='push-menu'>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/login" onClick={this.handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse >
                        </div>
                    </Navbar>
                </React.Fragment>
            );

        }
        else if (this.props.userLogin.roles === "ROLE_SUPERVISOR") {
            return (
                <React.Fragment>
                    <Navbar dark expand="md" >
                        <div className='container'>
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="nav-link menu-button" href="/">
                                <img src="assets/logo.png" height="100" width="100" alt="Logo Summer Practice" />
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/pendingreq">Cereri in asteptare</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/history">Istoric cereri</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/students">Studenti</NavLink>
                                    </NavItem>

                                </Nav>
                                <Nav navbar className='push-menu'>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/info">Informatii practica</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/profile-supervisor">Profilul meu</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link menu-button" to="/login" onClick={this.handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse >
                        </div>
                    </Navbar>
                </React.Fragment>
            );
        }

    }
}


const mapStateToProps = (state) => {
    const loggedIn = state.receivedUser.isLoggedIn;
    const userLogin = state.receivedUser.userLogin;

    return { loggedIn, userLogin };
};

export default connect(mapStateToProps, { logoutUser })(Header);
