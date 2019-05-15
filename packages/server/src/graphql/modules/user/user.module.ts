import { GraphQLModule } from "@graphql-modules/core";
import { IAppModuleConfig } from "@modules/app.module";

export const UserModule = new GraphQLModule<IAppModuleConfig>({
  name: "User"
});
