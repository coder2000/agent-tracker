import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";

const GraphQLServer = new ApolloServer({ schema, context: session => session });

export { GraphQLServer };
