import "module-alias/register";

import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";

import { SERVER_PORT, corsOptions, SERVER_ORIGIN } from "./config";
import { autoreplyRoute } from "./handlers/autoreply";
import { validateAPIKey } from "./middlewares";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/client", express.static("client"));
app.use(validateAPIKey);

autoreplyRoute(app);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(SERVER_PORT, () => {
  try {
    console.log(`Server running on ${SERVER_ORIGIN}`);
  } catch (error) {
    console.error("Unable to establish the connection:", error);
  }
});
