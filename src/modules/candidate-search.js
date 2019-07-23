import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

class CandidateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'no one',
      candidateList: ['', 'sanders, bernie', 'clinton, hillary', 'trump, donald'],
      candidate: { candidate_id: 'P9723466', candidate_name: 'SANDERS, BERINIE', data: [{ range: 1, earnings: 13000 }, { range: 2, earnings: 16500 }, { range: 3, earnings: 14250 }, { range: 4, earnings: 19000 }, { range: 5, earnings: 19000 }], wiki: { data: 'whatever we want goes here' }, twitter: {} }
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    alert(`You have selected ${this.state.value} to research.`);
    event.preventDefault();
  };

  render() {
    let optionList = this.state.candidateList.map(v => <option value={v}>{v}</option>);
    return (
      <section>
        <section>
          <form onSubmit={this.handleSubmit}>
            <h1>Search For A Candidate By Name</h1>
            <select value={this.state.value} onChange={this.handleChange}>
              {optionList}
            </select>

            <input type="submit" value="Submit" />
          </form>
        </section>

        <section id="wiki">
          <h2>{this.state.candidate.candidate_name}</h2>

          <p>{this.state.candidate.wiki.data}</p>
        </section>

        <section style={{ width: '50%', margin: 'auto', backgroundColor: 'white', borderRadius: '100px' }}>
          <h1>Victory Tutorial</h1>
          <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
            <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />
            <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
            <VictoryStack colorScale={'red'}>
              <VictoryBar data={this.state.candidate.data} x={'range'} y={'earnings'} />
            </VictoryStack>
          </VictoryChart>
        </section>
      </section>
    );
  }
}

export default CandidateSearch;
