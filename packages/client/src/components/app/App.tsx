import * as React from "react";
import { ApolloHooksProvider } from "../../graphql";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { client } from "../client";
import loadIcons from "../icons";
import { Login } from "../login";

export default function App() {
  loadIcons();

  return (
    <ApolloHooksProvider apolloClient={client}>
      <Layout>
        <Router>
          <Switch>
            <Route path={"/"} component={Login} />
          </Switch>
        </Router>
      </Layout>
    </ApolloHooksProvider>
  );
}
