import * as React from "react";
import { ApolloHooksProvider } from "../../graphql";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { client } from "../client";
import loadIcons from "../icons";
import { Warning } from "./Warning";

export default function App() {
  loadIcons();

  return (
    <ApolloHooksProvider apolloClient={client}>
      <Layout>
        <Router>
          <Switch>
            <Route path={"/"} component={Warning} />
          </Switch>
        </Router>
      </Layout>
    </ApolloHooksProvider>
  );
}
