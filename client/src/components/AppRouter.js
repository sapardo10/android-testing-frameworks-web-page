import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateTechnology from './CreateTechnology';
import CreateTechnique from "./CreateTechnique";
import CreateEvaluation from "./CreateEvaluation";
import ShowTechnology from "./ShowTechnology";
import ShowEvaluation from "./ShowEvaluation";
import App from '../App';
import ShowTechnique from "./ShowTechnique";
import Login from "./Login";
import fire from "../config/Fire";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Alert
} from 'reactstrap';
import Profile from "./Profile";

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.state = {
      isOpen: false,
      user: {},
      visible: false,
      message: "",
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.email);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
        
      }
    });
  }

  signout = () => {
    console.log("logout");
    fire.auth().signOut();
    this.setState({
      message: "You are logged out! Log in to support this project!",
      visible: true,
    });
  }

  render() {
    var items = undefined;
    if (this.state.user) {

      if(this.state.user.email === "prueba33@prueba.com"){
        items = (
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create-evaluation">Create evaluation</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create-technology">Create technology</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create-technique">Create technique</NavLink>
              </NavItem>
              <NavItem><Button onClick={this.signout}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        );
      } else {
        items = (
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/create-evaluation">Create evaluation</NavLink>
              </NavItem>
              <NavItem><Button onClick={this.signout}>Logout</Button>
              </NavItem>
            </Nav>
          </Collapse>
        );
      }
      
    } else {
      items = (
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">Login / Register</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      );
    }
    return (
      <div>
        <Router>

          <div>
            <Navbar color="light" light expand="md">
              <NavbarBrand href="/">Android testing</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              {items}
            </Navbar>
            <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>

            <Route path="/" exact component={App} />
            <Route path="/create-evaluation/" component={CreateEvaluation} />
            <Route path="/create-new-evaluation/:id" component={CreateEvaluation} />
            <Route path="/create-technology/" component={CreateTechnology} />
            <Route path="/create-technique/" component={CreateTechnique} />
            <Route path="/technology/:id" component={ShowTechnology} />
            <Route path="/evaluation/:id/:idsubmission?" component={ShowEvaluation} />
            <Route path="/technique/:id" component={ShowTechnique} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/user/:id" component={Profile} />
          </div>
        </Router>
      </div>
    );
  }
}
