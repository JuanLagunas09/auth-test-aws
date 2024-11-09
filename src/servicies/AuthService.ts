export class AuthService {
    async hello(): Promise<string> {
        try {
            return "Hello World With Actions!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}