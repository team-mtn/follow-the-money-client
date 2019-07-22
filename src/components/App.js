import React from 'react';
import { BrowserRouter } from "react-router-dom";
// import SERVER_URL from './constants/server';
// import Nav from './layout/Nav';
import '../css/App.css';

import Header from "./modules/header.js";
import Main from "./modules/main.js";


class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {};
  }

  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Header/>
          <Main/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
