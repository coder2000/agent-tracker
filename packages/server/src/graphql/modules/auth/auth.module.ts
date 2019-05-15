import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "@modules/app.module";
import { AuthProvider, JwtProvider } from "./providers";
import { isAuthenticated } from "./directives";
import { UserModule } from "@modules/user/user.module";
import resolvers from "./resolvers";
import * as typeDefs from "./schema.graphql";
import { DB_POOL } from "../app.symbols";

export const AuthModule = new GraphQLModule<IAppModuleConfig>({
  name: "Auth",
  typeDefs,
  resolvers,
  configRequired: true,
  providers: ({ config: { dbPool } }) => [
    { provide: DB_POOL, useValue: dbPool },
    AuthProvider,
    JwtProvider
  ],
  schemaDirectives: {
    isAuthenticated
  },
  imports: [UserModule]
});
