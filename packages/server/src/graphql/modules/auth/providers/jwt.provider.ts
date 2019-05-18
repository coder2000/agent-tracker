import { Injectable } from "@graphql-modules/di";
import { JWK, JWT } from "@panva/jose";
import { User } from "@types";
import * as fs from "fs";

@Injectable()
export class JwtProvider {
  pubKey: JWK.Key;
  privKey: JWK.Key;

  constructor() {
    this.pubKey = JWK.importKey(fs.readFileSync("./pub.key"));
    this.privKey = JWK.importKey(fs.readFileSync("./priv.key"));
  }

  getNewToken(user: User): string {
    return JWT.sign({ "bnb:user": user }, this.privKey, {
      issuer: "bnb:server",
      expiresIn: "16h"
    });
  }

  verifyToken(token: string): boolean {
    const payload = JWT.verify(token, this.pubKey, { issuer: "bnb:server" });

    return payload ? true : false;
  }
}
