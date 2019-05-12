import * as React from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { useMutation, authenticate } from "../../graphql";
import { AUTH_TOKEN } from "../../symbols";

export function Login() {
  const [accessToken, setAccessToken] = React.useState();

  const auth = useMutation(
    authenticate({ variables: { input: { accessToken: accessToken } } })
  );

  const loginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const data = response as GoogleLoginResponse;
    setAccessToken(data.getAuthResponse().id_token);

    auth().then(({ data }) => {
      if (data) {
        localStorage.setItem(AUTH_TOKEN, data.authenticate.token as string);
      }
    });
  };

  const loginFailure = () => {};

  return (
    <Container>
      <Row>
        <Col>
          <GoogleLogin
            clientId="382601523868-f5vc7qhe4pjs5shajlm6dj3fkorr11d9.apps.googleusercontent.com"
            onSuccess={loginSuccess}
            onFailure={loginFailure}
          />
        </Col>
      </Row>
    </Container>
  );
}
