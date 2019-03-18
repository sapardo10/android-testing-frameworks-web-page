import React, { Component } from 'react'

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
