import * as React from "react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo-hooks";
import { Container, Col, Row } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";

const AUTHENTICATE = gql`
  mutation Authenticate($token: String!) {
    authenticate(accessToken: $token) {
      token
    }
  }
`;

let accessToken: string;

const loginFailure = () => {};

export function Login() {
  const authenticate = useMutation(AUTHENTICATE, {
    variables: {
      token: accessToken
    }
  });

  const loginSuccess = (response: any) => {
    authenticate(response.tokenId);
  };

  return (
    <Container>
      <Row>
        <Col>
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID as string}
            onSuccess={loginSuccess}
            onFailure={loginFailure}
          />
        </Col>
      </Row>
    </Container>
  );
}
