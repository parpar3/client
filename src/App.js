// import jwt_decode from "jwt-decode";
import React, {useEffect} from "react";
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ToastProvider } from 'react-toast-notifications';
import { hot } from 'react-hot-loader/root';


import './App.css';
import Header from './components/layout/Header';
import Home from './components/home/Home';


const browserHistory = createBrowserHistory();

const App = (props) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={2000}>
      <Router history={browserHistory}>
      <div className="app overflow-hidden">
        <Header />
        <Route path='/' exact>
          <Home />
        </Route>
      </div>
    </Router>
    </ToastProvider>
    
  )
}

export default hot(App);
