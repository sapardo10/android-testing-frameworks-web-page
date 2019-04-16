import React, { Component } from 'react';
import axios from "axios";
import {
  Container, Col, Form, Button,
  FormGroup, Label, Input, FormText, FormFeedback,
} from 'reactstrap';
import '../App.css';

export default class CreateEvaluation extends Component {

  state = {
    techniques: [],
    technologies: [],
    id: undefined,
    technologyId: undefined,
    techniqueId: undefined,
    technique: undefined,
    technology: undefined,
    codesnippet: undefined,
    youtubeurl: undefined,
    textEvaluation: undefined,
    numericalEvaluation: undefined,
    githubUrl: undefined,
    validate: {
      emailState: '',
      urlState: '',
      youtubeState: '',
      evaluationState:'',
      numericalState:'',
      githubUrlState:'',
    },
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

    axios.post("http://localhost:3001/evaluations/create", {
      id: this.state.id,
      technologyId: this.state.technology.id,
      techniqueId: this.state.technique.id,
      technologyName: this.state.technology.name,
      techniqueName: this.state.technique.name,
      codesnippet: this.state.codesnippet,
      youtubeurl: this.state.youtubeurl,
      textEvaluation: this.state.textEvaluation,
      numericalEvaluation: this.state.numericalEvaluation,
      githubUrl: this.state.githubUrl
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateEvaluation = () => {
    let objIdToUpdate = this.state.idtechnique;

    axios.post("http://localhost:3001/evaluations/update", {
      id: objIdToUpdate,
      update: { message: "" }
    });
  };

  renderTechniquesOptions = () => {
    return this.state.techniques.map((technique) => {
      return <option
        key={technique.name}
        value={technique.id}>{technique.name}</option>
    });
  }

  renderTechnologiesOptions = () => {
    return this.state.technologies.map((technology) => {
      return <option 
        key={technology.name}
        value={technology.id}>{technology.name}</option >
    });
  }

  onChangeTechnique = (event) => {
    event.preventDefault();
    var target = event.target.value;
    console.log(target)
    var id = parseInt(target,10);
    console.log("technique",id);
    var tech = this.state.techniques[id];
    console.log("technique",tech);
    this.setState({ technique: tech });
  }

  onChangeTechnology = (event) => {
    event.preventDefault();
    var target = event.target.value;
    var id = parseInt(target,10);
    var tech = this.state.technologies[id];
    this.setState({ technology: tech });
  }

  validateEmail = (e) => {
    const { validate } = this.state
    if (e.target.value !== "") {
      validate.emailState = 'has-success'
      this.setState({ id: e.target.value })
    } else {
      validate.emailState = 'has-danger'
    }
    this.setState({ validate })
  }

  validateUrl = (e) => {
    const { validate } = this.state
    if (e.target.value !== "") {
      validate.urlState = 'has-success'
      this.setState({ codesnippet: e.target.value })
    } else {
      validate.urlState = 'has-danger'
    }
    this.setState({ validate })
  }
  validateGithubUrl = (e) => {
    const urlRex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const { validate } = this.state
    if (urlRex.test(e.target.value)) {
      validate.githubUrlState = 'has-success'
      this.setState({ githubUrl: e.target.value })
    } else {
      validate.githubUrlState = 'has-danger'
    }
    this.setState({ validate })
  }

  validateYoutube = (e) => {
    const { validate } = this.state
    if (e.target.value !== "") {
      validate.youtubeState = 'has-success'
      this.setState({ youtubeurl: e.target.value })
    } else {
      validate.youtubeState = 'has-danger'
    }
    this.setState({ validate })
  }

  validateEvaluation = (e) => {
    const { validate } = this.state
    if (e.target.value !== "") {
      validate.evaluationState = 'has-success'
      this.setState({ textEvaluation: e.target.value })
    } else {
      validate.evaluationState = 'has-danger'
    }
    this.setState({ validate })
  }

  validateRating = (e) => {
    const { validate } = this.state
    if (e.target.value >= 0 && e.target.value <=10 && e.target.value !== "") {
      validate.numericalState = 'has-success'
      this.setState({ numericalEvaluation: e.target.value })
    } else {
      validate.numericalState = 'has-danger'
    }
    this.setState({ validate })
  }

  render() {
    var message = <h1>Create evaluation</h1>;
    if(this.state.technique!== undefined && this.state.technology!==undefined){
      message = <h1>Evaluate {this.state.technology.name} doing {this.state.technique.name}</h1>
    }
    return (
      <Container>
        <h1>{message}</h1>
        <Container className="create-form">
        <Form >
          <Col>
          <FormGroup>
            <Label>Techniques</Label>
            <Input 
              type="select"
              onChange={this.onChangeTechnique}>
              <option disabled selected>Select one</option>
              {this.renderTechniquesOptions()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Technologies</Label>
            <Input 
              type="select"
              onChange={this.onChangeTechnology}>
              <option  disabled selected >Select one</option >
              {this.renderTechnologiesOptions()}
            </Input >
          </FormGroup>
          </Col>
          <Col>
            <FormGroup >
              <Label>Id</Label>
              <Input
                required
                type="number"
                onChange={this.validateEmail}
                placeholder="id"
                valid={this.state.validate.emailState === 'has-success'}
                invalid={this.state.validate.emailState === 'has-danger'}
              />
              <FormText>Id to identify the evaluation</FormText>
              <FormFeedback valid>
                Valid id!
              </FormFeedback>
              <FormFeedback invalid>
                Please provide a valid numerical id
              </FormFeedback>
            </FormGroup >
          </Col>
          <Col>
            <FormGroup>
              <Label>Code snippet</Label>
              <Input
                type="text"
                name="codesnippet"
                onChange={this.validateUrl}
                placeholder="codesnippet"
                valid={this.state.validate.urlState === 'has-success'}
                invalid={this.state.validate.urlState === 'has-danger'}
              />              
              <FormText>Gist from github please!</FormText>
              <FormFeedback invalid>
                Invalid url
              </FormFeedback>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Youtube Url</Label>
              <Input
                type="text"
                onChange={this.validateYoutube}
                placeholder="youtubeurl"
                valid={this.state.validate.youtubeState === 'has-success'}
                invalid={this.state.validate.youtubeState === 'has-danger'}
              />
              <FormFeedback invalid>
                Invalid id from youtube
              </FormFeedback>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Evaluation</Label>
              <Input
                type="textarea"
                onChange={this.validateEvaluation}
                valid={this.state.validate.evaluationState === 'has-success'}
                invalid={this.state.validate.evaluationState === 'has-danger'}
                            
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Numerical Evaluation</Label>
              <Input
                type="number"
                onChange={this.validateRating}
                placeholder="numerical evaluation"
                valid={this.state.validate.numericalState === 'has-success'}
                invalid={this.state.validate.numericalState === 'has-danger'}
              />
              <FormText>Rate the suitability from 1 to 10</FormText>
              <FormFeedback valid>
                Valid rating!
              </FormFeedback>
              <FormFeedback invalid>
                Please provide a valid numerical rating
              </FormFeedback>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <Label>Github url</Label>
              <Input
                type="text"
                onChange={this.validateGithubUrl}
                placeholder="github url"
                valid={this.state.validate.githubUrlState === 'has-success'}
                invalid={this.state.validate.githubUrlState === 'has-danger'}
              
              />
              <FormText>Link to github repository</FormText>
              <FormFeedback invalid>
                Invalid url
              </FormFeedback>
            </FormGroup>
          </Col>
          <Col>
          <Button  color="success" onClick={() => this.addEvaluation()}>
            Add evaluation
          </Button>
          </Col>
        </Form>
        </Container>
      </Container>
    )
  }
}
