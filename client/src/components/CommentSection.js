import React, { Component } from 'react';
import {
    Container, Col, Form,
    Button, FormGroup, Label,
    Input, FormFeedback,
    Alert, ListGroupItemHeading, ListGroupItem,
    ListGroup, ListGroupItemText
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import fire from '../config/Fire';
import axios from "axios";

export default class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            submissionId: this.props.submissionId,
            comment: '',
            validate: {
                commentState: '',
            },
            visible: false,
            message: "",
            comments: null,
            redirect: false,
        }
    }

    componentDidMount() {
        this.getComments();
    }

    postComment = () => {
        const currentUser = fire.auth().currentUser;
        if (currentUser && this.state.comment !== '') {
            axios.post("https://fast-escarpment-67919.herokuapp.com/comments/post/", {
                userId: currentUser.uid,
                userEmail: currentUser.email,
                content: this.state.comment,
                submissionId: this.state.submissionId,
            }).then(() => {
                this.getComments();
            }).catch((err) => {
                this.setState({
                    message: 'Error conecting to servers',
                    visible: true,
                });
            });
        } else {
            this.setState({
                message: 'Fill out the fields',
                visible: true,
            });
        }
    }

    getComments = () => {
        fetch("https://fast-escarpment-67919.herokuapp.com/comments/get/" + this.state.submissionId)
            .then(data => data.json())
            .then(res => this.setState({ comments: res.data }))
            .catch((err) => {
                this.setState({
                    message: 'Error conecting to servers get comments' + err,
                    visible: true,
                });
            });
    }



    validateComment = (e) => {
        const { validate } = this.state
        if (e.target.value !== "") {
            validate.commentState = 'has-success'
            this.setState({ comment: e.target.value })
        } else {
            validate.commentState = 'has-danger'
        }
        this.setState({ validate })
    }

    renderComments = () => {
        if (this.state.comments !== null) {

            return this.state.comments.map((comment,id) => {
                const time = comment.createdAt;
                let date = new Date(time);
                return (<ListGroupItem key={id}>
                    <ListGroupItemHeading>{comment.content}</ListGroupItemHeading>
                    <ListGroupItemText>
                        {comment.userEmail} at {' ' + date}
                    </ListGroupItemText>
                </ListGroupItem>);
            });
        }

    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }



    renderRedirect = () => {
        if (this.state.redirect) {
            const route = '/evaluation/' + this.state.submissionId;
            return <Redirect to={route} />
        }
    }

    render() {
        return (

            <div>
                {this.renderRedirect()}
                <Container className="create-form">
                    <Container>
                        <h3>Comments:</h3>
                        <ListGroup>
                            {this.renderComments()}
                        </ListGroup>
                    </Container>
                    <Form >
                        <Col>
                            <FormGroup>
                                <Label>Comment</Label>
                                <Input
                                    type="textarea"
                                    onChange={this.validateComment}
                                    valid={this.state.validate.commentState === 'has-success'}
                                    invalid={this.state.validate.commentState === 'has-danger'}
                                    maxLength='500'
                                />
                                <FormFeedback valid>
                                    Valid comment!
                                </FormFeedback>
                                <FormFeedback >
                                    Please provide a non-empty comment! :)
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                            {this.state.message}
                        </Alert>
                        <Button color="success" onClick={() => this.postComment()}>
                            Post comment
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}
