import React from 'react';
import ReactDOM from 'react-dom';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryLegend } from 'victory';

import Header from './header.js';

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;

  this.data = [{ range: 1, earnings: data.size0 === null ? 0 : parseInt(data.size0) }, { range: 2, earnings: data.size200 === null ? 0 : parseInt(data.size200) }, { range: 3, earnings: data.size500 === null ? 0 : parseInt(data.size500) }, { range: 4, earnings: data.size1k === null ? 0 : parseInt(data.size1k) }, { range: 5, earnings: data.size2k === null ? 0 : parseInt(data.size2k) }];
  this.total_receipt = parseInt(data.totalreceipt);
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
        this.setState({ politicians: temp });
      });
  }

  dataBars = datum => {
    let assembled = [];
    let names = [];
    datum.length = 5;

    datum.forEach(v => {
      return assembled.push([{ ...v.data[0] }, { ...v.data[1] }, { ...v.data[2] }, { ...v.data[3] }, { ...v.data[4] }]), names.push(v.candidate_name);
    });

    return [assembled, names];
  };

  render() {
    let sortPolitician = this.state.politicians.sort((a, b) => Number(a.totalreceipt) < Number(b.totalreceipt));
    let barData = this.dataBars(sortPolitician);
    console.log('barData: ', barData);
    const qualitative = ["#334D5C", "#45B29D", "#EFC94C", "#E27A3F", "#DF5A49"]
    let candidateList = barData[1].map((v, i) => <li style={{color: qualitative[i]}}>{v}</li>)

    return (
      <React.Fragment>
        <Header height={'short'} imageID={'side-logo'} />

        <section>
          <form onSubmit={this.handleSubmit}>
            <h1>Search all Candidates</h1>
            <input type="submit" value="Submit" onClick={this.handleSearch} />
          </form>
        </section>

        <section className='section'>
          <h1>Top Five Funds</h1>
          <ul>
            {candidateList}
          </ul>
        </section>

        <section style={{ width: '50%', margin: 'auto', backgroundColor: 'white', borderRadius: '100px' }}>
          
          <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
            
            <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />

            <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />


            <VictoryStack colorScale={'qualitative'}>
              {/* <VictoryBar data={[{ x: 2, y: 6, fill: 'tomato' }, { x: 4, y: 4, fill: 'orange' }, { x: 6, y: 2, fill: 'gold' }, { x: 8, y: 4, fill: 'tomato' }]} /> */}

              <VictoryBar data={barData[0][0]} x={'range'} y={'earnings'} />
              <VictoryBar data={barData[0][1]} x={'range'} y={'earnings'} />
              <VictoryBar data={barData[0][2]} x={'range'} y={'earnings'} />
              <VictoryBar data={barData[0][3]} x={'range'} y={'earnings'} />
              <VictoryBar data={barData[0][4]} x={'range'} y={'earnings'} />
            </VictoryStack>
          </VictoryChart>
        </section>
      </React.Fragment>
    );
  }
}

export default Election;
