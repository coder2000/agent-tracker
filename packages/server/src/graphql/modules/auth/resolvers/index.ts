import { AuthProvider } from "../providers";
import {
  Resolvers,
  AuthResponse,
  MutationAuthenticateArgs
} from "../../../../types";
import { ModuleSessionInfo } from "@graphql-modules/core";

export default {
  Mutation: {
    authenticate: (
      _: AuthResponse,
      { input: { accessToken } }: MutationAuthenticateArgs,
      { context: { req, res }, injector }: ModuleSessionInfo
    ) => injector.get(AuthProvider).authenticate(accessToken, req, res)
  }
} as Resolvers;
