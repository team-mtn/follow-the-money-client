import React from 'react';
import '../css/core.scss';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './home.js';
import CandidateSearch from './candidate-search.js';
import Election from './election.js';
import About from './about.js';

// import SERVER_URL from './constants/server';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/search-by-candidate" component={CandidateSearch} />
          <Route path="/search-by-election" component={Election} />
          <Route path="/about" component={About} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
