import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CategoryContainer from '../../views/Category/CategoryContainer';
import HomeContainer from '../../views/Home/HomeContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={HomeContainer} />
            <Route path="/categories/:id" component={CategoryContainer} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
