import { Injectable, ProviderScope, Inject } from "@graphql-modules/di";
import { User } from "../../../../entities/User";
import { AuthResponse } from "../../../../types";
import { JwtProvider } from "./jwt.provider";
import { DatabasePoolType, sql } from "slonik";
import { DB_POOL } from "../../app.symbols";
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
      const { email } = data;

      const user = await this.pool.connect(async connection => {
        return await connection.oneFirst(
          sql`SELECT * FROM agent.agents WHERE email = ${email}`
        );
      });

      //this.currentUser = user;

      //const jwtToken = this.jwtProvider.getNewToken(user.emailAddress);

      //return { user, token: jwtToken };
    }

    return false;
  }
}
