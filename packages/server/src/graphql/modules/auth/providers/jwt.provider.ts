import { Injectable } from "@graphql-modules/di";
import { JWK, JWT } from "@panva/jose";
import { User } from "@types";

@Injectable()
export class JwtProvider {
  key: JWK.Key;

  constructor() {
    this.key = JWK.importKey({
      kty: "RSA",
      d:
        "iXQZnKKLv2KfJQk7vW3ohks5UtRIw8RfxwLBbFcsEV_4pIL-uSXzYMoRO-44Sh8Qx5FI7AKvbMhTQ1qUB-5T25OrztXt8CYvsObzfX-hku_4FbFUJMi8p5wjrx2PH1TViyO4TlzpaZOM2f5CMpRZIAhO9vhUr2HU9-dFhQbXx6wadkgooqIpmItA8v8EC-be0WghmdRd_r3kh6N2ZkcNcmLuig2hWyGtIbZMvils4iBGvOKP_B_OzI40GqfDlgd2AEbeTDmUbGOGbrLFZMTELto0wbP3Jjh9IlJJHu_OEU8kCI6mS7gbM7k7UpRObrk2L5kP7VOn9gEDG3r5XaG34Q",
      e: "AQAB",
      use: "sig",
      alg: "RS256",
      n:
        "oRBMrgYimAJDdzMqvDz-sR3CRdYbqh6cIgdqvoDzB-Z8rwv_bt7tjF6Xa9gkp8btVAAJ8o9H0CPik5zDuvzEfyH8spcMq39KMQGDIy0LR9vyJeMQAJJUM-1EXrwAwTXghwNuKckqKryW9iMBxUcU8AhFWYRE1soqSFHv_-j9Yl5kX_AxdSXMuLDo-BGSvTPOeOOgKSV0Dc04lcc__tfeW2kf-jt1GKWfHBFs9CJpcm3SAXHn0Z45atQDdjyGYp0Je5kSoNGlQQ2khTr52iH6Vj5mMkB_cDccZONdFyxthEzuLkUxlnGVy9IlEd_KHmvj4dj3Hq-ZctAJPsoYLTv8Kw"
    });
  }

  getNewToken(user: User): string {
    return JWT.sign({ "bnb:user": user }, this.key, {
      issuer: "bnb:server",
      expiresIn: "16h"
    });
  }

  verifyToken(token: string): boolean {
    const payload = JWT.verify(token, this.key, { issuer: "bnb:server" });

    return payload ? true : false;
  }
}
