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
        <Header height={'short'} imageID={'side-logo'}/>
        <main main className="about no-background">
          <section className="section">About Follow The Money</section>
          <section className="half-section">
            <h1>About the Project</h1>
          </section>
          <section className="half-section">
            <h1>About the Creators</h1>
          </section>
        </main>
      </React.Fragment>
    );
  }
}


export default About;