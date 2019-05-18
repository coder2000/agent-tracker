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
  token: Scalars["String"];
  user: User;
};

export type Mutation = {
  authenticate: AuthResponse;
  changeRole: User;
};

export type MutationAuthenticateArgs = {
  input: AuthInput;
};

export type MutationChangeRoleArgs = {
  role: Role;
};

export type Query = {
  me: User;
  getAgents: Array<User>;
  getLeaders: Array<User>;
  getCoordinators: Array<User>;
};

export enum Role {
  Agent = "Agent",
  Coodinator = "Coodinator",
  Leader = "Leader"
}

export type User = {
  firstName: Scalars["String"];
  surname: Scalars["String"];
  emailAddress: Scalars["String"];
  googleToken?: Maybe<Scalars["String"]>;
  role: Role;
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
    "firstName" | "surname" | "emailAddress" | "role"
  >;
};
