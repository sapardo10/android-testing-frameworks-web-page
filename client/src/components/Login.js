import React, { Component } from 'react';
import { Container, Row} from 'reactstrap';
import LoginForm from './registerComponents/LoginForm';
import RegisterForm from './registerComponents/RegisterForm';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {

    state = {     
        redirect: false,   
    }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

      renderRedirect = () => {
        if (this.state.redirect) {
          const route = '/';
          return <Redirect to={route} />
        }
      }

    render() {
        return (
            <Container>
                {this.renderRedirect()}
                <h1>Login / Register</h1>
                <Row>
                    <RegisterForm onRedirect={this.setRedirect}/>
                    <LoginForm onRedirect={this.setRedirect}/>
                </Row>
            </Container>
        );
    }
}
