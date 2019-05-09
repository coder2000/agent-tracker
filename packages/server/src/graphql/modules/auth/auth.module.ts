import { GraphQLModule } from "@graphql-modules/core";
import { InjectFunction } from "@graphql-modules/di";
import * as passport from "passport";
import { VerifyCallback } from "passport-oauth2";
import { Connection } from "typeorm";
import { IAppModuleConfig } from "../app.module";
import { AuthProvider, JwtProvider } from "./providers";
import { AuthDirective } from "./auth.directive";
import resolvers from "./resolvers";
import * as typeDefs from "./schema.graphql";
import { Request, Response } from "express";
import { GoogleStrategy, Profile } from "./strategies/google-token";

export interface ISession {
  req: Request;
  res: Response;
}

const GoogleCallback = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) =>
  done(null, {
    accessToken,
    refreshToken,
    profile
  });

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
      new GoogleStrategy(
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
  },
  async context(session: ISession, currentContext, {}) {
    const req = session.req;
    const res = session.res;
    return {
      req,
      res
    };
  }
});
