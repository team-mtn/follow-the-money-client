import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

import Header from './header.js';
import "../css/about.css";

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;
  this.data = [
    {range: 1, earnings: parseInt(data.size0)},
    {range: 2, earnings: parseInt(data.size200)},
    {range: 3, earnings: parseInt(data.size500)},
    {range: 4, earnings: parseInt(data.size1k)},
    {range: 5, earnings: parseInt(data.size2k)},
  ];
}


class Election extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      politicians: [],
    };
  }

  handleSearch = event => {
    event.preventDefault();
    superagent.get(`https://follow-the-money-server.herokuapp.com/allpoliticians`).query().then(serverResponse => {
      let temp = [];
      serverResponse.body.map(candidate => {
        temp.push(new Candidate(candidate));
      })
      this.setState({politicians: temp});
      console.log(this.state);
    })
  }

  render() {
    return (
      <React.Fragment>
        <Header height={'short'} imageID={'side-logo'}/>
        <section>
          <section>
            <form onSubmit={this.handleSubmit}>
              <h1>Search all Candidates</h1>
              <input type="submit" value="Submit" onClick={this.handleSearch}/>
            </form>
          </section>

          <section id="wiki">
            <h2>h2</h2>

            <p>p</p>
          </section>

          <section style={{ width: '50%', margin: 'auto', backgroundColor: 'white', borderRadius: '100px' }}>
            <h1>Victory Tutorial</h1>
            <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
              <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />
              <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
              <VictoryStack colorScale={'red'}>
                {/* <VictoryBar data={this.state.politicians[0].data} x={'range'} y={'earnings'} /> */}
              </VictoryStack>
            </VictoryChart>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Election;
