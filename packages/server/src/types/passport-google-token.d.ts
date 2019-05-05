declare module "passport-google-token" {
  import { StrategyOptions, VerifyFunction } from "passport-oauth2";
  import { Request } from "express";

  class Strategy {
    constructor(options: StrategyOptions, verify: VerifyFunction);
    authenticate(req: Request, options?: any): any;
  }
}