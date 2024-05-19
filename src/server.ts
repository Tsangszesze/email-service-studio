import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";

import { autoreplyRoute } from "./handlers/autoreply";
import { validateAPIKey } from "./middlewares";
import { corsOptions, MIX_SERVER_ORIGIN, MIX_SERVER_PORT } from "./config";

const app = express();

app.use(cors(corsOptions));
app.use(validateAPIKey);
app.use(express.json());
app.use("/client", express.static("client"));

autoreplyRoute(app);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(MIX_SERVER_PORT, () => {
  try {
    console.log(`Server running on ${MIX_SERVER_ORIGIN}`);
  } catch (error) {
    console.error("Unable to establish the connection:", error);
  }
});
