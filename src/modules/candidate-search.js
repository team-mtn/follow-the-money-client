import React from 'react';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;
  this.data = [{ range: 1, earnings: parseInt(data.size0) }, { range: 2, earnings: parseInt(data.size200) }, { range: 3, earnings: parseInt(data.size500) }, { range: 4, earnings: parseInt(data.size1k) }, { range: 5, earnings: parseInt(data.size2k) }];
}

class CandidateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Candidate Name',
      currentCandidate: 0,
      politicians: [
        {
          candidate_id: 'placeholder1',
          candidate_name: 'placeholder',
          party: 'libertas',
          data: [{ range: 1, earnings: 5 }, { range: 2, earnings: 10 }, { range: 3, earnings: 15 }, { range: 4, earnings: 20 }, { range: 5, earnings: 25 }]
        }
      ],
      wiki: { data: 'whatever we want goes here' },
      twitter: {}
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

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    let optionList = this.state.politicians.map((v, i) => (
      <option key={i} index={i} value={v.candidate_name}>
        {v.candidate_name}
      </option>
    ));

    return (
      <section>
        <section>
          <form onSubmit={this.handleSubmit}>
            <h1>Search For A Candidate By Name</h1>
            <select value={this.state.value} onChange={this.handleChange}>
              <option>Select Candidate</option>
              {optionList}
            </select>
          </form>
        </section>
        {this.state.value === 'Candidate Name' ? (
          ''
        ) : (
          <section id="wiki" style={{ width: '50%', margin: '2vh auto 2vh auto', backgroundColor: 'white', borderRadius: '10px' }}>
            <h2>{this.state.value}</h2>

            <p>{this.state.wiki.data}</p>
          </section>
        )}
        {this.state.value === 'Candidate Name' ? (
          ''
        ) : (
          <section style={{ width: '50%', margin: '2vh auto 2vh auto', backgroundColor: 'white', borderRadius: '10px' }}>
            <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
              <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />
              <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
              <VictoryStack colorScale={'red'}>
                <VictoryBar data={this.state.politicians.filter(v => v.candidate_name === this.state.value)[0].data} x={'range'} y={'earnings'} />
              </VictoryStack>
            </VictoryChart>
          </section>
        )}
      </section>
    );
  }
}

export default CandidateSearch;
