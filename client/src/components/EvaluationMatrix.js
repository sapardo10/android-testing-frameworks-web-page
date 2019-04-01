import React, { Component } from 'react';
import {
    Table, Container, Card, CardTitle, CardText
    , Button, Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Jumbotron,
    ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';


export default class EvaluationMatrix extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            technologies: [],
            techniques: [],
            evaluations: [],
            apiResponse: 0,
            matrix: undefined
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.technologies.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.technologies.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
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

    renderTechnologiesList = () => {

        return this.state.technologies.map((technology) => {
            const route = "./technology/" + technology.id;
            return (
                <CarouselItem

                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={technology.imageurl}
                >
                    <img height="200px" width="200px" src={technology.imageurl} />
                    <CarouselCaption
                        className="text-secondary"
                        key={technology.id}
                        captionText={technology.name}
                        captionHeader={technology.name}
                        href={route} />
                </CarouselItem>);
        });
    }

    renderTechniquesList = () => {
        return this.state.techniques.map((technique) => {
            const route = './technique/' + technique.id;
            return (
                <ListGroupItem tag="a" href={route} action>
                    <ListGroupItemHeading>{technique.name}</ListGroupItemHeading>
                    <ListGroupItemText>
                        {technique.description.substring(0, 32)}</ListGroupItemText>
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
        return arr.map((row) => {
            console.log("row", row);
            return <tr>{row.map((cell) => {
                console.log("cell", cell);
                if (cell !== undefined) {
                    console.log("entro")
                    const route = "../evaluation/" + cell.id;
                    var color = '#333';
                    const rate = cell.numericalEvaluation;
                    if (rate > 0 && cell.numericalEvaluation <= 3) {
                        color = "danger"
                    } else if (rate > 3 && cell.numericalEvaluation <= 6) {
                        color = "warning"
                    } else if (rate > 6 && cell.numericalEvaluation <= 8) {
                        color = "info"
                    } else if (rate > 8 && cell.numericalEvaluation <= 10) {
                        color = "success"
                    }
                    return <td>
                        <Card body inverse color color={color}>
                            <CardTitle>{cell.techniqueName + "-" + cell.technologyName}</CardTitle>
                            <CardText>{cell.textEvaluation.substring(0, 50) + "..."}</CardText>
                            <Button color="secondary" href={route}>
                                See details
                            </Button>
                        </Card>
                    </td>
                } else {
                    return <td>No data available</td>
                }
            })}</tr>
        });
    }

    render() {
        const { activeIndex } = this.state;
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
                    <Carousel
                        activeIndex={activeIndex}
                        next={this.next}
                        previous={this.previous}
                    >
                        <CarouselIndicators items={this.state.technologies} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                        {this.renderTechnologiesList()}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>

                    <br />
                    <hr />
                    <h1>Techniques</h1>
                    <br />
                    <br />
                    <ListGroup>
                        {this.renderTechniquesList()}
                    </ListGroup>


                </Container>
            </div>
        )
    }
}
