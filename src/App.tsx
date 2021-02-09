import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import SignUp from './components/SignUp';
import SignIn  from './components/SignIn';
import User from './components/SignIn';
import React from 'react';
import { stringify } from 'querystring';
import { type, userInfo } from 'os';
import Training from './components/Training';
import { Redirect } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { isNullishCoalesce } from 'typescript';
import Users from './components/Users';

type AppState = {
 userID: string
 token: string | null
 admin: boolean | null
 localStorage: string | null
 userSetUp: boolean | null
}

class App extends React.Component<{}, AppState> {
  constructor(props: any){
    super(props)
    this.state = {
      userID: '',
      admin: null,
      token: '',
      localStorage: '',
      userSetUp: null,
    }
    this.reviseToken = this.reviseToken.bind(this)
    this.reviseAdmin = this.reviseAdmin.bind(this)
  }
  
  componentDidMount() {
    if (localStorage.getItem('token')) 
    this.setState( {token: localStorage.getItem('token')})
      }

reviseToken(newToken: string) {
  this.setState({token: newToken})
  // console.log("token updated")
  localStorage.setItem("token", newToken)   //keeps token while user is logged in
};

clearToken(newToken: '') {
  console.log('cleared Session Token ---> ', newToken);

  this.setState(this.clearToken);
  localStorage.clear();

  console.log('Confirm token is cleared ---->', localStorage.token)
}


reviseAdmin(newAdmin: boolean | null) {
  this.setState({admin: newAdmin})
};

render () {
    
      return (
        <Switch>
          <Route path="/SignUp">
            <SignUp reviseToken={this.reviseToken}/>
          </Route>
          <Route path="/SignIn">
            <SignIn reviseToken={this.reviseToken} reviseAdmin={this.reviseAdmin}/>
          </Route>
          <Route path="/Training">
          <Training admin={this.state.admin}/>
          </Route>
          <Route path="/">
          <Redirect to="/SignIn" />
          </Route>
          <Route path="/Users">
            <Users reviseToken={this.reviseToken}/>
            <Redirect to="/Users" />
          </Route>
        </Switch>
      )
  }
}


export default App;