import { CognitoService } from "./CognitoService";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import boom from "@hapi/boom";
import { ISignUp } from "../interfaces/Iuser";

export class AuthService {
  private cognitoService: CognitoService;

  constructor() {
    this.cognitoService = new CognitoService();
  }

  async hello(): Promise<string> {
    try {
      return "Auth Service Say Hello World!";
    } catch (error) {
      console.log(error);
      throw boom.badImplementation("Error in hello");
    }
  }

  async signUp(user: ISignUp): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.signUp(user);

      if (resultCognito.$metadata.httpStatusCode === 200) {
        return resultCognito;
      } else {
        throw new Error("Error al registar el usuario en cognito");
      }
    } catch (error) {
      console.error("Error in signUp", error);
      throw boom.badImplementation("Error in signUp");
    }
  }

  async VerifyEmail(username: string, code: string): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.VerifyEmail(
        username,
        code
      );
      return resultCognito;
    } catch (error) {
      console.error("Error in VerifyEmail in AutthService", error);
      throw boom.badImplementation("Error in VerifyEmail");
    }
  }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.signIn(
        username,
        password
      );

      if (
        resultCognito.$metadata.httpStatusCode !== 200 ||
        !resultCognito.AuthenticationResult ||
        !resultCognito.AuthenticationResult.AccessToken
      ) {
        throw boom.unauthorized("Error in cognito signIn");
      }

      const profileCognito = await this.cognitoService.getProfile(
        resultCognito.AuthenticationResult.AccessToken
      );
      const sub = profileCognito.UserAttributes.find(
        (attr: any) => attr.Name === "sub"
      )?.Value;

      if (!sub) {
        throw boom.notFound("User not found in cognito");
      }

      const createToken = jwt.sign(
        {
          token: resultCognito.AuthenticationResult.AccessToken,
          sub,
        },
        config.JWT_SECRET!
      );

      return createToken;
    } catch (error) {
      console.error("Error in signIn in AuthService", error);
      throw boom.badImplementation("Error in signIn");
    }
  }

  async profile(accessToken: string): Promise<any> {
    try {
      const profileCognito = await this.cognitoService.getProfile(accessToken);
      if (
        profileCognito.$metadata.httpStatusCode === 200 &&
        profileCognito.UserAttributes
      ) {
        return profileCognito;
      } else {
        throw boom.notFound("Profile not found");
      }
    } catch (error) {
      throw boom.badImplementation("Error in profile");
    }
  }

  async logOut(accessToken: string): Promise<any> {
    try {
      return await this.cognitoService.logOut(accessToken);
    } catch (error) {
      throw boom.badImplementation("Error in logOut");
    }
  }

  async forgotPassword(username: string): Promise<any> {
    try {
      return await this.cognitoService.forgotPassword(username);
    } catch (error) {
      throw boom.badImplementation("Error in forgot password");
    }
  }

  async confirmForgotPassword(
    username: string,
    code: string,
    password: string
  ): Promise<any> {
    try {
      return await this.cognitoService.confirmForgotPassword(
        username,
        code,
        password
      );
    } catch (error) {
      throw boom.badImplementation("Error in confirm forgot password");
    }
  }
}
