import { AuthProvider } from "../auth.provider";
import { Resolvers, AuthResponse, MutationAuthenticateArgs } from "../../../../types";

export default {
  Mutation: {
    authenticate: (_: AuthResponse, { input: { accessToken } }: MutationAuthenticateArgs, { req, res, injector }: any) =>
      injector.get(AuthProvider).authenticate(accessToken, req, res)
  }
} as Resolvers;
