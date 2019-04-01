import React, { Component } from 'react';
import Gist from 'react-gist';
import YouTube from 'react-youtube';
import StarRatings from 'react-star-ratings';

export default class ShowTechnology extends Component {

    state = {
        evaluation: undefined,
        error: false,
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
                <h1>There isn't any evaluation with that id</h1>
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
        return (
            <StarRatings
                rating={rate}
                starDimension="40px"
                starSpacing="15px"
                starRatedColor="blue"
            />
        );
    }

    renderEvaluationVideo = () => {
        const evaluation = this.state.evaluation;
        const idVideo = evaluation.youtubeurl;
        const opts = {
            height: '200',
            width: '300'
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
                <button
                    type="submit"
                    value="See Github Example">
                    See Github Example
                </button>
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

        return (
            <div>
                Evaluation of {evaluation.techniqueName} on {evaluation.technologyName}
                {this.renderEvaluationRating()}
                {this.renderEvaluationVideo()}
                {this.renderEvaluationDescription()}
                {this.renderEvaluationCodesnippet()}
                {this.renderGithubButton()}
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
