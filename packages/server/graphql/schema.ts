import { join } from "path";
import { fileLoader, mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import { GraphQLModule } from "@graphql-modules/core";

const types = fileLoader(join(__dirname, "./types"));
const typeDefs = mergeTypes(types, { all: true });
const resolvers = mergeResolvers(fileLoader(join(__dirname, "./resolvers")));

const { schema } = new GraphQLModule({ typeDefs, resolvers });

export { schema };
