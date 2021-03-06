import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "@modules/app.module";
import * as typeDefs from "./schema.graphql";
import { DB_POOL } from "@symbols";

export const UserModule = new GraphQLModule<IAppModuleConfig>({
  name: "User",
  typeDefs,
  providers: ({ config: { dbPool } }) => [
    { provide: DB_POOL, useValue: dbPool }
  ]
});
