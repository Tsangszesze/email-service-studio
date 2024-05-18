import 'module-alias/register';

import cors from "cors";
import express, { Request, Response } from "express";
import path from "path";

import { serverPort, corsOptions } from "./config";
import { autoreply_route } from "./handlers/autoreply";

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/client", express.static("client"));

// interface RequestWithToken extends Request {
//   token?: string;
// }

// app.use((req: RequestWithToken, res, next) => {
// });

// app.use((req,res,next)=> {
//   const token = req.get("Authorization")
//   if(token){
//     req.token = token;
//     next();
//   } else {
//     res.status(403).send({
//       errr: "please provide key"
//     })
//   }
// })

autoreply_route(app);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(serverPort, () => {
  try {
    console.log(`Server running on ${corsOptions.origin}`);
  } catch (error) {
    console.error("Unable to establish the connection:", error);
  }
});
