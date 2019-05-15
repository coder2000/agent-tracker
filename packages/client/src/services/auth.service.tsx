import * as React from "react";
import { useQuery } from "react-apollo-hooks";
import { Redirect } from "react-router-dom";
import { User, MeQuery } from "../graphql";
import gql from "graphql-tag";
import { AUTH_TOKEN } from "../symbols";

const AuthContext = React.createContext<User>({ emailAddress: "" });

export const useMe = () => {
  return React.useContext(AuthContext);
};

export const withAuth = <P extends object>(Component: React.ComponentType<P>) =>
  class WithAuth extends React.Component<P> {
    ME = gql`
      query ME {
        me {
          firstName
          surname
          emailAddress
        }
      }
    `;

    getAuthHeader = (): string | null => {
      return localStorage.getItem(AUTH_TOKEN) || null;
    };

    render() {
      if (!this.getAuthHeader()) {
        return <Redirect to="/" />;
      }

      const { ...props } = this.props;
      const result = useQuery<MeQuery>(this.ME);

      if (result.error) {
        return <Redirect to="/" />;
      }

      if (result == null || result.data == null) {
        return <Redirect to="/" />;
      } else {
        return (
          <AuthContext.Provider value={result.data.me}>
            <Component {...props as P} />
          </AuthContext.Provider>
        );
      }
    }
  };

export default {
  useMe,
  withAuth
};
