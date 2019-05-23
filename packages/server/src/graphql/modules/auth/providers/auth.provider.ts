import { Injectable, ProviderScope, Inject } from "@graphql-modules/di";
import { User, Role, AuthResponse } from "@types";
import { JwtProvider } from "./jwt.provider";
import {
  DatabasePoolType,
  sql,
  NotFoundError,
  QueryResultRowType
} from "slonik";
import { DB_POOL } from "@symbols";
import { OAuth2Client } from "google-auth-library";

@Injectable({
  scope: ProviderScope.Session
})
export class AuthProvider {
  currentUser: User;

  constructor(
    @Inject(DB_POOL) private pool: DatabasePoolType,
    private jwtProvider: JwtProvider
  ) {}

  async authenticate(token: string): Promise<AuthResponse | false> {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const data = ticket.getPayload();

    if (data) {
      const { email, given_name, family_name } = data;

      const user = await this.pool.connect(
        async (connection): Promise<User> => {
          try {
            const row = await connection.one(
              sql`SELECT * FROM agent.agents WHERE email = ${email}`
            );

            return this.buildUser(row);
          } catch (error) {
            if (error instanceof NotFoundError) {
              const row = await connection.one(
                sql`INSERT INTO agent.agents (email, firstName, surname) VALUES (${email}, ${given_name}, ${family_name})`
              );

              return this.buildUser(row);
            }
          }
        }
      );

      this.currentUser = user;

      const jwtToken = this.jwtProvider.getNewToken(user);

      return { user, token: jwtToken };
    }

    return false;
  }

  buildUser(row: QueryResultRowType): User {
    const user = {
      firstName: row["firstName"] as string,
      surname: row["surname"] as string,
      emailAddress: row["email"] as string,
      role: row["role"] as Role
    };

    return user;
  }
}
