import React, { Component } from 'react'

export default class ShowTechnique extends Component {

    state = {
        technique : undefined,
        evaluations: [],
        error : true
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTechnologyFromDb(params.id);
    }

    getTechnologyFromDb = (id) => {
        fetch("http://localhost:3001/techniques/get/" + id)
            .then(data => data.json())
            .then(res => this.setState({ technique: res.data, error: false }))
            .then(() => {
                if (this.state.technique !== undefined) {
                    this.getEvaluationsOfTechnique()
                }
            })
            .catch(err => this.setState({ error: true }));
    }

    getEvaluationsOfTechnique = () => {
        const name = this.state.technique.name;
        fetch("http://localhost:3001/evaluations/technique/" + name)
            .then(data => data.json())
            .then(res => this.setState({ evaluations: res.data, error: false }))
            .catch(err => this.setState({ error: true }));
    }

    renderTechnologies = () => {
        return this.state.evaluations.map((evaluation) => {
            const route = "../evaluation/" + evaluation.id;
            return <li key={evaluation.id}><a href={route}>{evaluation.technologyName}</a></li>
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

    renderTechniqueScreen = () => {
        const tech = this.state.technique;
        return (
            <div>
                <h1>{tech.name}</h1>
                <h2>{tech.type}</h2>
                <p>{tech.description}</p>
                Evaluations:
                <ul>
                    {this.renderTechnologies()}
                </ul>
            </div>
        );
    }

  render() {
    console.log(this.state.technique);
    var screen = this.renderErrorScreen();
    if(!this.state.error && this.state.technique!== undefined) {
        screen = this.renderTechniqueScreen();
    }

    return (
      <div>
        {screen}
      </div>
    )
  }
}
