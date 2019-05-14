export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthInput = {
  accessToken: Scalars["String"];
};

export type AuthResponse = {
  token?: Maybe<Scalars["String"]>;
  user: User;
};

export type Mutation = {
  authenticate: AuthResponse;
};

export type MutationAuthenticateArgs = {
  input: AuthInput;
};

export type Query = {
  me: User;
  isLoggedIn?: Maybe<Scalars["Boolean"]>;
};

export type User = {
  firstName?: Maybe<Scalars["String"]>;
  surname?: Maybe<Scalars["String"]>;
  emailAddress: Scalars["String"];
  googleToken?: Maybe<Scalars["String"]>;
};
export type AuthenticateMutationVariables = {
  input: AuthInput;
};

export type AuthenticateMutation = { __typename?: "Mutation" } & {
  authenticate: { __typename?: "AuthResponse" } & Pick<AuthResponse, "token">;
};

export type IsLoggedInQueryVariables = {};

export type IsLoggedInQuery = { __typename?: "Query" } & Pick<
  Query,
  "isLoggedIn"
>;

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export const AuthenticateDocument = gql`
  mutation authenticate($input: AuthInput!) {
    authenticate(input: $input) {
      token
    }
  }
`;
export type AuthenticateMutationFn = ReactApollo.MutationFn<
  AuthenticateMutation,
  AuthenticateMutationVariables
>;

export const AuthenticateComponent = (
  props: Omit<
    Omit<
      ReactApollo.MutationProps<
        AuthenticateMutation,
        AuthenticateMutationVariables
      >,
      "mutation"
    >,
    "variables"
  > & { variables?: AuthenticateMutationVariables }
) => (
  <ReactApollo.Mutation<AuthenticateMutation, AuthenticateMutationVariables>
    mutation={AuthenticateDocument}
    {...props}
  />
);

export type AuthenticateProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<AuthenticateMutation, AuthenticateMutationVariables>
> &
  TChildProps;
export function withAuthenticate<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    AuthenticateMutation,
    AuthenticateMutationVariables,
    AuthenticateProps<TChildProps>
  >
) {
  return ReactApollo.withMutation<
    TProps,
    AuthenticateMutation,
    AuthenticateMutationVariables,
    AuthenticateProps<TChildProps>
  >(AuthenticateDocument, {
    alias: "withAuthenticate",
    ...operationOptions
  });
}
export const IsLoggedInDocument = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;

export const IsLoggedInComponent = (
  props: Omit<
    Omit<
      ReactApollo.QueryProps<IsLoggedInQuery, IsLoggedInQueryVariables>,
      "query"
    >,
    "variables"
  > & { variables?: IsLoggedInQueryVariables }
) => (
  <ReactApollo.Query<IsLoggedInQuery, IsLoggedInQueryVariables>
    query={IsLoggedInDocument}
    {...props}
  />
);

export type IsLoggedInProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<IsLoggedInQuery, IsLoggedInQueryVariables>
> &
  TChildProps;
export function withIsLoggedIn<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    IsLoggedInQuery,
    IsLoggedInQueryVariables,
    IsLoggedInProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    IsLoggedInQuery,
    IsLoggedInQueryVariables,
    IsLoggedInProps<TChildProps>
  >(IsLoggedInDocument, {
    alias: "withIsLoggedIn",
    ...operationOptions
  });
}
