export interface IUser {
    id: number;
    name: string; // Cognito
    lastname: string; // Cognito
    username: string; // Cognito
    email: string; // Cognito
    password: string; // Cognito
    phone: string; // Cognito
    adress: string; // Cognito
    role: string;
    status: string;
    id_cognito?: string; 
    createdDate: Date;
    updatedDate: Date;
}


export interface ISignUp extends Omit <IUser, 'id' | 'role' | 'status' | 'id_cognito' | 'createdDate' | 'updatedDate'> {}