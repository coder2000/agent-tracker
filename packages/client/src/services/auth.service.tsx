import * as React from "react";
import { Redirect } from "react-router-dom";
import { User, Role } from "../graphql";
import { AUTH_TOKEN } from "../symbols";
import { JWK, JWT } from "@panva/jose";
import * as fs from "fs";

const user = {
  firstName: "",
  surname: "",
  emailAddress: "",
  role: Role.Agent
};

const AuthContext = React.createContext<User>(user);

export const useMe = () => {
  return React.useContext(AuthContext);
};

export const withAuth = <P extends object>(Component: React.ComponentType<P>) =>
  class WithAuth extends React.Component<P> {
    getAuthToken = (): string | null => {
      return localStorage.getItem(AUTH_TOKEN) || null;
    };

    render() {
      const token = this.getAuthToken();

      if (!token) {
        return <Redirect to="/" />;
      }

      const key = JWK.importKey(fs.readFileSync("./pub.key"));
      const payload = JWT.verify(token, key, { issuer: "bnb:server" });

      const { ...props } = this.props;
      return (
        <AuthContext.Provider value={payload as User}>
          <Component {...props as P} />
        </AuthContext.Provider>
      );
    }
  };

export default {
  useMe,
  withAuth
};
