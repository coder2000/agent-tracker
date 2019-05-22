import * as React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { client } from "../client";
import loadIcons from "../icons";
import { Warning } from "./Warning";
import { Interactions } from "../interactions";
import { withAuth } from "../../services/auth.service";

function App() {
  loadIcons();

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Router>
          <Switch>
            <Route path={"/"} component={Warning} />
            <Route path={"/interactions"} component={withAuth(Interactions)} />
          </Switch>
        </Router>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
