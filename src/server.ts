import dotenv from "dotenv";
import cors from "cors";
import ejs from "ejs";
import express from "express";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";
import { port, origin } from "./config";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.HOST_EMAIL_ADDRESS,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
});

type OTPRequst = {
  to_email: string;
  from_email: string;
  sender: string;
  bcc: string;
  web: string;
};

app.post(
  "/otp",
  async (req: express.Request<OTPRequst>, res: express.Response) => {
    const { to_email, from_email, sender, bcc, web } = req.body;
    try {
      const template = fs.readFileSync("public/template.html", "utf-8");
      const renderedTemplate = ejs.render(template, { variableName: web });
      const number = 12123;
      const mailOptions = {
        from: {
          name: sender,
          address: from_email,
        },
        to: to_email,
        bcc: bcc,
        subject: "Data Received",
        text: `Received data: ${JSON.stringify(number)}`,
        html: renderedTemplate,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(`Nodemailer error sending email to ${to_email}`, error);
    }

    res.send("Data received successfully");
  },
);
app.get("/", (req: express.Request<OTPRequst>, res: express.Response) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(port, async () => {
  try {
    console.log(`Server running on localhost: ${port}`);
  } catch (error) {
    console.error("Unable to establish the connection:", error);
  }
});
