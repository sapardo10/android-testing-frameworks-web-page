import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateTechnology from './CreateTechnology';
import CreateTechnique from "./CreateTechnique";
import CreateEvaluation from "./CreateEvaluation";
import ShowTechnology from "./ShowTechnology";
import ShowEvaluation from "./ShowEvaluation";
import App from '../App';
import ShowTechnique from "./ShowTechnique";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Android testing</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
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
              </Nav>
            </Collapse>
          </Navbar>

          <Route path="/" exact component={App} />
          <Route path="/create-evaluation/" component={CreateEvaluation} />
          <Route path="/create-technology/" component={CreateTechnology} />
          <Route path="/create-technique/" component={CreateTechnique} />
          <Route path="/technology/:id" component={ShowTechnology} />
          <Route path="/evaluation/:id" component={ShowEvaluation} />
          <Route path="/technique/:id" component={ShowTechnique} />
        </div>
      </Router>
    );
  }
}
