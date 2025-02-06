import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <Redirect to="/login" />
      );
    }
    return (
      <div className='container'>
        {
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

const mapStateToProps = (state) => {
  const loggedIn = state.receivedUser.isLoggedIn;
  const userLogin = state.receivedUser.userLogin;
  return { loggedIn, userLogin };
}

export default connect(mapStateToProps,)(Home);