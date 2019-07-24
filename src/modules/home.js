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
        <Header height={'tall'} imageID={'hero-logo'}/>
        <main>
          <section>this section is for information and stuff like that</section>
          <div id="person-icon"></div>
          <div id="people-icon"></div>
          <Link to="/search-by-candidate">
            <button>
              This is a Link to candidate
            </button>
          </Link>
          <Link to="/search-by-election">
            <button>
              This is a Link to election
            </button>
          </Link>
          <Link to="/about">
            <button>
              This is a Link to about
            </button>
          </Link>
        </main>
      </React.Fragment>
    );
  }
}


export default Home;