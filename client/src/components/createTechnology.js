import React, { Component } from 'react';
import axios from "axios";
import {
    Container, Col, Form, Button,
    FormGroup, Label, Input, FormText, FormFeedback,
} from 'reactstrap';

export default class CreateTechnology extends Component {

    state = {
        id: undefined,
        name: undefined,
        creator: undefined,
        description: undefined,
        url: undefined,
        imageurl: undefined,
        validate: {
            idState: '',
            nameState: '',
            creatorState: '',
            descriptionState: '',
            urlState: '',
            imageurlState: '',
        },
    }

    putDataToDB = () => {
        console.log(this.state)
        axios.post("http://localhost:3001/technologies/create", {
            id: this.state.id,
            name: this.state.name,
            creator: this.state.creator,
            description: this.state.description,
            url: this.state.url,
            imageurl: this.state.imageurl
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
    validateCreator = (e) => {
        const { validate } = this.state
        if (e.target.value !== "") {
            validate.creatorState = 'has-success'
            this.setState({ creator: e.target.value })
        } else {
            validate.creatorState = 'has-danger'
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

    validateUrl = (e) => {
         // eslint-disable-next-line
        const urlRex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        const { validate } = this.state
        if (urlRex.test(e.target.value)) {
            validate.urlState = 'has-success'
            this.setState({ url: e.target.value })
        } else {
            validate.urlState = 'has-danger'
        }
        this.setState({ validate })
    }

    validateImageUrl = (e) => {
         // eslint-disable-next-line
        const urlRex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        const { validate } = this.state
        if (urlRex.test(e.target.value)) {
            validate.imageurlState = 'has-success'
            this.setState({ imageurl: e.target.value })
        } else {
            validate.imageurlState = 'has-danger'
        }
        this.setState({ validate })
    }

    render() {
        var message = "Create technology";
        if (this.state.name !== undefined) {
            message = "Create " + this.state.name + " technology"
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
                                <FormText>Name of the technology</FormText>
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
                                <Label>Creator</Label>
                                <Input
                                    type="text"
                                    onChange={this.validateCreator}
                                    valid={this.state.validate.creatorState === 'has-success'}
                                    invalid={this.state.validate.creatorState === 'has-danger'}

                                />
                                <FormText>Name of the creator</FormText>
                                <FormFeedback valid>
                                    Valid creator!
                                </FormFeedback>
                                <FormFeedback invalid>
                                    Please provide a valid name of the creator
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
                                <Label>Url</Label>
                                <Input
                                    type="text"
                                    onChange={this.validateUrl}
                                    valid={this.state.validate.urlState === 'has-success'}
                                    invalid={this.state.validate.urlState === 'has-danger'}
                                />
                                <FormText>Link to main page of technology</FormText>
                                <FormFeedback invalid>
                                    Invalid url
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Logo url</Label>
                                <Input
                                    type="text"
                                    onChange={this.validateImageUrl}
                                    valid={this.state.validate.imageurlState === 'has-success'}
                                    invalid={this.state.validate.imageurlState === 'has-danger'}
                                />
                                <FormText>Link to image logo</FormText>
                                <FormFeedback invalid>
                                    Invalid url
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
