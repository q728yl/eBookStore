// apollo.js
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:8080/graphql', // 用您的 GraphQL 服务器端点更新
    cache: new InMemoryCache(),
});
const ApolloSetup = ({ children }) => (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
);

export default ApolloSetup;