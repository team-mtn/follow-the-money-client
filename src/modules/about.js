import React from 'react';

import Header from './header.js';
import '../css/about.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>

        <Header height={'short'} imageID={'side-logo'}/>
        <main className="about no-background">
          <section className="section">About Follow The Money</section>
          <section className="half-section">
            <h1>About the Project</h1>
          </section>
          <section className="half-section">
            <h1>About the Creators</h1>
            <article>
              <img style={{ width: '50px' }} src="../images/i-am-the-walrus.jpg" alt="I am the Walrus. Coo-Coo-Ca-Chew" />
              <p>Travis "The Mad Man" Cox is in the relentless pursuit for his totem animal.</p>
            </article>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default About;
