import React, { Component } from 'react';
import {
    Table, Container, Card, 
    CardTitle, CardText, Button,
    Jumbotron, ListGroup, ListGroupItem, 
    ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';
import { Redirect } from 'react-router-dom';


export default class EvaluationMatrix extends Component {

    constructor(props) {
        super(props);
        this.state = {
            technologies: [],
            techniques: [],
            evaluations: [],
            apiResponse: 0,
            matrix: undefined
        };
    }


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

    renderRedirect = () => {
        console.log('redirect')
        if (this.state.redirect) {
            const route = '/';
            return <Redirect to={route} />
        }
    }

    renderTechnologiesList = () => {

        return this.state.technologies.map((technology) => {
            const route = "./technology/" + technology.id;
            return (
                <ListGroupItem key={technology.imageurl} tag="a" href={route} action>
                    <ListGroupItemHeading>{technology.name}</ListGroupItemHeading>
                    <ListGroupItemText>
                        {technology.description.substring(0, 60) + "..."}</ListGroupItemText>
                </ListGroupItem>);
        });
    }

    renderTechniquesList = () => {
        return this.state.techniques.map((technique) => {
            const route = './technique/' + technique.id;
            return (
                <ListGroupItem key = {technique.name} tag="a" href={route} action>
                    <ListGroupItemHeading>{technique.name}</ListGroupItemHeading>
                    <ListGroupItemText>
                        {technique.description.substring(0, 60) + "..."}</ListGroupItemText>
                </ListGroupItem>
            );

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
        return arr.map((row,j) => {
            return <tr key={j}>{row.map((cell,i) => {
                if (cell !== undefined) {
                    const route = "../evaluation/" + cell.id;
                    const submission = cell.submissions[0];
                    var color = '#333';
                    const rate = submission.numericalEvaluation;
                    if (rate >= 0 && submission.numericalEvaluation <= 1) {
                        color = "danger"
                    } else if (rate > 1 && submission.numericalEvaluation <= 3) {
                        color = "warning"
                    } else if (rate > 3 && submission.numericalEvaluation <= 4) {
                        color = "info"
                    } else if (rate > 4 && submission.numericalEvaluation <= 5) {
                        color = "success"
                    }
                    return <td key ={cell.techniqueName + "-" + cell.technologyName}>
                        <Card body inverse color={color}>
                            <CardTitle>{cell.techniqueName + "-" + cell.technologyName}</CardTitle>
                            <CardText>{submission.textEvaluation.substring(0, 50) + "..."}</CardText> 
                            <Button color="secondary" href={route}>
                                See details
                            </Button>
                        </Card>
                    </td>
                } else {
                    return <td key={i}>No data available</td>
                }
            })}</tr>
        });
    }

    render() {
        var screen = <div>Nada</div>;
        if (this.state.matrix !== undefined) {
            screen = (<Table dark>
                <thead>
                    <tr>
                        {this.renderHeader()}
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </Table>);
        }
        return (
            <div>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">Which technology to use?</h1>
                        <p className="lead">On the matrix below you will find the reports of different testing techniques across differente testing frameworks for android. Find out which will suit best your needs!</p>
                    </Container>
                </Jumbotron>

                <Container>
                    {screen}
                    <br />
                    <hr />
                    <h1>Technologies</h1>
                    <br />
                    <br />
                    <ListGroup>
                        {this.renderTechnologiesList()}
                    </ListGroup>
                    <br />
                    <hr />
                    <h1>Techniques</h1>
                    <br />
                    <br />
                    <ListGroup>
                        {this.renderTechniquesList()}
                    </ListGroup>
                    <br />
                    <br />
                    <hr />


                </Container>
            </div>
        )
    }
}
