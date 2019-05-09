/// <reference path="../../../../types/passport-oauth2.d.ts" />
import {
  Strategy as OAuth2Strategy,
  InternalOAuthError,
  StrategyOptions,
  VerifyFunction
} from "passport-oauth2";
import { Request } from "express";

export type Profile = {
  provider: string;
  id: string;
  displayName: string;
  name: { givenName: string; familyName: string };
  emails: [{ value: string }];
  _raw: string | Buffer;
  _json: JSON;
};

export class GoogleStrategy extends OAuth2Strategy {
  constructor(options: StrategyOptions, verify: VerifyFunction) {
    options.authorizationURL =
      options.authorizationURL ||
      "https://accounts.google.com/o/oauth2/v2/auth";
    options.tokenURL =
      options.tokenURL || "https://www.googleapis.com/oauth2/v4/token";

    super(options, verify);
    this.name = "google-token";
  }

  authenticate(req: Request, options?: any) {
    if (req.query && req.query.error) {
      this.fail();
    }

    if (!req.body) {
      this.fail();
    }

    var accessToken =
      req.body.access_token ||
      req.query.access_token ||
      req.headers.access_token;
    var refreshToken =
      req.body.refresh_token ||
      req.query.access_token ||
      req.headers.refresh_token;

    this._loadUserProfile(accessToken, (err: any, profile: Profile) => {
      if (err) {
        this.fail(err);
      }

      function verified(self: GoogleStrategy, err: any, user: any, info: any) {
        if (err) {
          return self.error(err);
        }

        if (!user) {
          return self.fail(info);
        }

        self.success(user, info);
      }

      this._verify(
        accessToken,
        refreshToken,
        null,
        profile,
        (err, user, info) => {
          verified(this, err, user, info);
        }
      );
    });
  }

  userProfile(accessToken: string, done: any) {
    this._oauth2.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      accessToken,
      (err, body, result) => {
        if (err) {
          return done(
            new InternalOAuthError("failed to fetch user profile", err)
          );
        }

        try {
          var json = JSON.parse(body.toString());
          var profile: Profile;
          profile.provider = "google";
          profile.id = json.id;
          profile.displayName = json.name;
          profile.name = {
            familyName: json.family_name,
            givenName: json.given_name
          };
          profile.emails = [{ value: json.email }];
          profile._raw = body;
          profile._json = json;

          done(null, profile);
        } catch (e) {
          done(e);
        }
      }
    );
  }

  _loadUserProfile(accessToken: string, done: any) {
    function loadIt(self: GoogleStrategy) {
      return self.userProfile(accessToken, done);
    }

    function skipIt() {
      done(null);
    }

    if (
      typeof this._skipUserProfile === "function" &&
      this._skipUserProfile.length > 1
    ) {
      this._skipUserProfile(accessToken, (err: any, skip: any) => {
        if (err) {
          return done(err);
        }

        if (!skip) {
          return loadIt(this);
        }

        return skipIt();
      });
    } else {
      var skip =
        typeof this._skipUserProfile == "function"
          ? this._skipUserProfile()
          : this._skipUserProfile;
      if (!skip) {
        return loadIt(this);
      }

      return skipIt();
    }
  }
}
