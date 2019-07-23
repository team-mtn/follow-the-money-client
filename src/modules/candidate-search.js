import React from 'react';
import ReactDOM from 'react-dom';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

class CandidateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'coconut',
      candidateList: ['sanders, bernie', 'clinton, hillary', 'trump, donald'],
      candidate: { candidate_id: 'P9723466', candidate_name: 'SANDERS, BERINIE', data: [{ range: 1, earnings: 13000 }, { range: 2, earnings: 16500 }, { range: 3, earnings: 14250 }, { range: 4, earnings: 19000 }, { range: 5, earnings: 19000 }], wiki: {}, twitter: {} }
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
      <article>
        <section>
          <form onSubmit={this.handleSubmit}>
            <h1>Search For A Candidate By Name</h1>
            <select value={this.state.value} onChange={this.handleChange}>
              {optionList}
            </select>

            <input type="submit" value="Submit" />
          </form>
        </section>
        <section>{this.state.wiki}</section>
        <section style={{ width: '50%', margin: 'auto', backgroundColor: 'white', borderRadius: '100px'}}>
          <h1>Victory Tutorial</h1>
          <VictoryChart ChartdomainPadding={10} theme={VictoryTheme.material}>
            <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />
            <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
            <VictoryBar data={this.state.candidate.data} x={'range'} y={'earnings'} />
          </VictoryChart>
        </section>
      </article>
    );
  }
}

export default CandidateSearch;
