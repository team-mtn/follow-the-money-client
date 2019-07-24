import React from 'react';

import Header from './header.js';
import "../css/about.css";


class About extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return(
      <React.Fragment>
        <Header imageID={'side-logo'}/>
        <main className="about">
          <section>About Follow The Money</section>
          <section>
            <h1>About the Project</h1>
          </section>
          <section>
            <h1>About the Creators</h1>
          </section>
        </main>
      </React.Fragment>
    );
  }
}


export default About;