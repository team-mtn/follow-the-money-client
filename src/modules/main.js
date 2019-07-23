import React from 'react';
import { Route } from 'react-router-dom';
import superagent from 'superagent';

import Home from './home.js';
import CandidateSearch from './candidate-search.js';
import Election from './election.js';
import About from './about.js';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      politicians: [],
    };
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/search-by-candidate" component={CandidateSearch} />
        <Route path="/search-by-election" component={Election} />
        <Route path="/about" component={About} />
      </React.Fragment>
    );
  }
}

export default Main;
