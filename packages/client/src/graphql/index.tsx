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

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: { __typename?: "User" } & Pick<
    User,
    "firstName" | "surname" | "emailAddress"
  >;
};
