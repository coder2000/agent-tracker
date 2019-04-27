require("dotenv").config();
import "reflect-metadata";
import "graphql-import-node";
import { createServer } from "http";
import { createConnection } from "typeorm";
import * as cors from "cors";
import * as helmet from "helmet";
import * as csrf from "csurf";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { json } from "body-parser";
import { AppModule } from "./graphql/modules/app.module";

createConnection({
  type: "sqlite",
  database: process.env.DATABASE,
  synchronize: true
}).then(async connection => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(json());

  const csrfProtection = csrf({ cookie: true });

  app.use(csrfProtection);

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
