import "dotenv/config";

export const config = {
    PORT: process.env.PORT || 3000,
    STAGE_API: process.env.STAGE_API || "V1",
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || "",
}