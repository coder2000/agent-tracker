import { ApolloServer } from "apollo-server-express";
import { json } from "body-parser";
import * as cors from "cors";
import * as express from "express";
import "graphql-import-node";
import * as helmet from "helmet";
import { createServer } from "http";
import "reflect-metadata";
import { AppModule } from "@modules/app.module";
require("dotenv").config();
import { createPool } from "slonik";
import { createQueryLoggingInterceptor } from "slonik-interceptor-query-logging";

const app = express();

const interceptors = [createQueryLoggingInterceptor()];

const dbPool = createPool(process.env.PG_CONNECTION, { interceptors });

const corsProtection = cors({ origin: "http://localhost" });

app.use(helmet());
app.use(corsProtection);
app.use(json());

const { schema, context, subscriptions } = AppModule.forRoot({
  dbPool
});

const apollo = new ApolloServer({
  schema,
  context,
  subscriptions,
  introspection: true,
  tracing: true
});

apollo.applyMiddleware({ app });

const server = createServer(app);

apollo.installSubscriptionHandlers(server);

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
