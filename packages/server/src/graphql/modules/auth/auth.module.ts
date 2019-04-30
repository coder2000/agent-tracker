import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "../app.module";
import * as typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { APP } from "../app.symbols";
import { InjectFunction } from "@graphql-modules/di";
import { AuthProvider } from "./auth.provider";
import { Express } from "express";
import * as passport from "passport";
import { Strategy as GoogleTokenStrategy } from "passport-google-token";

const GoogleCallback = (accessToken, refreshToken, profile, done) =>
  done(null, { accessToken, refreshToken, profile });

export const AuthModule = new GraphQLModule<IAppModuleConfig>({
  name: "Auth",
  typeDefs,
  resolvers,
  configRequired: true,
  middleware: InjectFunction(AuthProvider, APP)(
    (authProvider, app: Express) => {
      passport.use(
        new GoogleTokenStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          },
          GoogleCallback
        )
      );
    }
  )
});
