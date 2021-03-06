import React from 'react';
import { Link } from "react-router-dom";
import Header from './header.js';

class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  };

  render() {
    return(
      <React.Fragment>
        <Header height={"tall"} imageID={"hero-logo"} page={"home"}/>
        <main>
          <div id="person-icon"></div>
          <div id="people-icon"></div>
          <Link to="/search-by-candidate">
            <button>
              Search by Candidate
            </button>
          </Link>
          <Link to="/view-top-candidates">
            <button>
              View Top Candidates
            </button>
          </Link>
          <Link to="/about">
            <button>
              About Us
            </button>
          </Link>
        </main>
      </React.Fragment>
    );
  }
}


export default Home;