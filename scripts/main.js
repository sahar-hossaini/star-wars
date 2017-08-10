import React , { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router , Route  , hashHistory } from 'react-router';
import { createHistory } from 'history'

import App from './app/App';

const routes = (
  <Router history={createHistory()}>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(routes ,  document.getElementById('app'));
