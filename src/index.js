import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// 1
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// 2
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// 3
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

// 4
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();


// Let’s try to understand what’s going on in that code snippet:

// 1.You’re importing the required dependencies from the installed npm packages.
// 2.Here you create the HttpLink that will connect your ApolloClient instance with the GraphQL API; your GraphQL server will be running on http://localhost:4000.
// 3.Now you instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache.
// 4.Finally you render the root component of your React app. The App is wrapped with the higher-order component ApolloProvider that gets passed the client as a prop.
// That’s it, you’re all set to start for loading some data into your app! 😎