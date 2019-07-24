import React from 'react';

import Header from './header.js';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>

        <Header height={'short'} imageID={'side-logo'}/>

        <main main className="about no-background">
          <section className="section">
            <h1>About Follow The Money</h1>
          </section>

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
