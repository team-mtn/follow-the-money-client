import React from 'react';
import { slide as Menu } from 'react-burger-menu'

class HamburgerNav extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/about">About</a>
        <a id="contact" className="menu-item" href="/contact">Contact</a>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
      </Menu>
    );
  }
}




class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render() {
    return(
      <header>
        <HamburgerNav/>
        <img src=""/>
      </header>
    );
  }
}


export default Header;