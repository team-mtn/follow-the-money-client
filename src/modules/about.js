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

        <Header height={"short"} imageID={"side-logo"} page={"about"}/>

        <main main className="about no-background">
          <section className="section">
            <h1>About Follow The Money</h1>
            <p>Follow the money approaches the current political climate with an eye towards how much money presidential candidates are given and by whom. Trying to create a connection and awareness between the top level candidates, their donating block, and what is happening in the news. Hopefully highlighting corporate connections and social disconnection by revealing a candidates funding base. Of course we cannot provide the names of the contributors but you may infer the income level of those that donate by the range categories provided.</p><br/>
            <p><strong> Remember, there is a maximum that can be contributed by a single person.</strong></p><br/>
            <p>In no way is this an exhaustive capture of all the candiates that have applied for the presidnency but is meant to give an overview of the field with some compiled current news artilcles about them.  A look is also taken at the five top funded candidates in a compartiive graph to reveal the disparity between the top two and all others. Here again we look to the range of donations to see the supporting base.</p>
          </section>

          <section className="half-section">
            <h1>About the Project</h1>
            <p>Folow the money is a class project designed to show off the coding talents of its creators. They use a SNER stack (SQL, Node.js, Express, React) with two API calls. One to the Federal Election Commission and another to newsapi.org. The project is broken down into two separate repos; the client side and the server side. This is done both for a separation of concerns and GitHub merge confilict prevention.</p>
          </section>
          <section className="half-section">
            <h1>About the Creators</h1>

            <article>
              <img style={{ width: '50px' }} src="../images/cool-cats.jpg" alt="I am the Walrus. Coo-Coo-Ca-Chew" />
              <p>Marisha "The Beast" Hoza hailing from Alaska prefers to met out justice with her over-under and a hatchet. Between brawls in the thunder dome she smashes out code with the gleee of a cougar on a rabbit.</p>
            </article>
            <article>
              <img style={{ width: '50px' }} src="../images/dog-gone.jpg" alt="I am the Walrus. Coo-Coo-Ca-Chew" />
              <p>Nhu "I'll Cut You!" Trinh a top level graduate of the general assembly bootcamp learned how to survive in the code with twin balisongs. She ahs turned her raw talent into a formidable career cutting up code and serving it with some fava beans and a nice chianti..</p>
            </article>
            <article>
              <img style={{ width: '50px' }} src="../images/i-am-the-walrus.jpg" alt="I am the Walrus. Coo-Coo-Ca-Chew" />
              <p>Travis "The Mad Man" Cox in the relentless pursuit for his totem animal finds new and imaginative ways to hunt and consume programs. In the evening you will find him in his kennel recursively gnawing a piece of code to its binary roots.</p>
            </article>
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
