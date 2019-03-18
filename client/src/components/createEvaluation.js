import React, { Component } from 'react';
import axios from "axios";

export default class CreateEvaluation extends Component {
  
    state = {
        techniques:[],
        technologies:[],
        technique:{},
        technology:{},
        codesnippet: null,
        youtubeurl: null,
        evaluation: null,
        numericalevaluation: null
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

    axios.post("http://localhost:3001/api/createEvaluation", {
      idtechnology: this.state.technology.id,
      idtechnique: this.state.technique.id,
      codesnippet: this.state.codesnippet,
      youtubeurl: this.state.youtubeurl,
      evaluation: this.state.evaluation,
      numericalevaluation: this.state.numericalevaluation
    });
  };

    // our update method that uses our backend api
  // to overwrite existing data base information
  updateTechnique = () => {
    let objIdToUpdate = this.state.idtechnique;

    axios.post("http://localhost:3001/techniques/update", {
      id: objIdToUpdate,
      update: { message: "" }
    });
  };

    renderTechniquesOptions = () => {
        return this.state.techniques.map((technique)=> {
            return <option value={technique.id}>{technique.name}</option>
        });
    }

    renderTechnologiesOptions = () => {
        return this.state.technologies.map((technology)=> {
            return <option value={technology.id}>{technology.name}</option>
        });
    }

    render() {
    return (
      <div>
        Compare {this.state.technology.name} doing {this.state.technique.name}
        <h2>Techniques</h2>
        <select>
            {this.renderTechniquesOptions()}
        </select>
        <br/>
        <h2>Technologies</h2>
        <select>
            {this.renderTechnologiesOptions()}
        </select>

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
            onChange={e => this.setState({ evaluation: e.target.value })}
            placeholder="evaluation"
          />
        </div>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ numericalevaluation: e.target.value })}
            placeholder="evaluation"
          />
        </div>
    
        <button onClick={() => this.addEvaluation()}>
            Add evaluation
          </button>

      </div>
    )
  }
}
