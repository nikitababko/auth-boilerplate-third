import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { Activate, Register } from './screens';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <App {...props} />} />
      <Route exact path="/register" render={(props) => <Register {...props} />} />
      <Route
        exact
        path="/users/activate/:token"
        render={(props) => <Activate {...props} />}
      />
    </Switch>
  </Router>,
  document.getElementById('root')
);
