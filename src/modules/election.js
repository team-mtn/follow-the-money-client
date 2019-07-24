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
  this.urlToImage = tweet.url;
  this.name = tweet.name;
  this.created_at = tweet.created_at;
  this.text = tweet.text;
}

class Election extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      politicians: [],
      twitter: [
        {
          urlToImage: 'placeholder',
          name: 'placeholder',
          created_at: 'placeholder',
          text: 'placeholder',
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
        this.setState({ politicians: temp });
      });
  }

  dataBars = datum => {
    let assembled = [];
    let names = [];
    datum.length = 5;

    datum.forEach(v => {assembled.push([{ ...v.data[0] }, { ...v.data[1] }, { ...v.data[2] }, { ...v.data[3] }, { ...v.data[4] }]); names.push(v.candidate_name);
    return
    });

    return [assembled, names];
  };

  render() {
    let sortPolitician = this.state.politicians.sort((a, b) => Number(a.totalreceipt) < Number(b.totalreceipt));
    let barData = this.dataBars(sortPolitician);
    const qualitative = ["#334D5C", "#45B29D", "#EFC94C", "#E27A3F", "#DF5A49"]
    let candidateList = barData[1].map((v, i) => <li key={i} index={i} style={{color: qualitative[i]}}>{v}</li>)

    return (
      <React.Fragment>
        <Header height={"short"} imageID={"side-logo"} page={"election"}/>
        <main className="no-background flex">

          <section className="section">
            <h1>Top Five Funds</h1>
            <ul>
              {candidateList}
            </ul>
          </section>

          <div className="main">
            <section className="section">
              
              <VictoryChart padding={0, 0, 0, 60} domainPadding={10} theme={VictoryTheme.material}>
                
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
          </div>
          <aside>
            { this.state.twitter.map((tweet, i) => (
                <Tweet key={i} index={i} image={'sample image'} name={'sample name'} created_at={'sample created'} text={'sample tweet about stuff and all the #coolstufflikethat'}/>
            ))}
          </aside>
        </main>

      </React.Fragment>
    );
  }
}

export default Election;
