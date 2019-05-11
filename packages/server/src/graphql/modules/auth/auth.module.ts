import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "../app.module";
import { AuthProvider, JwtProvider } from "./providers";
import { AuthDirective } from "./auth.directive";
import resolvers from "./resolvers";
import * as typeDefs from "./schema.graphql";
import { Request, Response } from "express";
import { DB_POOL } from "../app.symbols";

export interface ISession {
  req: Request;
  res: Response;
}

export const AuthModule = new GraphQLModule<IAppModuleConfig>({
  name: "Auth",
  typeDefs,
  resolvers,
  configRequired: true,
  providers: ({ config: { connection } }) => [
    { provide: DB_POOL, useValue: connection },
    AuthProvider,
    JwtProvider
  ],
  schemaDirectives: {
    AuthDirective
  }
});
