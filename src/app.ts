import express, {
  response,
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route.js";
import { profileRoute } from "./modules/profile/profile.route.js";
const app: Application = express();

app.use(express.json());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", profileRoute);

export default app;
