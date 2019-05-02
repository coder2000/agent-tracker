import { ApolloServer } from "apollo-server-express";
import { json } from "body-parser";
import * as cors from "cors";
import * as express from "express";
import "graphql-import-node";
import * as helmet from "helmet";
import { createServer } from "http";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { AppModule } from "./graphql/modules/app.module";
require("dotenv").config();

createConnection({
  type: "sqlite",
  database: process.env.DATABASE,
  synchronize: true
}).then(async connection => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(json());

  const { schema, context, subscriptions } = AppModule.forRoot({
    connection,
    app
  });

  const apollo = new ApolloServer({ schema, context, subscriptions });

  apollo.applyMiddleware({ app });

  const server = createServer(app);

  apollo.installSubscriptionHandlers(server);

  await server.listen(process.env.PORT, () => {
    console.log("Listening");
  });
});
