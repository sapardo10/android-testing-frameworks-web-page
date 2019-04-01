import React, { Component } from 'react';

export default class EvaluationMatrix extends Component {

    state = {
        technologies: [],
        techniques: [],
        evaluations: [],
        apiResponse: 0,
        matrix: undefined
    };

    componentDidMount() {
        this.getTechnologiesFromDb();
        this.getTechniquesFromDb();
        this.getEvaluationsFromDb();
    }

    getTechniquesFromDb = () => {
        fetch("http://localhost:3001/techniques/get")
            .then(data => data.json())
            .then(res => this.setState((preState) => {
                return {
                    techniques: res.data,
                    apiResponse: preState.apiResponse + 1
                };
            }))
            .then(() => this.asingMatrix());
    };

    getTechnologiesFromDb = () => {
        fetch("http://localhost:3001/technologies/get")
            .then(data => data.json())
            .then(res => this.setState((preState) => {
                return {
                    technologies: res.data,
                    apiResponse: preState.apiResponse + 1
                };
            }))
            .then(() => this.asingMatrix());
    };

    getEvaluationsFromDb = () => {
        fetch("http://localhost:3001/evaluations/get")
            .then(data => data.json())
            .then(res => this.setState((preState) => {
                return {
                    evaluations: res.data,
                    apiResponse: preState.apiResponse + 1
                };
            }))
            .then(() => this.asingMatrix());
    };


    asingMatrix = () => {
        if (this.state.matrix === undefined && this.state.apiResponse === 3) {
            this.setState({ matrix: this.createMatrix() });
        }
    }

    createMatrix = () => {
        var arr = [];
        for (var i = 0; i < this.state.techniques.length; i++) {
            arr[i] = [];
            for (var j = 0; j < this.state.technologies.length; j++) {
                arr[i][j] = undefined;
            }
        }
        this.state.evaluations.map((evaluation) => {
            return arr[evaluation.techniqueId][evaluation.technologyId] = evaluation;
        });

        return arr;
    }

    renderTechniquesList = () => {
        return this.state.techniques.map((technique) => {
            return <li
                key={technique.id}
                value={technique.id}>{technique.name}</li>
        });
    }

    renderTechnologiesList = () => {
        return this.state.technologies.map((technology) => {
            return <li
                key={technology.id}
                value={technology.id}>{technology.name}</li>
        });
    }

    renderEvaluationsList = () => {
        return this.state.evaluations.map((evaluation) => {
            return <li>{evaluation.techniqueName} - {evaluation.technologyName}</li>
        });
    }

    renderHeader = () => {
        return this.state.technologies.map((technology) => {
            return <th
                key={technology.id}
                value={technology.id}>{technology.name}</th>
        });
    }

    renderRows = () => {
        var arr = this.state.matrix;
        return arr.map((row)=>{
            console.log("row",row);
            return <tr>{row.map((cell)=>{
                console.log("cell",cell);
                if(cell!==undefined){
                    console.log("entro")
                    const route = "../evaluation/" + cell.id;
                    return <td><a href={route}>{cell.techniqueName + "-" +cell.technologyName}</a></td>
                } else {
                    return <td>No data available</td>
                }
            })}</tr>
        });
    }

    render() {
        var screen = <div>Nada</div>;
        if(this.state.matrix !== undefined){
            screen = (<table>
            <tbody>
                <tr>
                    {this.renderHeader()}
                </tr>
                {this.renderRows()}
            </tbody>
        </table>);
        }
        return (
            <div>
                {screen}

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
