import { CognitoService } from "./CognitoService";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export class AuthService {
  private cognitoService: CognitoService;

  constructor() {
    this.cognitoService = new CognitoService();
  }

  async hello(): Promise<string> {
    try {
      return "Hello World With Actions!";
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async signUp(user: any): Promise<any> {
    try {
      const resultCognito = await this.cognitoService.signUp(user);

      if (resultCognito.$metadata.httpStatusCode === 200) {
        return resultCognito;
      } else {
        throw new Error("Error al registar el usuario en cognito");
      }
    } catch (error) {
      console.error("Error in signUp", error);
      throw error;
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
      throw error;
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
        throw new Error("Error al iniciar sesion en cognito");
      }

      const profileCognito = await this.cognitoService.getProfile(
        resultCognito.AuthenticationResult.AccessToken
      );
      const sub = profileCognito.UserAttributes.find(
        (attr: any) => attr.Name === "sub"
      )?.Value;

      if (!sub) {
        throw new Error("Error al obtener el perfil del usuario");
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
      throw error;
    }
  }

  async logOut(accessToken: string): Promise<any> {
    try {
      return await this.cognitoService.logOut(accessToken);
    } catch (error) {
      throw new Error("Error on logout");
    }
  }

  async forgotPassword(username: string): Promise<any> {
    try {
      return await this.cognitoService.forgotPassword(username);
    } catch (error) {
      throw new Error("Error on forgot password");
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
      throw new Error("Error on confirm forgot password");
    }
  }
}
