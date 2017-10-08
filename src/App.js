import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return [
      <nav key="nav" class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <Link to="/" class="navbar-brand">Project name</Link>
          </div>
          <div id="navbar" class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <li class="active"><Link to="/">Home</Link></li>
              <li><Link to="/demands/all">All demands</Link></li>
            </ul>
          </div>
        </div>
      </nav>,
      <div key="div" class="container">
        <div class="starter-template">
          <h1>Bootstrap starter template</h1>
          <p class="lead">Use this document as a way to quickly start any new project.<br/> All you get is this text and a mostly barebones HTML document.</p>
        </div>
      </div>
    ];
  }
}

export default App;
