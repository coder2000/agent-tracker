import { GraphQLModule } from "@graphql-modules/core";
import { Connection } from "typeorm";
import { Express } from "express";

export interface IAppModuleConfig {
  connection: Connection;
  app: Express;
}

export const AppModule = new GraphQLModule<IAppModuleConfig>({
  name: "App",
  configRequired: true
});
