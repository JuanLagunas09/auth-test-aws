import {
  CognitoIdentityProviderClient,
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
      console.error("Error in signUp", error);
      throw error;
    }
  }
}
