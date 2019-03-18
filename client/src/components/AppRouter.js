import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateEvaluation from './createEvaluation';
import App from '../App';

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
              <Link to="/compare">Compare</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={App} />
        <Route path="/compare/" component={CreateEvaluation} />
      </div>
    </Router>
  );
}

export default AppRouter;