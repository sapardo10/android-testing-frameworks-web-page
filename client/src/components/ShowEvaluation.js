import React, { Component } from 'react';
import Gist from 'react-gist';
import YouTube from 'react-youtube';
import StarRatings from 'react-star-ratings';
import {
    Jumbotron, Button, Container,
    Collapse, ListGroupItem, ListGroupItemHeading,
    ListGroup, Alert
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import CommentSection from './CommentSection';
import fire from '../config/Fire';

export default class ShowTechnology extends Component {

    constructor(props) {
        super(props);
        this.state = {
            evaluation: undefined,
            error: false,
            fadeIn: false,
            redirect: false,
            submission: undefined,
            rating: undefined,
            visible: false,
            message: "",
            alreadyRated: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    changeRating = (newRating, name) => {
        const user = localStorage.getItem('user');
        axios.post("https://fast-escarpment-67919.herokuapp.com/evaluations/set-rating/", {
            id: this.state.evaluation.id,
            userId: user,
            rating: newRating,
            submissionId: this.state.submission.id,
        })
            .catch((err) => {
                this.setState({
                    message: 'Error conecting to servers',
                    visible: true,
                });
            });
        this.setState({
            alreadyRated: true,
            rating: newRating
        });
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            const route = '/create-new-evaluation/' + this.state.evaluation.id;
            return <Redirect to={route} />
        }
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTechniquesFromDb();
        this.getTechnologyFromDb();
        this.getEvaluationFromDb(params.id);
    }

    getEvaluationFromDb = (id) => {
        fetch("https://fast-escarpment-67919.herokuapp.com/evaluations/get/" + id)
            .then(data => data.json())
            .then((res) => this.renderEvaluation(res))
            .catch((err) => {

                this.setState({
                    message: 'Error conecting to servers get evaluation' + err,
                    visible: true,
                });
            });
    }

    getRatingsFromUser = (evaluationId, userId) => {
        fetch("https://fast-escarpment-67919.herokuapp.com/evaluations/get-rating/?userId=" + userId + "&submissionId=" + evaluationId)
            .then(data => data.json())
            .then((res) => {
                if (res.data) {
                    this.setState({ alreadyRated: true })
                }
            })
            .catch((err) => {

                this.setState({
                    message: 'Error conecting to servers "get ratings"',
                    visible: true,
                });
            });
    }

    renderEvaluation = (res) => {
        const evaluation = res.data;
        const { match: { params } } = this.props;
        var submi = evaluation.submissions[0];
        const idsubmission = params.idsubmission;
        if (idsubmission) {
            submi = evaluation.submissions.find((sub) => {
                return sub._id === idsubmission;
            });
        }

        this.setState({
            evaluation: res.data,
            error: false,
            submission: submi
        })
        var user = localStorage.getItem('user');

        if (user) {
            this.getRatingsFromUser(submi._id, user);
        } else {
            this.setState({
                message: 'It seems that you are not logged in :/',
                visible: true,
            });
        }

    }

    getTechniquesFromDb = () => {
        fetch("https://fast-escarpment-67919.herokuapp.com/techniques/get")
            .then(data => data.json())
            .then(res => this.setState({ techniques: res.data }))
            .catch((err) => {
                this.setState({
                    message: 'Error conecting to servers get techniques',
                    visible: true,
                });
            });
    };

    getTechnologyFromDb = () => {
        fetch("https://fast-escarpment-67919.herokuapp.com/technologies/get/" + this.state.name)
            .then(data => data.json())
            .then(res => this.setState({ technology: res.data }))
            .catch((err) => {
                this.setState({
                    message: 'Error conecting to servers get technologies',
                    visible: true,
                });
            });
    }

    renderTechniques = () => {
        return this.state.techniques.map((technique) =>
            <li>{technique.name}</li>
        );
    }

    renderErrorScreen = () => {
        return (
            <div>
                <h1 id="headerDetails">There isn't any evaluation with that id</h1>
            </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    renderEvaluationRating = () => {
        const { submission, alreadyRated, rating } = this.state;
        const amount = submission.amountRated;
        var rate = 0;
        if (amount !== 0) {
            rate = submission.rating / amount;

        }
        var user = localStorage.getItem('user');

        var ratingStars = (<div>Calification not available</div>);

        if (!isNaN(rate)) {
            if (alreadyRated || !user) {

                if (rating) {
                    rate = rating;
                }
                ratingStars = (<StarRatings
                    rating={rate}
                    starDimension="40px"
                    starSpacing="15px"
                    starRatedColor="grey"
                    disabled={true}
                />
                );
            } else {
                ratingStars = (<StarRatings
                    rating={rate}
                    starDimension="40px"
                    starSpacing="15px"
                    starRatedColor="blue"
                    changeRating={this.changeRating}
                />
                );
            }

        }

        return ratingStars;
    }

    renderEvaluationVideo = () => {
        const submission = this.state.submission;
        const idVideo = submission.youtubeurl;

        const opts = {
            width: "560",
            height: "349"
        };
        if (idVideo) {
            return (
                <YouTube
                    videoId={idVideo}
                    opts={opts}
                    onReady={this._onReady}
                />
            );
        } else {
            return (<div></div>);
        }

    }

    renderEvaluationDescription = () => {
        const submission = this.state.submission;
        return (<p className="lead">{submission.textEvaluation}</p>);
    }

    renderGithubButton = () => {
        const submission = this.state.submission;
        return (
            <form action={'http://' + submission.githubUrl}>
                <Button color="secondary" size="lg" active>
                    See on GitHub
                </Button>
            </form>
        );
    }

    renderEvaluationCodesnippet = () => {
        const submission = this.state.submission;
        return (
            <Gist id={submission.codesnippet} />
        );
    }

    renderEvaluationScreen = () => {
        const evaluation = this.state.evaluation;
        var buttonMessage = "Learn More";
        if (this.state.fadeIn) {
            buttonMessage = "Hide details";
        }
        var buttonAddNew;
        var user = localStorage.getItem('user');

        if (user) {
            buttonAddNew = (<Button
                color="secondary"
                onClick={this.setRedirect}>Add new evaluation</Button>);
        }

        return (
            <div>

                <Jumbotron>
                    <h1 className="display-3">Evaluation of {evaluation.techniqueName} on {evaluation.technologyName}</h1>
                    {this.renderEvaluationDescription()}
                    <hr className="my-2" />
                    {this.renderEvaluationRating()}
                    <br />
                    <br />
                    <br />
                    <p className="lead">
                        <Button
                            color="primary"
                            onClick={this.toggle}>{buttonMessage}</Button>
                        {buttonAddNew}
                    </p>

                </Jumbotron>
                <Container>{this.renderEvaluationCodesnippet()}</Container>
                <Collapse isOpen={this.state.fadeIn} >
                    <Container>
                        <h1 id="headerDetails">Details</h1>
                        {this.renderEvaluationVideo()}
                        <br />
                        <br />
                        {this.renderGithubButton()}
                        <br />
                        <br />
                    </Container>
                </Collapse>



            </div>
        );
    }

    renderSubmissionsList = () => {
        return this.state.evaluation.submissions.map((submi, i) => {
            const route = '/evaluation/' + this.state.evaluation.id + '/' + submi._id;
            const amount = submi.amountRated;
            var rate = 0;
            if (amount !== 0) {
                rate = submi.rating / amount;
                rate = rate.toFixed(2)
            } else {
                rate = "Not rated"
            }
            const user = submi.userEmail;
            const time = submi.createdAt;
            let date = new Date(time);
            return (
                <ListGroupItem tag="a" href={route} action key={submi._id}>
                    <ListGroupItemHeading>{'Sumbmission made by: ' + user + ' - Rating: ' + rate + ' - at: ' + date}</ListGroupItemHeading>

                </ListGroupItem>
            );

        });
    }

    render() {

        var screen = this.renderErrorScreen();
        var submissions;
        var comments;
        if (!this.state.error && this.state.evaluation !== undefined) {
            screen = this.renderEvaluationScreen();
            if (this.state.evaluation.submissions.length > 1) {
                submissions = (
                    <div>
                        <Container className="create-form">
                            <h3>Submissions:</h3>
                            <ListGroup>
                                {this.renderSubmissionsList()}
                            </ListGroup>
                        </Container>
                    </div>);
            } else {
                submissions = (
                    <Container className="create-form">
                        <h3>No other submissions</h3>
                    </Container>);
            }
        }

        if (!this.state.error && this.state.submission !== undefined && this.state.submission !== null) {
            if(fire.auth().currentUser){
                comments = (
                    <CommentSection submissionId={this.state.submission.id} />
                );
            } else {
                comments = (<Container className="create-form"><h3>To see the comments please log in</h3></Container>);
            }
            
        }

        return (
            <div>
                {this.renderRedirect()}
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {this.state.message}
                </Alert>
                {screen}
                {submissions}
                {comments}
                <br />
                <br />
                <hr />
            </div>);

    }
}
