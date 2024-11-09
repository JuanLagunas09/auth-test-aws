export class AuthService {
    async hello(): Promise<string> {
        try {
            return "Hello World service!";
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}