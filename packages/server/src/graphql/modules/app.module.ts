import { GraphQLModule } from "@graphql-modules/core";
import { Express } from "express";
import { Connection } from "typeorm";
import { AuthModule } from "./auth";

export interface IAppModuleConfig {
  connection: Connection;
  app: Express;
}

export const AppModule = new GraphQLModule<IAppModuleConfig>({
  name: "App",
  configRequired: true,
  imports: ({ config: { connection, app } }) => [
    AuthModule.forRoot({ connection, app })
  ]
});
