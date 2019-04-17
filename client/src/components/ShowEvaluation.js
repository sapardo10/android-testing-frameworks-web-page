import React, { Component } from 'react';
import Gist from 'react-gist';
import YouTube from 'react-youtube';
import StarRatings from 'react-star-ratings';
import {
    Jumbotron, Button, Container,
    Collapse, ListGroupItem, ListGroupItemHeading,
    ListGroup
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class ShowTechnology extends Component {

    constructor(props) {
        super(props);
        this.state = {
            evaluation: undefined,
            error: false,
            fadeIn: false,
            redirect: false,
            submission: undefined,
        };
        this.toggle = this.toggle.bind(this);
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
        fetch("http://localhost:3001/evaluations/get/" + id)
            .then(data => data.json())
            .then((res) => this.renderEvaluation(res))
            .catch(err => this.setState({ error: true }));
    }

    renderEvaluation = (res) => {
        const evaluation = res.data;
        const { match: { params } } = this.props;
        var submi = evaluation.submissions[0];
        const idsubmission = params.idsubmission;
        console.log(idsubmission)
        if (idsubmission) {
            submi = evaluation.submissions.find((sub) => {
                console.log(sub._id,idsubmission)
                return sub._id === idsubmission;
            });
        }
        console.log(submi)
        
        this.setState({
            evaluation: res.data,
            error: false,
            submission: submi
        })
    }

    getTechniquesFromDb = () => {
        fetch("http://localhost:3001/techniques/get")
            .then(data => data.json())
            .then(res => this.setState({ techniques: res.data }));
    };

    getTechnologyFromDb = () => {
        fetch("http://localhost:3001/technologies/get/" + this.state.name)
            .then(data => data.json())
            .then(res => this.setState({ technology: res.data }));
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
        const submission = this.state.submission;
        const rate = submission.numericalEvaluation / 2;
        if (!isNaN(rate)) {
            return (
                <StarRatings
                    rating={rate}
                    starDimension="40px"
                    starSpacing="15px"
                    starRatedColor="blue"
                />
            );
        } else {
            return (
                <div>Calification not available</div>
            );
        }
    }

    renderEvaluationVideo = () => {
        const submission = this.state.submission;
        const idVideo = submission.youtubeurl;
        const opts = {
            width: "560",
            height: "349"
        };

        return (
            <YouTube
                videoId={idVideo}
                opts={opts}
                onReady={this._onReady}
            />
        );
    }

    renderEvaluationDescription = () => {
        const submission = this.state.submission;
        return (<p className="lead">{submission.textEvaluation}</p>);
    }

    renderGithubButton = () => {
        const submission = this.state.submission;
        return (
            <form action={submission.githubUrl}>
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
        return (
            <div>

                <Jumbotron>
                    <h1 className="display-3">Evaluation of {evaluation.techniqueName} on {evaluation.technologyName}</h1>
                    {this.renderEvaluationDescription()}
                    <hr className="my-2" />
                    {this.renderEvaluationRating()}
                    <p className="lead">
                        <Button
                            color="primary"
                            onClick={this.toggle}>{buttonMessage}</Button>
                        <Button
                            color="secondary"
                            onClick={this.setRedirect}>Add new evaluation</Button>
                    </p>

                </Jumbotron>
                <Container>{this.renderEvaluationCodesnippet()}</Container>
                <Collapse isOpen={this.state.fadeIn} >
                    <Container>
                        <h1 id="headerDetails">Details</h1>
                        {this.renderEvaluationVideo()}

                        {this.renderGithubButton()}
                    </Container>
                </Collapse>



            </div>
        );
    }

    renderSubmissionsList = () => {
        return this.state.evaluation.submissions.map((submi, i) => {
            const route = '/evaluation/' + this.state.evaluation.id + '/' + submi._id;
            return (
                
                <ListGroupItem tag="a" href={route} action key={submi._id}>
                    <ListGroupItemHeading>{i + ' - ' + submi._id + ' - ' + submi.rating}</ListGroupItemHeading>

                </ListGroupItem>
            );

        });
    }

    render() {
        var screen = this.renderErrorScreen();
        var submissions = (<div></div>);
        if (!this.state.error && this.state.evaluation !== undefined) {
            screen = this.renderEvaluationScreen();
            submissions = (
                <div>
                    <Container>
                    <h3>Other submissions:</h3>
                    <ListGroup>
                        {this.renderSubmissionsList()}
                    </ListGroup>
                    </Container>
                </div>);
        }
        return (
            <div>
                {this.renderRedirect()}
                {screen}
                {submissions}
            </div>);

    }
}
