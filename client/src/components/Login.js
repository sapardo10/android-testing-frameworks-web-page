import React, { Component } from 'react';
import { Container, Row} from 'reactstrap';
import LoginForm from './registerComponents/LoginForm';
import RegisterForm from './registerComponents/RegisterForm';

export default class Login extends Component {

    render() {
        return (
            <Container>
                <h1>Login / Register</h1>
                <Row>
                    <RegisterForm/>
                    <LoginForm/>
                </Row>
            </Container>
        );
    }
}
