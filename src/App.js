import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify, { Hub } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {

  componentDidMount() {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          this.setState({ user: data });
          console.log("Standard sign in");
          break;
        case 'cognitoHostedUI':
          this.setState({ user: data });
          console.log("Hosted UI sign in");
          break;
        case "signOut":
          this.setState({ user: null });
          console.log("Sign out");
          break;
        case "customOAuthState":
          this.setState({ customState: data});
          console.log("Custom OAuth state set");
          break;
        default: 
          console.log(event)
          break;
      }
    });
  }

  render() {
    return (
      <div className="App">
        <AmplifySignOut />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App);
