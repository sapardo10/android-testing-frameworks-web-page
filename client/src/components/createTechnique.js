import React, { Component } from 'react';
import axios from "axios";

export default class CreateTechnique extends Component {

    state = {
        id: null,
        name: null,
        description: null,
        type: null
    }

    putDataToDB = () => {
        axios.post("http://localhost:3001/techniques/create", {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            type: this.state.type
        });
    };

    render() {
        return (
            <div>
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        onChange={e => this.setState({ id: e.target.value })}
                        placeholder="id of the technology"
                        style={{ width: "200px" }}
                    />
                </div>
                <br />
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        onChange={e => this.setState({ name: e.target.value })}
                        placeholder="name of the technology"
                        style={{ width: "200px" }}
                    />
                </div>
                <br />
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        onChange={e => this.setState({ description: e.target.value })}
                        placeholder="description of the technology"
                        style={{ width: "200px" }}
                    />
                </div>
                <br />
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        onChange={e => this.setState({ type: e.target.value })}
                        placeholder="type of the technology"
                        style={{ width: "200px" }}
                    />
                </div>
                <br />
                <button onClick={() => this.putDataToDB()}>
                    ADD
          </button>
            </div>
        )
    }
}
