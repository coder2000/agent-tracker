import { GraphQLModule } from "@graphql-modules/core";
import * as typeDefs from "./schema.graphql";

export const AuthModule = new GraphQLModule({
  name: "Auth",
  typeDefs,
  configRequired: true
});
