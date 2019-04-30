import { Injectable, ProviderScope } from "@graphql-modules/di";
import * as passport from "passport";
import { Connection } from "typeorm";
import { User } from "../../../entities/User";
import { Request, Response } from "express";

@Injectable({
  scope: ProviderScope.Session
})
export class AuthProvider {
  currentUser: User;

  constructor(private connection: Connection) {}

  authenticateGoogle = (req: Request, res: Response) =>
    new Promise<{ data: any; info: any }>((resolve, reject) => {
      passport.authenticate(
        "google-token",
        { session: false },
        (err, data, info) => {
          if (err) reject(err);
          resolve({ data, info });
        }
      )(req, res);
    });

  async authenticate(
    token: string,
    req: Request,
    res: Response
  ): Promise<User | false> {
    req.body = {
      ...req.body,
      access_token: token
    };

    const { data } = await this.authenticateGoogle(req, res);

    const {
      profile: { email }
    } = data;

    const userRepository = this.connection.getRepository(User);
    const user = await userRepository.findOneOrFail({ emailAddress: email });

    return user || false;
  }
}
