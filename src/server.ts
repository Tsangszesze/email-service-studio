import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";

import { autoreplyRoute } from "./handlers/autoreply";
import { validateAPIKey } from "./middlewares";
import { corsOptions, MIX_SERVER_ORIGIN, MIX_SERVER_PORT } from "./config";
import { otpRoute } from "./handlers/otp";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use("/client", express.static("client"));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.use(validateAPIKey);

autoreplyRoute(app);
otpRoute(app);

app.listen(MIX_SERVER_PORT, () => {
  try {
    console.log(`Server running on ${MIX_SERVER_ORIGIN}`);
  } catch (error) {
    console.error("Unable to establish the connection:", error);
  }
});
