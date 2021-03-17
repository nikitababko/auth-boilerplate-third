import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import {
  Login,
  Activate,
  Register,
  ForgotPassword,
  ResetPassword,
  Private,
  Admin,
} from './screens';

import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={(props) => <App {...props} />} />
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route exact path="/register" render={(props) => <Register {...props} />} />
      <Route
        exact
        path="/users/activate/:token"
        render={(props) => <Activate {...props} />}
      />
      <Route
        exact
        path="/users/password/reset/:token"
        render={(props) => <ResetPassword {...props} />}
      />
      <Route
        exact
        path="/users/password/forgot"
        render={(props) => <ForgotPassword {...props} />}
      />
      <PrivateRoute path="/private" exact component={Private} />
      <AdminRoute path="/admin" exact component={Admin} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
