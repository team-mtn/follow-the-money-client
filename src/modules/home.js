import React from 'react';
import { Link } from "react-router-dom";
import superagent from 'superagent';


class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  };

  render() {
    return(
      <main>
        <section>this section is for information and stuff like that</section>
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
    );
  }
}


export default Home;