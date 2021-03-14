import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { Register } from './screens';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <App {...props} />} />
      <Route exact path="/register" render={(props) => <Register {...props} />} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
