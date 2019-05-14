import * as React from "react";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { authenticate, authenticate_variables } from "../../graphql";
import { useMutation } from "react-apollo-hooks";
import { AUTH_TOKEN } from "../../symbols";

export function LoginButton() {
  const [accessToken, setAccessToken] = React.useState("");

  const auth = useMutation<authenticate, authenticate_variables>(authenticate, {
    variables: { input: { accessToken: accessToken } }
  });

  const loginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const authResp = (response as GoogleLoginResponse).getAuthResponse();
    setAccessToken(authResp.id_token);

    auth().then(({ data }) => {
      if (data) {
        localStorage.setItem(AUTH_TOKEN, data.authenticate.token as string);
      }
    });
  };

  const loginFailure = () => {};

  return (
    <GoogleLogin
      clientId="382601523868-f5vc7qhe4pjs5shajlm6dj3fkorr11d9.apps.googleusercontent.com"
      onSuccess={loginSuccess}
      onFailure={loginFailure}
    />
  );
}
