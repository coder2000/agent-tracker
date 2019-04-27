import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import { User } from "../models/User";
import { getRepository } from "typeorm";

const userRepository = getRepository(User);
const GraphQLServer = new ApolloServer({
  schema,
  context: ({ req }) => {
    const user = userRepository.findOne(1);
    return { user };
  }
});

export { GraphQLServer };
