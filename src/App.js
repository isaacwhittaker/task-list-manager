import React, { Component } from 'react';
import './App.css';
import router from './router.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AppSync from './aws-exports.js';

Amplify.configure(AppSync);

const client = new AWSAppSyncClient({
    url: AppSync.aws_appsync_graphqlEndpoint,
    region: AppSync.aws_appsync_region,
    auth: {
        // Amazon Cognito user pools using AWS Amplify
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    }
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Task List Manager <span><NavLink to="/"><button>Home</button></NavLink></span></h2>
        {router}
      </div>
    );
  }
}

const WithProvider = () => (
    <ApolloProvider client={client}>
      <Router>
        <Rehydrated>
            <App />
        </Rehydrated>
      </Router>
    </ApolloProvider>
);

const AppWithAuth = withAuthenticator(WithProvider, true);

export default AppWithAuth;
