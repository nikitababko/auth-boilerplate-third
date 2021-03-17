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
  Admin,
  Private,
} from './screens';
import { AdminRoute, PrivateRoute } from 'routes';

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
      <PrivateRoute exact path="/private" component={Private} />
      <AdminRoute exact path="/admin" component={Admin} />
      <Redirect to="/" />
    </Switch>
  </Router>,
  document.getElementById('root')
);
