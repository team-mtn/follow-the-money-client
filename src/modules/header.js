import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';

class HamburgerNav extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/search-by-candidate">
          Search By Candidate
        </a>
        <a id="contact" className="menu-item" href="/view-top-candidates">
          View Top Candidates
        </a>
        <a id="contact" className="menu-item" href="/about">
          About Us
        </a>
      </Menu>
    );
  }
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      home: '',
      search: '',
      election: '',
      about: ''
    };
  }

  componentDidMount() {
    Object.keys(this.state).map(key => {
      if (this.props.page === key) {
        this.setState({
          [key]: 'selected'
        });
      }
    });
  }

  render() {
    return (
      <ul>
        <Link to="/" className={this.state.home}>
          <li>Home</li>
        </Link>
        <Link to="/about" className={this.state.about}>
          <li>About Us</li>
        </Link>
        <Link to="/view-top-candidates" className={this.state.election}>
          <li>View Top Candidates</li>
        </Link>
        <Link to="/search-by-candidate" className={this.state.search}>
          <li>Search by Candidate</li>
        </Link>
      </ul>
    );
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageID: this.props.imageID,
      height: this.props.height
    };
  }

  render() {
    return (
      <header className={this.props.height}>
        <nav id="hamburger-nav">
          <HamburgerNav />
        </nav>
        <nav id="desktop-nav">
          <NavBar page={this.props.page} />
        </nav>
        <div id={this.state.imageID} />
      </header>
    );
  }
}

export default Header;
