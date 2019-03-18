import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateEvaluation from './createEvaluation';
import App from '../App';

function Users() {
  return <h2>Users</h2>;
}

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
              <Link to="/compare">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={App} />
        <Route path="/compare/" component={CreateEvaluation} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;