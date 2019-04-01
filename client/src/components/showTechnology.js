import React, { Component } from 'react';
import { Jumbotron, ListGroupItem, ListGroupItemHeading,
ListGroup, Container } from 'reactstrap';

export default class ShowTechnology extends Component {

    state = {
        evaluations: [],
        technology: undefined,
        error: false,
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.getTechnologyFromDb(params.id);
    }

    getEvaluationsOfTechnology = () => {
        const name = this.state.technology.name;
        fetch("http://localhost:3001/evaluations/technology/" + name)
            .then(data => data.json())
            .then(res => this.setState({ evaluations: res.data, error: false }))
            .catch(err => this.setState({ error: true }));
    }

    getTechnologyFromDb = (id) => {
        fetch("http://localhost:3001/technologies/get/" + id)
            .then(data => data.json())
            .then(res => this.setState({ technology: res.data, error: false }))
            .then(() => {
                if (this.state.technology !== undefined) {
                    this.getEvaluationsOfTechnology()
                }
            })
            .catch(err => this.setState({ error: true }));
    }


    renderTechniquesList = () => {
        return this.state.evaluations.map((evaluation) => {
            const route = '../evaluation/' + evaluation.id;
            return (
                <ListGroupItem tag="a" href={route} action>
                    <ListGroupItemHeading>{evaluation.techniqueName}</ListGroupItemHeading>
                    
                </ListGroupItem>
            );

        });
    }

    renderErrorScreen = () => {
        return (
            <div>
                <h1>There isn't any evaluation with that id</h1>
            </div>
        );
    }

    renderTechnologyScreen = () => {
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">
                    Technology : <a
                    href={this.state.technology.url}>
                    {this.state.technology.name}
                </a></h1>
                    <p className="lead">{this.state.technology.description}</p>
                    <hr className="my-2" />
                    <p className="lead">Creator : {this.state.technology.creator}</p>
                </Jumbotron>
                <Container>
                <img
                    src={this.state.technology.imageurl}
                    width="200"
                    height="200"
                    alt={'Icon of ' + this.state.technology.name} />
                <br />
                <br />
                <hr/>
                <h3>Evaluations:</h3>
                <ListGroup>
                    {this.renderTechniquesList()}
                </ListGroup>
                </Container>
            </div>
        );
    }
    render() {
        var screen = this.renderErrorScreen();
        if (!this.state.error && this.state.technology !== undefined) {
            screen = this.renderTechnologyScreen();
        }
        return (
            <div>
                {screen}
            </div>
        )
    }
}
