import {
  defaultFieldResolver,
  DirectiveLocation,
  GraphQLDirective,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLSchema
} from "graphql";
import { SchemaDirectiveVisitor } from "graphql-tools";

class AuthDirective extends SchemaDirectiveVisitor {
  public visitObject(type: any) {
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.require;
  }

  public visitFieldDefinition(
    field: any,
    details: { objectType: GraphQLObjectType }
  ) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredAuthRole = this.args.require;
  }

  ensureFieldsWrapped(objectType: any) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function(...args: any) {
        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRole) {
          resolve.apply(this, args);
        }
      };
    });
  }

  public static getDirectiveDeclaration(
    directiveName: string,
    schema: GraphQLSchema
  ): GraphQLDirective {
    return new GraphQLDirective({
      name: directiveName,
      locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT],
      args: {
        requires: {
          type: schema.getType("Role") as GraphQLEnumType,
          defaultValue: "Agent"
        }
      }
    });
  }
}

export { AuthDirective };
