import { Injectable } from "@graphql-modules/di";
import { JWK, JWT } from "@panva/jose";
import * as fs from "fs";

@Injectable()
export class JwtProvider {
  pubKey: JWK.Key;
  privKey: JWK.Key;

  constructor() {
    this.pubKey = JWK.importKey(fs.readFileSync("./pub.key"));
    this.privKey = JWK.importKey(fs.readFileSync("./priv.key"));
  }

  getNewToken(email: string): string {
    return JWT.sign({ "bnb:user:email": email }, this.privKey, {
      issuer: "bnb:server",
      expiresIn: "16h"
    });
  }
}
