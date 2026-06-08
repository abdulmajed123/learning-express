import express, {
  response,
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
import { authRoute } from "./modules/auth/auth.route.js";
import logger from "./middleware/logger.js";
import cookiePerser from "cookie-parser";
import cors from "cors";
import { globalErrorHandler } from "./middleware/globalErrorHnadler.js";
const app: Application = express();

app.use(cookiePerser());
app.use(express.json());
app.use(express.text());
app.use(logger);
const corsOptions = {
  origin: "http://localhost:3000/",
};
app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);
export default app;
