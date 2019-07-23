import React from 'react';

import "../css/about.css";


class About extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return(
      <main className="about">
        <section>
          <h1>About the Project</h1>
        </section>
        <section>
          <h1>About the Creators</h1>
        </section>
      </main>
    );
  }
}


export default About;