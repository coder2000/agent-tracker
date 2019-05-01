/// <reference path="../../../types/passport-google-token.d.ts" />
import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "../app.module";
import * as typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { InjectFunction } from "@graphql-modules/di";
import * as passport from "passport";
import { Strategy as GoogleTokenStrategy } from "passport-google-token";
import { VerifyCallback } from "passport-oauth2";

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
  })
});
