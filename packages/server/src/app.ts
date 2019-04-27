import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as csrf from "csurf";
import { GraphQLServer } from "./graphql";

var app = express();
const csrfProtection = csrf({ cookie: true });

app.use(logger("dev"));
app.use(cookieParser());
app.use("/graphql", helmet());
GraphQLServer.applyMiddleware({ app, cors: true });
app.use("/graphql", csrfProtection);

export default app;
