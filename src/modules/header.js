import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";

class HamburgerNav extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="contact" className="menu-item" href="/search-by-election">Search By Election</a>
        <a id="about" className="menu-item" href="/search-by-candidate">Search By Candidate</a>
        <a id="contact" className="menu-item" href="/about">About</a>
      </Menu>
    );
  }
}

class NavBar extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render () {
    return (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/search-by-election">Search by Election</Link>
        </li>
        <li>
          <Link to="/search-by-candidate">Search by Candidate</Link>
        </li>
      </ul>
    );
  }
}




class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      imageID: this.props.imageID,
      height: this.props.height,
    };
  }

  render() {
    return(
      <header className={this.props.height}>
        <nav id="hamburger-nav">
          <HamburgerNav/>
        </nav>
        <nav id="desktop-nav">
          <NavBar/>
        </nav>
        <div id={this.state.imageID}></div>
      </header>
    );
  }
}


export default Header;