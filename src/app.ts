import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/config";
import AuthRouter from "./routes/AuthRouter";
import { boomHandler, errorHandler } from "./middlewares/boomHandler";

// Stragy Passport JWT
import("./utilis/jwtStrategyMsvUser");
import("./utilis/jwtStrategy");


const app = express();
app.use(express.json());
app.use(cors());

// PREFIX
const router = express.Router();
// STAGE API
app.use(`/${config.STAGE_API}/auth`, router);

// ROUTES
router.use("/", AuthRouter);

// Error handler
app.use(boomHandler);
app.use(errorHandler);

// Init server
/* app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
}); */

const initApp = async () => {
  try {
    console.log("Initializing app auth");
  } catch (error) {
    console.log("Error initializing app", error);
  }
}

initApp();

export default app;
