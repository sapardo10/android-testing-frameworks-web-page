import React, { Component } from 'react';
import {
    Container, Col, Form,
    Button, FormGroup, Label,
    Input, FormText, FormFeedback,
} from 'reactstrap';
import fire from '../../config/Fire';

export default class RegisterForm extends Component {

    state = {
        email: "",
        password: "",
        passwordConfirmation: "",
        validate: {
            emailState: "",
            passwordState: "",
            passwordConfirmationState: "",
        }
    }
    isValid = (str) => {
        return this.state.validate[str] === 'has-success';
    }

    signup = (e) => {
        e.preventDefault();
        if(this.isValid('emailState')
        && this.isValid('passwordState')
        && this.isValid('passwordConfirmationState')){
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u);
            this.props.onRedirect();
        }).catch((error)=> {
            console.log(error);
        });
    }
    }

    validateEmail = (e) => {
        const emailRex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
            this.setState({ email: e.target.value })
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    validatePassword = (e) => {
        const passwordRex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const { validate } = this.state
        if (passwordRex.test(e.target.value)) {
            validate.passwordState = 'has-success';
            this.setState({ password: e.target.value })
        } else {
            validate.passwordState = 'has-danger';
        }
        this.setState({ validate });
    }

    validatePasswordConfirmation = (e) => {
        const { validate } = this.state
        if (e.target.value === this.state.password) {
            validate.passwordConfirmationState = 'has-success'
            this.setState({ passwordConfirmation: e.target.value })
        } else {
            validate.passwordConfirmationState = 'has-danger'
        }
        this.setState({ validate });
    }

  render() {
    return (
        <Col>

        <Container className="create-form">
            <h1>Register</h1>
            <br />
            <br />
            <Form>
                <Col>
                    <FormGroup >
                        <Label>Email</Label>
                        <Input
                            required
                            type="email"
                            onChange={this.validateEmail}
                            placeholder="Email"
                            valid={this.state.validate.emailState === 'has-success'}
                            invalid={this.state.validate.emailState === 'has-danger'}
                        />
                        <FormText>Email that will work as your username</FormText>
                        <FormFeedback valid>
                            Valid email!
                        </FormFeedback>
                        <FormFeedback invalid>
                            Please provide a valid email like example@validemail.com
                        </FormFeedback>
                    </FormGroup >
                </Col>
                <Col>
                    <FormGroup >
                        <Label>Password</Label>
                        <Input
                            required
                            type="password"
                            onChange={this.validatePassword}
                            placeholder="Password"
                            valid={this.state.validate.passwordState === 'has-success'}
                            invalid={this.state.validate.passwordState === 'has-danger'}
                        />
                        <FormFeedback valid>
                            Valid password!
                        </FormFeedback>
                        <FormFeedback invalid>
                            Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
                        </FormFeedback>
                    </FormGroup >
                </Col>
                <Col>
                    <FormGroup >
                        <Label>Password confirmation</Label>
                        <Input
                            required
                            type="password"
                            onChange={this.validatePasswordConfirmation}
                            placeholder="Password"
                            valid={this.state.validate.passwordConfirmationState === 'has-success'}
                            invalid={this.state.validate.passwordConfirmationState === 'has-danger'}
                        />
                        <FormFeedback valid>
                            The passwords match!
                        </FormFeedback>
                        <FormFeedback invalid>
                            The password fields do not match :/
                        </FormFeedback>
                    </FormGroup >
                </Col>
                <Col>
                    <Button color="success" onClick={this.signup}>
                        Register
                    </Button>
                </Col>
            </Form>
        </Container>
    </Col>
    )
  }
}
