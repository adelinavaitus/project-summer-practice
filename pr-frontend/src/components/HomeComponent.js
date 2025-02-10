import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    // Redirect based on the user's role
    if (!this.props.loggedIn) {
      return (
        <Redirect to="/login" />
      );
    }
    return (
      <div className='container'>
        {
          // Conditional redirects based on user role
          this.props.userLogin.roles === 'ROLE_COMPANY'
            ? <Redirect to="/jobs" />
            : this.props.userLogin.roles === 'ROLE_STUDENT'
              ? <Redirect to="/jobs" />
              : this.props.userLogin.roles === 'ROLE_ADMIN'
                ? <Redirect to="/students" />
                : this.props.userLogin.roles === 'ROLE_SUPERVISOR'
                  ? <Redirect to="/pendingreq" />
                  : <Redirect to="/notfound" />
        }
      </div>
    );
  }
}

// Maps Redux state to component props
const mapStateToProps = (state) => {
  const loggedIn = state.receivedUser.isLoggedIn; // Checks if user is logged in
  const userLogin = state.receivedUser.userLogin; // Gets the logged-in user's details
  return { loggedIn, userLogin };
}

// Connects the component to the Redux store
export default connect(mapStateToProps,)(Home);