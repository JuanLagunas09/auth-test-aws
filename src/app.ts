import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/config";
import AuthRouter from "./routes/AuthRouter";
import { boomHandler } from "./middlewares/boomHandler";

// Stragy Passport JWT
import("./utilis/jwtStrategy");

const app = express();
app.use(express.json());
app.use(cors());

// PREFIX
const router = express.Router();
// STAGE API
app.use(`/${config.STAGE_API}/auth`, router);

// ROUTES
router.use("/", AuthRouter)

// Error handler
app.use(boomHandler);

// Init server
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

export default app;