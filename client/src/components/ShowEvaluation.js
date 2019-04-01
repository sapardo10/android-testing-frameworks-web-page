import React, { Component } from 'react';
import Gist from 'react-gist';
import YouTube from 'react-youtube';
import StarRatings from 'react-star-ratings';
import { Jumbotron, Button, Container, Collapse } from 'reactstrap';

export default class ShowTechnology extends Component {

    constructor(props) {
        super(props);
        this.state = {
            evaluation: undefined,
            error: false,
            fadeIn: false
        };
        this.toggle = this.toggle.bind(this);
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

    componentDidUpdate() {

        if (this.state.fadeIn) {
            const element = document.getElementById("headerDetails");
            
        }
        
    }

    getEvaluationFromDb = (id) => {
        fetch("http://localhost:3001/evaluations/get/" + id)
            .then(data => data.json())
            .then(res => this.setState({ evaluation: res.data, error: false }))
            .catch(err => this.setState({ error: true }));
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
        const evaluation = this.state.evaluation;
        const rate = evaluation.numericalEvaluation / 2;
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
        const evaluation = this.state.evaluation;
        const idVideo = evaluation.youtubeurl;
        const opts = {
            width:"560",
             height:"349"
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
        const evaluation = this.state.evaluation;
        return (<p>{evaluation.textEvaluation}</p>);
    }

    renderGithubButton = () => {
        const evaluation = this.state.evaluation;
        return (
            <form action={evaluation.githubUrl}>
                <Button color="secondary" size="lg" active>
                See on GitHub
                </Button>
            </form>
        );
    }

    renderEvaluationCodesnippet = () => {
        const evaluation = this.state.evaluation;
        return (
            <Gist id={evaluation.codesnippet} />
        );
    }

    renderEvaluationScreen = () => {
        const evaluation = this.state.evaluation;
        var buttonMessage = "Learn More";
        if(this.state.fadeIn){
            buttonMessage = "Hide details";
        }
        return (
            <div>
                
                <Jumbotron>
                    <h1 className="display-3">Evaluation of {evaluation.techniqueName} on {evaluation.technologyName}</h1>
                    <p className="lead">{this.renderEvaluationDescription()}</p>
                    <hr className="my-2" />
                    <p>{this.renderEvaluationRating()}</p>
                    <p className="lead">
                        <Button
                            color="primary"
                            onClick={this.toggle}>{buttonMessage}</Button>
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

    render() {
        var screen = this.renderErrorScreen();
        if (!this.state.error && this.state.evaluation !== undefined) {
            screen = this.renderEvaluationScreen();
        }
        return (
            <div>
                {screen}
            </div>);

    }
}