import * as React from "react";
import { Redirect } from "react-router-dom";
import { User, Role } from "../graphql";
import { AUTH_TOKEN } from "../symbols";
import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";

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

      const key = jwkToPem({
        kty: "RSA",
        e: "AQAB",
        n:
          "oRBMrgYimAJDdzMqvDz-sR3CRdYbqh6cIgdqvoDzB-Z8rwv_bt7tjF6Xa9gkp8btVAAJ8o9H0CPik5zDuvzEfyH8spcMq39KMQGDIy0LR9vyJeMQAJJUM-1EXrwAwTXghwNuKckqKryW9iMBxUcU8AhFWYRE1soqSFHv_-j9Yl5kX_AxdSXMuLDo-BGSvTPOeOOgKSV0Dc04lcc__tfeW2kf-jt1GKWfHBFs9CJpcm3SAXHn0Z45atQDdjyGYp0Je5kSoNGlQQ2khTr52iH6Vj5mMkB_cDccZONdFyxthEzuLkUxlnGVy9IlEd_KHmvj4dj3Hq-ZctAJPsoYLTv8Kw"
      });
      const payload = jwt.verify(token, key, { issuer: "bnb:server" });

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
