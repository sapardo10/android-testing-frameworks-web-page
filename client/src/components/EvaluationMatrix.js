import React, { Component } from 'react';

export default class EvaluationMatrix extends Component {

    state = {
        technologies: [],
        techniques: [],
        evaluations: [],
    };

    componentDidMount() {
        this.getTechnologiesFromDb();
        this.getTechniquesFromDb();
        this.getEvaluationsFromDb();
    }

    getTechniquesFromDb = () => {
        fetch("http://localhost:3001/techniques/get")
            .then(data => data.json())
            .then(res => this.setState({ techniques: res.data }));
    };

    getTechnologiesFromDb = () => {
        fetch("http://localhost:3001/technologies/get")
            .then(data => data.json())
            .then(res => this.setState({ technologies: res.data }));
    };

    getEvaluationsFromDb = () => {
        fetch("http://localhost:3001/evaluations/get")
            .then(data => data.json())
            .then(res => this.setState({ evaluations: res.data }));
    };

    renderTechniquesList = () => {
        return this.state.techniques.map((technique)=> {
            return <li 
                key={technique.id}
                value={technique.id}>{technique.name}</li>
        });
    }

    renderTechnologiesList = () => {
        return this.state.technologies.map((technology)=> {
            return <li 
                key={technology.id}
                value={technology.id}>{technology.name}</li>
        });
    }

    renderEvaluationsList = () => {
        return this.state.evaluations.map((evaluation)=> {
            return <li>{evaluation.techniqueName} - {evaluation.technologyName}</li>
        });
    }

    render() {
        return (
            <div>
                <ul>
                {this.renderTechniquesList()}
                </ul>
                <ul>
                {this.renderTechnologiesList()}
                </ul>
                <ul>
                {this.renderEvaluationsList()}
                </ul>
            </div>
        )
    }
}
