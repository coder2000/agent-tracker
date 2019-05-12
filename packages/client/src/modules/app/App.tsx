import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { Layout } from "./Layout";
import { client } from "../client";
import loadIcons from "../icons";

export default function App() {
  loadIcons();

  return (
    <ApolloProvider client={client}>
      <Layout>Hello World!</Layout>
    </ApolloProvider>
  );
}
