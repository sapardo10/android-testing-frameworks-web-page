import React, { Component } from "react";
import EvaluationMatrix from "./components/EvaluationMatrix";

class App extends Component {
  state = {
    data: [],
  };

  render() {
    return (
      <div>
        <EvaluationMatrix/>
      </div>
    );
  }
}

export default App;
