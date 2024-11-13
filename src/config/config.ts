import "dotenv/config";

export const config = {
    PORT: process.env.PORT || 3000,
    STAGE_API: process.env.STAGE_API || "V1",
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || "",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SECRET_CONNECT: process.env.JWT_SECRET_CONNECT,
    TOKEN_CONNECT: process.env.TOKEN_CONNECT,
}