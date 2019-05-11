import { AuthProvider } from "../providers";
import {
  Resolvers,
  AuthResponse,
  MutationAuthenticateArgs
} from "../../../../types";
import { ModuleContext } from "@graphql-modules/core";

export default {
  Mutation: {
    authenticate: (
      _: AuthResponse,
      { input: { accessToken } }: MutationAuthenticateArgs,
      { injector }: ModuleContext
    ) => injector.get(AuthProvider).authenticate(accessToken)
  }
} as Resolvers;
