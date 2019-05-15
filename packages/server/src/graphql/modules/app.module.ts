import { GraphQLModule } from "@graphql-modules/core";
import { Express } from "express";
import { AuthModule } from "./auth";
import { DatabasePoolType } from "slonik";

export interface IAppModuleConfig {
  dbPool: DatabasePoolType;
  app: Express;
}

export const AppModule = new GraphQLModule<IAppModuleConfig>({
  name: "App",
  configRequired: true,
  imports: ({ config: { dbPool, app } }) => [
    AuthModule.forRoot({ dbPool, app })
  ]
});
