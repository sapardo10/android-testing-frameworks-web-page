import React, { Component } from 'react';
import axios from "axios";

export default class CreateTechnology extends Component {

    state = {
        id: null,
        name: null,
        creator: null,
        description: null,
        url: null,
        imageurl: null
    }

    putDataToDB = () => {
        axios.post("http://localhost:3001/technologies/create", {
            id: this.state.id,
            name: this.state.name,
            creator: this.state.creator,
            description: this.state.description,
            url: this.state.url,
            imageurl:this.state.imageurl
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
                        onChange={e => this.setState({ creator: e.target.value })}
                        placeholder="creator of the technology"
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
                        onChange={e => this.setState({ url: e.target.value })}
                        placeholder="url of the technology"
                        style={{ width: "200px" }}
                    />
                </div>
                <br />
                <div style={{ padding: "10px" }}>
                    <input
                        type="text"
                        onChange={e => this.setState({ imageurl: e.target.value })}
                        placeholder="imageurl of the technology"
                        style={{ width: "200px" }}
                    />
                </div>
                <button onClick={() => this.putDataToDB()}>
                    ADD
          </button>
            </div>
        )
    }
}
