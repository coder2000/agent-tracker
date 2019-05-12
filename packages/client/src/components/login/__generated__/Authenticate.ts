/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { AuthInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Authenticate
// ====================================================

export interface Authenticate_authenticate {
  __typename: "AuthResponse";
  token: string | null;
}

export interface Authenticate {
  authenticate: Authenticate_authenticate;
}

export interface AuthenticateVariables {
  token: AuthInput;
}
