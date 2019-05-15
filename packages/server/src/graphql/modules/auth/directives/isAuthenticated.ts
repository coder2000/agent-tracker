import { SchemaDirectiveVisitor } from "graphql-tools";
import { JwtProvider } from "../providers";
import {
  GraphQLDirective,
  DirectiveLocation,
  defaultFieldResolver,
  GraphQLField
} from "graphql";

export class isAuthenticated extends SchemaDirectiveVisitor {
  static getDirectiveDeclaration(directiveName = "isAuthenticated") {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION]
    });
  }

  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = (root, args, context, info) => {
      const auth = this.authenticate(context);

      return resolve.call(root, args, { ...context, auth }, info);
    };
  }

  authenticate(context: any) {
    const jwtProvider = new JwtProvider();
    const authorization = context.req.get("Authorization");

    if (authorization) {
      const token = authorization.replace("Bearer ", "");

      return jwtProvider.verifyToken(token);
    }
  }
}
