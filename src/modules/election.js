import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

import Header from './header.js';
import '../css/about.css';

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;
  this.total = this.data.reduce((t, v) => (t += v.earnings), 0);
  this.data = [{ range: 1, earnings: data.size0 === null ? 0 : parseInt(data.size0) }, { range: 2, earnings: data.size200 === null ? 0 : parseInt(data.size200) }, { range: 3, earnings: data.size500 === null ? 0 : parseInt(data.size500) }, { range: 4, earnings: data.size1k === null ? 0 : parseInt(data.size1k) }, { range: 5, earnings: data.size2k === null ? 0 : parseInt(data.size2k) }];
}

class Election extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      politicians: []
    };
  }

  componentDidMount() {
    console.log('say anything');
    superagent
      .get(`https://follow-the-money-server.herokuapp.com/allpoliticians`)
      .query()
      .then(serverResponse => {
        let temp = [];
        serverResponse.body.map(candidate => {
          temp.push(new Candidate(candidate));
        });
        console.log('temp: ', temp);
        this.setState({ politicians: temp });
        console.log('this.setState: right here', this.state.politicians);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header imageID={'side-logo'} />
        <section>
          <form onSubmit={this.handleSubmit}>
            <h1>Search all Candidates</h1>
            <input type="submit" value="Submit" onClick={this.handleSearch} />
          </form>
        </section>

        <section id="wiki">
          <h2>h2</h2>

          <p>p</p>
        </section>

        <section style={{ width: '50%', margin: 'auto', backgroundColor: 'white', borderRadius: '100px' }}>
          <h1>Funding</h1>
          <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
            <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />

            <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
            <VictoryStack colorScale={'red'}>
              <VictoryBar data={this.state.politicians[0].data} x={'range'} y={'earnings'} />
            </VictoryStack>
          </VictoryChart>
        </section>
      </React.Fragment>
    );
  }
}

export default Election;
