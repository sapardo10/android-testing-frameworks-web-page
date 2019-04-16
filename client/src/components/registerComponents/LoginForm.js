import React, { Component } from 'react';
import {
    Container, Col, Form,
    Button, FormGroup, Label,
    Input
} from 'reactstrap';
import fire from '../../config/Fire';
import SweetAlert from 'sweetalert-react';

export default class LoginForm extends Component {

    state = {
        email: "",
        password: "",
        error: "",
        show: false,
    }

    login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=> {
            console.log(u);
        }).catch((error)=>{
            console.log(error);
        });
    }

    handleEmailChange = (e) => {
        this.setState({email:e.target.value})
    }
    handlePasswordChange = (e) => {
        this.setState({password:e.target.value})
    }
    confirmSweetAlert = () => {
        this.setState({ show: false })
        this.props.history.push('/')
    }

    render() {
        return (
            <Col>
                <Container className="create-form">
                    <h1>Login</h1>
                    <br />
                    <br />
                    <Form>
                        <Col>
                            <FormGroup >
                                <Label>Email</Label>
                                <Input
                                    required
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleEmailChange}
                                />
                            </FormGroup >
                        </Col>
                        <Col>
                            <FormGroup >
                                <Label>Password</Label>
                                <Input
                                    onChange={this.handlePasswordChange}
                                    required
                                    type="password"
                                    placeholder="Password"
                                />
                            </FormGroup >
                        </Col>
                        <Col>
                            <Button color="success" onClick={ this.login}>
                                Log in
                            </Button>
                        </Col>
                    </Form>
                </Container>
                <SweetAlert
                    show={this.state.show}
                    title="Success"
                    text="You have succesfully logged in"
                    onConfirm={() => this.setState({ show: false })}
                />
            </Col>
        )
    }
}
