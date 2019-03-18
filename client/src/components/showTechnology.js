import React, { Component } from 'react'

export default class ShowTechnology extends Component {
    
    state = {
        techniques: [],
        name: this.props.name || "",
        technology:{},
    }

    componentDidMount(){
        this.getTechniquesFromDb();
        this.getTechnologyFromDb();
    }

    getTechniquesFromDb = () => {
        fetch("http://localhost:3001/techniques/get")
            .then(data => data.json())
            .then(res => this.setState({ techniques: res.data }));
    };

    getTechnologyFromDb = () => {
        fetch("http://localhost:3001/technologies/get/"+this.state.name)
        .then(data => data.json())
        .then(res => this.setState({ technology: res.data }));
    }

    renderTechniques = () => {
        return this.state.techniques.map((technique)=>
            <li>{technique.name}</li>
        );
    }
    render() {
        return (
            <div>
                <img 
                    src={this.state.technology.imageurl}
                    width="200" 
                    height="200"
                    alt= {'Icon of '+ this.state.technology.name}/>
                <br/>
                Technology : <a 
                                href={this.state.technology.url}>
                                {this.state.technology.name}
                            </a>
                <br/>
                Creator : {this.state.technology.creator}
                <ul>
                    {this.renderTechniques()}
                </ul>
            </div>
        )
    }
}
