import react, { Component } from 'react';
import { Card, CardTitle, Col, Button, CardHeader, CardText, CardImg, CardBody, Row, Label } from 'reactstrap';
import { Control, Form, Errors, LocalForm, } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { postFormLogin } from "../redux/ActionCreators";
import { Redirect } from 'react-router-dom';

// Validator functions
const required = (val) => val && val.length;
const validEmail = (val) => !(val) || /^[A-Z0-9._%=-]+@[A-Z0-9.-]+[A-Z]{2,4}$/i.test(val);

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle form submission
  handleSubmit(values) {
    const data = {
      email: values.email,
      password: values.password
    }
    this.props.postFormLogin(data);
  }


  render() {
    // Redirect to home if logged in
    if (this.props.loggedIn) {
      return (
        <Redirect to="home" />
      );
    }

    return (
      <div className='container card-login'>
        <Card className='text-center' body outline>
          <div className="row align-items-start">
            <Col sm={12} lg={8}>
              <CardBody>
                <CardHeader>
                  <CardTitle tag="h4">Autentificare</CardTitle>
                </CardHeader>

                <CardBody>
                  <LocalForm model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                    {/* Email input */}
                    <Row className='form-group email-login'>
                      <Label htmlFor='email' md={4}>Email</Label>
                      <Col md={8}>
                        <Control.text model=".email" id="email" name='email'
                          placeholder='Email' className='form-control'
                          validators={{ required, validEmail }}
                        />
                        <Errors
                          className='text-danger'
                          model=".email"
                          show="touched"
                          messages={{
                            required: 'Acest câmp este obligatoriu. ',
                            validEmail: 'Adresa de email invalida'
                          }}
                        />
                      </Col>
                    </Row>

                    {/* Password input */}
                    <Row className='form-group'>
                      <Label htmlFor='password' md={4}>Parola</Label>
                      <Col md={8}>
                        <Control.text type="password" model=".password" id="password" name="password"
                          placeholder="Parola"
                          className='form-control'
                          validators={{ required }}
                        />
                        <Errors
                          className='text-danger'
                          model=".password"
                          show="touched"
                          messages={{
                            required: 'Acest câmp este obligatoriu. ',
                          }}
                        />
                      </Col>
                    </Row>

                    {/* Invalid credentials message */}
                    <Row>
                      <Col md={4}></Col>
                      <Col md={8}>
                        {
                          this.props.invalidCredentials
                            ? <div className='invalid-credentials'>Adresa de e-mail sau parola nu este corectă, încearcă din nou.</div>
                            : <div></div>

                        }
                      </Col>
                    </Row>

                    {/* Submit button */}
                    <Row className='form-group'>
                      <Col md={{ size: 8, offset: 4 }}>
                        <Button block type="submit" className='submit-button submit-login' >
                          Submit
                        </Button>
                      </Col>
                    </Row>

                    {/* Redirect to register */}
                    <Row>
                      <Col md={{ size: 8, offset: 4 }}>
                        <h6>Nu ai un cont? &nbsp;
                          <Link className='login-link' to="/register">Register</Link>
                        </h6>
                      </Col>
                    </Row>
                  </LocalForm>
                </CardBody>

              </CardBody>
            </Col>

            {/* Image section */}
            <Col sm={12} lg={4} className="d-none d-lg-block ">
              <CardImg src='../assets/login.png' alt="Login presentation image" className='image img-register' />
            </Col>
          </div>
        </Card>

      </div>
    );
  }
}

// Map state to props
const mapStateToProps = (state) => {
  const loggedIn = state.receivedUser.isLoggedIn;
  const invalidCredentials = state.receivedUser.err_login;
  return { loggedIn, invalidCredentials };
};

// Connect to Redux store
export default connect(mapStateToProps, { postFormLogin })(Login);

