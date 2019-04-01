import React, { Component } from 'react';
import axios from "axios";

export default class CreateEvaluation extends Component {

  state = {
    techniques: [],
    technologies: [],
    id: undefined,
    technique: undefined,
    technology: undefined,
    codesnippet: undefined,
    youtubeurl: undefined,
    textEvaluation: undefined,
    numericalEvaluation: undefined,
    githubUrl: undefined
  }
  componentDidMount() {
    this.getTechniquesFromDb();
    this.getTechnologiesFromDb();
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

  // our put method that uses our backend api
  // to create new query into our data base
  addEvaluation = () => {

    axios.post("http://localhost:3001/evaluations/create", {
      id: this.state.id,
      technologyName: this.state.technology,
      techniqueName: this.state.technique,
      codesnippet: this.state.codesnippet,
      youtubeurl: this.state.youtubeurl,
      textEvaluation: this.state.textEvaluation,
      numericalEvaluation: this.state.numericalEvaluation,
      githubUrl: this.state.githubUrl
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateEvaluation = () => {
    let objIdToUpdate = this.state.idtechnique;

    axios.post("http://localhost:3001/evaluations/update", {
      id: objIdToUpdate,
      update: { message: "" }
    });
  };

  renderTechniquesOptions = () => {
    return this.state.techniques.map((technique) => {
      return <option
        key={technique.name}
        value={technique.name}>{technique.name}</option>
    });
  }

  renderTechnologiesOptions = () => {
    return this.state.technologies.map((technology) => {
      return <option
        key={technology.name}
        value={technology.name}>{technology.name}</option>
    });
  }



  render() {
    return (
      <div>
        Compare {this.state.technology} doing {this.state.technique}
        <h2>Techniques</h2>
        <select
          onChange={e => this.setState({ technique: e.target.value })}>
          <option disabled selected>Select one</option>
          {this.renderTechniquesOptions()}
        </select>
        <br />
        <h2>Technologies</h2>
        <select
          onChange={e => this.setState({ technology: e.target.value })}>
          <option disabled selected >Select one</option>
          {this.renderTechnologiesOptions()}
        </select>

        <div style={{ padding: "10px" }}>
          <input
          required
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ id: e.target.value })}
            placeholder="id"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ codesnippet: e.target.value })}
            placeholder="codesnippet"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ youtubeurl: e.target.value })}
            placeholder="youtubeurl"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ textEvaluation: e.target.value })}
            placeholder="evaluation"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <input
            type="number"
            style={{ width: "200px" }}
            onChange={e => this.setState({ numericalEvaluation: e.target.value })}
            placeholder="numerical evaluation"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ githubUrl: e.target.value })}
            placeholder="github url"
          />
        </div>

        <button onClick={() => this.addEvaluation()}>
          Add evaluation
          </button>

      </div>
    )
  }
}
