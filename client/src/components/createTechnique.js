import React, { Component } from 'react';
import axios from "axios";
import {
    Container, Col, Form, Button,
    FormGroup, Label, Input, FormText, FormFeedback,
} from 'reactstrap';
import '../App.css';

export default class CreateTechnique extends Component {

    state = {
        id: undefined,
        name: undefined,
        description: undefined,
        type: undefined,
        validate: {
            idState: '',
            nameState: '',
            descriptionState: '',
            typeState: '',
        },
    }

    putDataToDB = () => {
        axios.post("http://localhost:3001/techniques/create", {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            type: this.state.type
        });
    };

    validateId = (e) => {
        const { validate } = this.state
        if (e.target.value !== "") {
            validate.idState = 'has-success'
            this.setState({ id: e.target.value })
        } else {
            validate.idState = 'has-danger'
        }
        this.setState({ validate })
    }

    validateName = (e) => {
        const { validate } = this.state
        if (e.target.value !== "") {
            validate.nameState = 'has-success'
            this.setState({ name: e.target.value })
        } else {
            validate.nameState = 'has-danger'
        }
        this.setState({ validate })
    }


    validateDescription = (e) => {
        const { validate } = this.state
        if (e.target.value !== "") {
            validate.descriptionState = 'has-success'
            this.setState({ description: e.target.value })
        } else {
            validate.descriptionState = 'has-danger'
        }
        this.setState({ validate })
    }

    validateType = (e) => {
        const { validate } = this.state
        if (e.target.value !== "") {
            validate.typeState = 'has-success'
            this.setState({ type: e.target.value })
        } else {
            validate.typeState = 'has-danger'
        }
        this.setState({ validate })
    }

    render() {
        var message = "Create technique";
        if (this.state.name !== undefined) {
            message = "Create " + this.state.name + " technique"
        }
        return (
            <Container>
                <h1>{message}</h1>
                <Container className="create-form">
                    <Form >
                        <Col>
                            <FormGroup>
                                <Label>Id</Label>
                                <Input
                                    type="number"
                                    onChange={this.validateId}
                                    valid={this.state.validate.idState === 'has-success'}
                                    invalid={this.state.validate.idState === 'has-danger'}
                                />

                                <FormText>Id to identify the technique</FormText>
                                <FormFeedback valid>
                                    Valid id!
                                </FormFeedback>
                                <FormFeedback invalid>
                                    Please provide a valid numerical id
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Name</Label>
                                <Input
                                    type="text"
                                    onChange={this.validateName}
                                    valid={this.state.validate.nameState === 'has-success'}
                                    invalid={this.state.validate.nameState === 'has-danger'}

                                />
                                <FormText>Name of the technique</FormText>
                                <FormFeedback valid>
                                    Valid name!
                                </FormFeedback>
                                <FormFeedback invalid>
                                    Please provide a valid name
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Description</Label>
                                <Input
                                    type="textarea"
                                    onChange={this.validateDescription}
                                    valid={this.state.validate.descriptionState === 'has-success'}
                                    invalid={this.state.validate.descriptionState === 'has-danger'}

                                />
                                <FormText>Description of the technique</FormText>
                                <FormFeedback valid>
                                    Valid description!
                                </FormFeedback>
                                <FormFeedback invalid>
                                    Please provide a valid description
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Type</Label>
                                <Input
                                    type="text"
                                    onChange={this.validateType}

                                    valid={this.state.validate.typeState === 'has-success'}
                                    invalid={this.state.validate.typeState === 'has-danger'}
                                />
                                <FormText>Type of the technique</FormText>
                                <FormFeedback valid>
                                    Valid type!
                                </FormFeedback>
                                <FormFeedback invalid>
                                    Please provide a valid type
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <Button color="success" onClick={() => this.putDataToDB()}>
                                {message}
                            </Button>
                        </Col>
                    </Form>
                </Container>
            </Container>
        )
    }
}
