import { CognitoService } from "./CognitoService";

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

            if(resultCognito.$metadata.httpStatusCode === 200) {
                return resultCognito;
            } else {
                throw new Error("Error al registar el usuario en cognito");
            }
        } catch (error) {
            console.error("Error in signUp", error);
            throw error;
        }
    }
}