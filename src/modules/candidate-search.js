import React from 'react';
import superagent from 'superagent';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';

import Header from './header.js';
import '../css/search.css';

function Candidate(data) {
  this.candidate_id = data.candidate_id;
  this.candidate_name = data.candidate_name;
  this.party = data.party;
  this.data = [{ range: 1, earnings: data.size0 === null ? 0 : parseInt(data.size0) }, { range: 2, earnings: data.size200 === null ? 0 : parseInt(data.size200) }, { range: 3, earnings: data.size500 === null ? 0 : parseInt(data.size500) }, { range: 4, earnings: data.size1k === null ? 0 : parseInt(data.size1k) }, { range: 5, earnings: data.size2k === null ? 0 : parseInt(data.size2k) }];
}

function NewsArticle(news) {
  this.source = news.source;
  this.author = news.author;
  this.title = news.title;
  this.description = news.description;
  this.url = news.url;
  this.urlToImage = news.urlToImage;
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
      twitter: {}
    };
  }

  componentDidMount() {
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
          temp.push(new NewsArticle(news));
        });
        this.setState({ news: temp });
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
        <Header height={'short'} imageID={'side-logo'} />

        <main className="no-background">
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
            <section className="section">
              <h2>{this.state.value}</h2>

              {/* <p>{this.state.wiki.data}</p> */}
            </section>
          )}

          {this.state.value === 'Candidate Name' ? (
            ''
          ) : (
            <section className="section">
              <VictoryChart domainPadding={10} theme={VictoryTheme.material}>
                <VictoryAxis tickValues={['0', '200', '500', '1k', '2k']} />
                <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
                <VictoryStack colorScale={'cool'}>
                  <VictoryBar data={this.state.politicians.filter(v => v.candidate_name === this.state.value)[0].data} x={'range'} y={'earnings'} />
                </VictoryStack>
              </VictoryChart>
            </section>
          )}
          {this.state.value === 'Candidate Name'
            ? ''
            : this.state.news.map(article => {
                return (
                  <section className="section news">
                    <img src={article.urlToImage} width={'200px'} />
                    <article>
                      <h3>{article.title}</h3>
                      <h4>
                        Author: <span>{article.author}</span>
                      </h4>
                      <p>{article.description} </p>
                      <p class="right">
                        Read more on{' '}
                        <a href={article.url} target="_blank">
                          {article.source}
                        </a>
                      </p>
                    </article>
                  </section>
                );
              })}
        </main>
      </React.Fragment>
    );
  }
}

export default CandidateSearch;
