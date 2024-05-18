import "module-alias/register";

import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";

import { SERVER_PORT, corsOptions, CLIENT_AUTH_PAIRS, SERVER_ORIGIN } from "./config";
import { autoreplyRoute } from "./handlers/autoreply";
import { ResBody } from "./types";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/client", express.static("client"));

app.use((req, res, next) => {
  const key = req.get("Authorization");
  const origin = req.get("origin");

  // Validate correct headers provided
  if (!key || !origin) {
    return res.status(400).send(new ResBody("Please correct headers"));
  }

  // Validate API key
  const secret = CLIENT_AUTH_PAIRS[origin];
  if (secret !== key) {
    return res.status(401).send(new ResBody("Invalid API key"));
  }

  next();
});

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
