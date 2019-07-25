import React from 'react';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack} from 'victory';

import Header from './header.js';
import Tweet from './tweet.js';

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;

  this.data = [{ range: 1, earnings: data.size0 === null ? 0 : parseInt(data.size0) }, { range: 2, earnings: data.size200 === null ? 0 : parseInt(data.size200) }, { range: 3, earnings: data.size500 === null ? 0 : parseInt(data.size500) }, { range: 4, earnings: data.size1k === null ? 0 : parseInt(data.size1k) }, { range: 5, earnings: data.size2k === null ? 0 : parseInt(data.size2k) }];
  this.total_receipt = parseInt(data.totalreceipt);
}

function Twitter(tweet) {
  this.created_at = tweet[0];
  this.text = tweet[1];
  this.name = tweet[2];
  this.screenName = tweet[3];
  this.description = tweet[4];
  this.userUrl = tweet[5];
  this.imageUrl = tweet[6];
}

class Election extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      politicians: [
        {
          candidate_id: 'placeholder1',
          candidate_name: 'placeholder',
          party: 'libertas',
          total_receipt: '100000',
          data: [{ range: 1, earnings: 5 }, { range: 2, earnings: 10 }, { range: 3, earnings: 15 }, { range: 4, earnings: 20 }, { range: 5, earnings: 25 }]
        }
      ],
      twitter: [
        {
          created_at: 'placeholder',
          text: 'placeholder',
          name: 'placeholder',
          screenName: 'placeholder',
          description: 'placeholder',
          userUrl: 'placeholder',
          imageUrl: 'placeholder',
        }
      ]
    };
    
  }

  componentDidMount() {
    superagent
      .get(`https://follow-the-money-server.herokuapp.com/allpoliticians`)
      .query()
      .then(serverResponse => {
        let temp = [];

        serverResponse.body.map(candidate => {
          return temp.push(new Candidate(candidate));
        });

        temp.sort((a, b) => {
          if (a.total_receipt < b.total_receipt){
            return 1;
          } if (a.total_receipt > b.total_receipt){
            return -1;
          } else {
            return 0;
          }
        });

        this.setState({ politicians: temp });
      });
    superagent
      .get(`http://localhost:8000/twitter`)
      .query()
      .then(res => {
        let temp = [];
        res.body.map(tweet => {
          temp.push(new Twitter(tweet));
        })
        this.setState({twitter: temp});
      });
  }

  dataBars = datum => {
    let copy = [...datum];
    let assembled = [];
    let names = [];
    copy.length = 5;

    copy.forEach(politician => {assembled.push([{ ...politician.data[0] }, { ...politician.data[1] }, { ...politician.data[2] }, { ...politician.data[3] }, { ...politician.data[4] }]); names.push(politician.candidate_name);

    return
    });

    return {
      assembled : assembled, 
      names : names, 
    };
  };

  render() {
    let barData = this.dataBars(this.state.politicians);
    const qualitative = ["#334D5C", "#45B29D", "#EFC94C", "#E27A3F", "#DF5A49"]
    let candidateList = barData.names.map((candidate, i) => <li key={i} index={i} style={{color: qualitative[i]}}>{candidate}</li>)

    return (
      <React.Fragment>
        <Header height={"short"} imageID={"side-logo"} page={"election"}/>
        <main className="no-background flex">

          <section className="section">
            <h1>2020 Presidential Election Funds</h1>
          </section>

          <div className="main">
            <section className="section chart">
              <h1>Top Funds Raised</h1>
              <p>Individual contributions broken into categories based on dollar amount donated.</p>
              <p> Each bar shows the total amount of funds raised from the respective donation category for each of the top 5 funds.</p>
              <p>Each fund is represented by a unique color.</p>
              
              <VictoryChart padding={0, 0, 0, 60} domainPadding={10} theme={VictoryTheme.material}>
                
                <VictoryAxis tickValues={['$0-200', '$200-500', '$500-1k', '$1k-2k', '$2k+']} />

                <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />


                <VictoryStack colorScale={'qualitative'}>
                  {/* <VictoryBar data={[{ x: 2, y: 6, fill: 'tomato' }, { x: 4, y: 4, fill: 'orange' }, { x: 6, y: 2, fill: 'gold' }, { x: 8, y: 4, fill: 'tomato' }]} /> */}

                  <VictoryBar data={barData.assembled[0]} x={'range'} y={'earnings'} />
                  <VictoryBar data={barData.assembled[1]} x={'range'} y={'earnings'} />
                  <VictoryBar data={barData.assembled[2]} x={'range'} y={'earnings'} />
                  <VictoryBar data={barData.assembled[3]} x={'range'} y={'earnings'} />
                  <VictoryBar data={barData.assembled[4]} x={'range'} y={'earnings'} />
                </VictoryStack>
              </VictoryChart>
              <ul>
                {candidateList}
              </ul>
            </section>
            <section className="section candidates">
              <h1>All 2020 Election Candidates</h1>
              <ul>
                {this.state.politicians.map((candidate, i) => (
                  <li key={i} index={i}>
                    <h2>{candidate.candidate_name}</h2>
                    <p>Party: {candidate.party}</p>
                    <p>Total Funds Raised: ${parseInt(candidate.total_receipt).toLocaleString('en', {minimumFractionDigits: 0})}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <aside>
              <h1>Twitter Feed</h1>
              {this.state.twitter.map((tweet, i) => (
                <Tweet key={i} index={i} image={tweet.imageUrl} name={tweet.name} created_at={tweet.created_at} text={tweet.text} />
              ))}
            </aside>
        </main>

      </React.Fragment>
    );
  }
}

export default Election;
