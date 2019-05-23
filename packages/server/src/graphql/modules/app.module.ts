import { GraphQLModule } from "@graphql-modules/core";
import { AuthModule } from "./auth";
import { UserModule } from "./user";
import { DatabasePoolType } from "slonik";

export interface IAppModuleConfig {
  dbPool: DatabasePoolType;
}

export const AppModule = new GraphQLModule<IAppModuleConfig>({
  name: "App",
  configRequired: true,
  imports: ({ config: { dbPool } }) => [
    AuthModule.forRoot({ dbPool }),
    UserModule
  ]
});
