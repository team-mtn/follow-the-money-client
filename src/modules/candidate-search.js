import React from 'react';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

import Header from './header.js';
import Tweet from './tweet.js';

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;
  this.data = [{ range: 1, earnings: data.size0 === null ? 0 : parseInt(data.size0) }, { range: 2, earnings: data.size200 === null ? 0 : parseInt(data.size200) }, { range: 3, earnings: data.size500 === null ? 0 : parseInt(data.size500) }, { range: 4, earnings: data.size1k === null ? 0 : parseInt(data.size1k) }, { range: 5, earnings: data.size2k === null ? 0 : parseInt(data.size2k) }];
  this.total_receipt = parseInt(data.totalreceipt).toLocaleString('en', {
    minimumFractionDigits: 0
  });
}

function NewsArticle(news) {
  this.source = news.source;
  this.author = news.author;
  this.title = news.title;
  this.description = news.description;
  this.url = news.url;
  this.urlToImage = news.urlToImage;
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
          totalreceipt: '100000',
          data: [{ range: 1, earnings: 5 }, { range: 2, earnings: 10 }, { range: 3, earnings: 15 }, { range: 4, earnings: 20 }, { range: 5, earnings: 25 }]
        }
      ],
      news: [
        {
          source: 'placeholder',
          author: 'placeholder',
          title: 'placeholder',
          description: 'placeholder',
          url: 'placeholder',
          urlToImage: 'placeholder'
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
        this.setState({ politicians: temp });
      });
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
    superagent
      .get(`https://follow-the-money-server.herokuapp.com/news`)
      .query({ name: event.target.value })
      .then(res => {
        let temp = [];
        res.body.map(news => {
          if (temp.length > 4) {
            temp.length = 4;
          }
          return temp.push(new NewsArticle(news));
        });
        this.setState({ news: temp });
      });
    superagent
      .get(`http://localhost:8000/twitter`)
      .query()
      .then(res => {
        let temp = [];
        res.body.map(tweet => {
          temp.push(new Twitter(tweet));
        })
        temp.length = 10;
        this.setState({twitter: temp});
      });
  };

  render() {
    let optionList = this.state.politicians.map((v, i) => (
      <option key={i} index={i} value={v.candidate_name}>
        {v.candidate_name}
      </option>
    ));

    return (
      <React.Fragment>
        <Header height={'short'} imageID={'side-logo'} page={'search'} />
        <main className="no-background flex">
          <section className="section">
            <form onSubmit={this.handleSubmit}>
              <h1>Search For A Candidate By Name</h1>
              <select value={this.state.value} onChange={this.handleChange}>
                <option key={22222} index={22222} value="Select Candidate">
                  Select Candidate
                </option>
                {optionList}
              </select>
            </form>
          </section>

          <div className="main">
            {this.state.value === 'Candidate Name' ? (
              ''
            ) : (
              <section className="section">
                <h1>{this.state.value}</h1>
                <ul>
                  <li>Party: {this.state.politicians.filter(candidate => candidate.candidate_name === this.state.value)[0].party}</li>
                  <li>Total Funds: ${this.state.politicians.filter(candidate => candidate.candidate_name === this.state.value)[0].total_receipt}</li>
                </ul>
              </section>
            )}

            {this.state.value === 'Candidate Name' ? (
              ''
            ) : (
              <section className="section chart">
                <h1>Funds Raised</h1>
                <p>Individual contributions broken into categories based on dollar amount donated.</p>
                <p> Each bar shows the total amount of funds raised from the respective donation category.</p>
                <VictoryChart padding={(0, 0, 0, 60)} height={250} theme={VictoryTheme.material}>
                  <VictoryAxis tickValues={['$0-200', '$200-500', '$500-1k', '$1k-2k', '$2k+']} />
                  <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
                  <VictoryStack colorScale={'cool'}>
                    <VictoryBar data={this.state.politicians.filter(v => v.candidate_name === this.state.value)[0].data} x={'range'} y={'earnings'} />
                  </VictoryStack>
                </VictoryChart>
              </section>
            )}
            {this.state.value === 'Candidate Name'
              ? ''
              : this.state.news.map((article, i) => {
                  return (
                    <section key={i} index={i} className="section news">
                      <img src={article.urlToImage} alt="news Artcle" />
                      <article>
                        <h3>{article.title}</h3>
                        <h4>
                          Author: <span>{article.author}</span>
                        </h4>
                        <p>{article.description} </p>
                        <p className="right">
                          Read more on{' '}
                          <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.source}
                          </a>
                        </p>
                      </article>
                    </section>
                  );
                })}
          </div>

          {this.state.value === 'Candidate Name' ? (
            ''
          ) : (
            <aside>
              <h1>Twitter Feed</h1>
              {this.state.twitter.map((tweet, i) => (
                <Tweet key={i} index={i} image={tweet.imageUrl} name={tweet.name} created_at={tweet.created_at} text={tweet.text} />
              ))}
            </aside>
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default CandidateSearch;
