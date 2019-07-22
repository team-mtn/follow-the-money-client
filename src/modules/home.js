import React from 'react';


class Home extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return(
      <main>
        <section>this section is for information and stuff like that</section>
        <button>This is a button</button>
        <button>This is a button</button>
        <button>This is a button</button>
      </main>
    );
  }
}


export default Home;