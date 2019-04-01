import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateTechnology from './CreateTechnology';
import CreateTechnique from "./CreateTechnique";
import CreateEvaluation from "./CreateEvaluation";
import ShowTechnology from "./ShowTechnology";
import ShowEvaluation from "./ShowEvaluation";
import App from '../App';
import ShowTechnique from "./ShowTechnique";

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create-evaluation">Create evaluation</Link>
            </li>
            <li>
              <Link to="/create-technology">Create technology</Link>
            </li>
            <li>
              <Link to="/create-technique">Create technique</Link>
            </li>
            <li>
              <Link to="/technology/1">Show Technology</Link>
            </li>
            <li>
              <Link to="/evaluation/1">Show Evaluation</Link>
            </li>
            <li>
              <Link to="/technique/1">Show Technique</Link>
            </li>
          </ul>
        </nav>

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

export default AppRouter;