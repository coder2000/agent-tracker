import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "../app.module";
import * as typeDefs from "./schema.graphql";

export const AuthModule = new GraphQLModule<IAppModuleConfig>({
  name: "Auth",
  typeDefs,
  configRequired: true
});
