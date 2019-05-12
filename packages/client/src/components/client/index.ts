import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { AUTH_TOKEN } from "../../symbols";
import gql from "graphql-tag";

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  resolvers: {}
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem(AUTH_TOKEN)
  }
});

const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

export { client, IS_LOGGED_IN };
