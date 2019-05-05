import { GraphQLModule } from "@graphql-modules/core";
import { InjectFunction } from "@graphql-modules/di";
import * as passport from "passport";
import { Strategy as GoogleTokenStrategy } from "passport-google-token";
import { VerifyCallback } from "passport-oauth2";
import { Connection } from "typeorm";
import { IAppModuleConfig } from "../app.module";
import { AuthProvider, JwtProvider } from "./providers";
import { AuthDirective } from "./auth.directive";
import resolvers from "./resolvers";
import * as typeDefs from "./schema.graphql";
/// <reference path="../../../types/passport-google-token.d.ts" />

const GoogleCallback = (
  accessToken: string,
  refreshToken: string,
  profile: any,
  done: VerifyCallback
) => done(null, { accessToken, refreshToken, profile });

export const AuthModule = new GraphQLModule<IAppModuleConfig>({
  name: "Auth",
  typeDefs,
  resolvers,
  configRequired: true,
  providers: ({ config: { connection } }) => [
    { provide: Connection, useValue: connection },
    AuthProvider,
    JwtProvider
  ],
  middleware: InjectFunction()(() => {
    passport.use(
      new GoogleTokenStrategy(
        {
          authorizationURL: "",
          tokenURL: "",
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        GoogleCallback
      )
    );
  }),
  schemaDirectives: {
    AuthDirective
  }
});
