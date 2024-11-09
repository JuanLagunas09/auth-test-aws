import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  ForgotPasswordCommand,
  GlobalSignOutCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { ISignUp } from "../interfaces/Iuser";
import { config } from "../config/config";

export class CognitoService {
  private cognito: CognitoIdentityProviderClient;

  constructor() {
    this.cognito = new CognitoIdentityProviderClient({});
  }

  async signUp(user: ISignUp): Promise<any> {
    try {
      const command = new SignUpCommand({
        ClientId: config.COGNITO_CLIENT_ID,
        Username: user.username,
        Password: user.password,
        UserAttributes: [
          {
            Name: "email",
            Value: user.email,
          },
          {
            Name: "phone_number",
            Value: user.phone,
          },
        ],
      });
      return await this.cognito.send(command);
    } catch (error) {
      console.error("Error in signUp Cognito", error);
      throw error;
    }
  }

  async VerifyEmail(username: string, code: string): Promise<any> {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: config.COGNITO_CLIENT_ID,
        Username: username,
        ConfirmationCode: code,
      });
      return await this.cognito.send(command);
    } catch (error) {
      console.error("Error in VerifyEmail Cognito", error);
      throw error;
    }
  }

  async signIn(username: string, password: string): Promise<any> {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
        },
        ClientId: config.COGNITO_CLIENT_ID,
      });
      const result = await this.cognito.send(command);
      return result;
    } catch (error) {
      console.error("Error in signIn Cognito", error);
      throw error;
    }
  }

  async logOut(token: any): Promise<any> {
    const command = new GlobalSignOutCommand({
      AccessToken: token,
    });

    return await this.cognito.send(command);
  }

  async forgotPassword(username: string): Promise<any> {
    const command = new ForgotPasswordCommand({
      ClientId: config.COGNITO_CLIENT_ID,
      Username: username,
    });

    return await this.cognito.send(command);
  }

  async confirmForgotPassword(
    username: string,
    code: string,
    newPassword: string
  ): Promise<any> {
    const command = new ConfirmForgotPasswordCommand({
      ClientId: config.COGNITO_CLIENT_ID,
      Username: username,
      ConfirmationCode: code,
      Password: newPassword,
    });

    return await this.cognito.send(command);
  }
}
