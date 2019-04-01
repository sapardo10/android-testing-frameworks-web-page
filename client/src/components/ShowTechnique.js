import React, { Component } from 'react'
import { Jumbotron, ListGroupItem, ListGroupItemHeading,
    ListGroup, Container } from 'reactstrap';

export default class ShowTechnique extends Component {

    state = {
        technique: undefined,
        evaluations: [],
        error: true
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



    renderTechnologiesList = () => {
        return this.state.evaluations.map((evaluation) => {
            const route = '../evaluation/' + evaluation.id;
            return (
                <ListGroupItem tag="a" href={route} action>
                    <ListGroupItemHeading>{evaluation.technologyName}</ListGroupItemHeading>
                    
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

    renderTechniqueScreen = () => {
        const tech = this.state.technique;
        return (
            <div>
                <Jumbotron>
                    <h1 className="display-3">{tech.name}</h1>
                    <p className="lead">{tech.description}</p>
                    <hr className="my-2" />
                    <p className="lead">{tech.type}</p>
                </Jumbotron>
                <Container>
                <h3>Evaluations:</h3>
                <ListGroup>
                    {this.renderTechnologiesList()}
                </ListGroup>
                </Container>
            </div>
        );
    }

    render() {
        console.log(this.state.technique);
        var screen = this.renderErrorScreen();
        if (!this.state.error && this.state.technique !== undefined) {
            screen = this.renderTechniqueScreen();
        }

        return (
            <div>
                {screen}
            </div>
        )
    }
}
