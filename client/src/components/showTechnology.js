import React, { Component } from 'react'

export default class ShowTechnology extends Component {

    state = {
        evaluations: [],
        technology: undefined,
        error: false,
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTechnologyFromDb(params.id);
    }

    getEvaluationsOfTechnology = () => {
        const name = this.state.technology.name;
        fetch("http://localhost:3001/evaluations/technology/" + name)
            .then(data => data.json())
            .then(res => this.setState({ evaluations: res.data, error: false }))
            .catch(err => this.setState({ error: true }));
    }

    getTechnologyFromDb = (id) => {
        fetch("http://localhost:3001/technologies/get/" + id)
            .then(data => data.json())
            .then(res => this.setState({ technology: res.data, error: false }))
            .then(() => {
                if (this.state.technology !== undefined) {
                    this.getEvaluationsOfTechnology()
                }
            })
            .catch(err => this.setState({ error: true }));
    }

    renderTechniques = () => {
        return this.state.evaluations.map((evaluation) => {
            const route = "../evaluation/" + evaluation.id;
            return <li key={evaluation.id}><a href={route}>{evaluation.techniqueName}</a></li>
        }
        );
    }

    renderErrorScreen = () => {
        return (
            <div>
                <h1>There isn't any evaluation with that id</h1>
            </div>
        );
    }

    renderTechnologyScreen = () => {
        return (
            <div>
                <img
                    src={this.state.technology.imageurl}
                    width="200"
                    height="200"
                    alt={'Icon of ' + this.state.technology.name} />
                <br />
                Technology : <a
                    href={this.state.technology.url}>
                    {this.state.technology.name}
                </a>
                <br />
                Creator : {this.state.technology.creator}
                <br />
                Description : {this.state.technology.description}
                <br />
                Evaluations:
                <ul>
                    {this.renderTechniques()}
                </ul>
            </div>
        );
    }
    render() {
        var screen = this.renderErrorScreen();
        if (!this.state.error && this.state.technology !== undefined) {
            screen = this.renderTechnologyScreen();
        }
        return (
            <div>
                {screen}
            </div>
        )
    }
}
