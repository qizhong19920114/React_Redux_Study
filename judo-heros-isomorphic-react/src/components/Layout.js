// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router';

class Layout extends React.Component {
  //we use the props children here because we are going to use nested route
  render() {
    console.log("in the Layout!!")
    return (
      <div className="app-container">
        <header>
          <Link to="/">
            <img className="logo" src="/img/logo-judo-heroes.png"/>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
        <footer>
          <p>
            This is a demo app to showcase universal rendering and routing with <strong>React</strong> and <strong>Express</strong>.
          </p>
        </footer>
      </div>
    );
  }
}

export default Layout; 