import dotenv from "dotenv";
import cors from "cors";
import ejs from "ejs";
import express, { Request, Response } from "express";
import fs from "fs";
import nodemailer from "nodemailer";
import path from "path";
import { port } from "./config";
import Mail from "nodemailer/lib/mailer";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/client", express.static("client"));

dotenv.config();

const { HOST_EMAIL_ADDRESS, HOST_EMAIL_PASSWORD, FORWARD_EMAIL_ADDRESS } =
  process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: HOST_EMAIL_ADDRESS,
    pass: HOST_EMAIL_PASSWORD,
  },
});

type AutoreplyRequst = {
  email: string;
  name: string;
  message: string;
};

app.post(
  "/form-autoreply",
  async (
    req: Request<unknown, string, AutoreplyRequst>,
    res: Response<string>,
  ) => {
    const { email, name, message } = req.body;

    const sender = req.get("HttpsAgent") || req.get("Httpagent");

    if (!HOST_EMAIL_ADDRESS) {
      return res.status(500).send("Host email address is missing");
    }

    try {
      // Read Email HTML Template
      const template = fs.readFileSync(
        "public/form-autoreply-email.html",
        "utf-8",
      );
      const renderedTemplate = ejs.render(template, {
        sender,
        name,
        message,
        email: FORWARD_EMAIL_ADDRESS,
      });
      // Config Email
      const mailOptions: Mail.Options = {
        from: {
          name: sender || "Email.Service.Studio",
          address: HOST_EMAIL_ADDRESS,
        },
        to: email,
        bcc: FORWARD_EMAIL_ADDRESS,
        subject: "Your contact form was received!",
        text: `Dear ${name}, Thank you for contacting us. This email is to notify you that your message from the contact form is well received. We will get back to you as soon as possible. All the best, ${sender}. *This is an email supported by Email.Service.Studio. If you have questions about this email or any other enquiry, please do not reply but email us directly: ${FORWARD_EMAIL_ADDRESS}.`,
        html: renderedTemplate,
      };
      // Send Email
      await transporter.sendMail(mailOptions);
      res.send("Confirmation email is sent");
    } catch (error) {
      res
        .status(500)
        .send(`Nodemailer error sending email to ${email}: ${error}`);
    }
  },
);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/client/index.html"));
});

app.listen(port, async () => {
  try {
    console.log(`Server running on localhost: ${port}`);
  } catch (error) {
    console.error("Unable to establish the connection:", error);
  }
});
