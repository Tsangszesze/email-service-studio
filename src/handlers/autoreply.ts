import express, { Request, Response } from "express";
import ejs from "ejs";
import Mail from "nodemailer/lib/mailer";
import path from "path";
// import fs from "fs";

import { transporter, HOST_EMAIL, CS_EMAIL } from "../config";
import generateText from "../helpers/email-texts/autoreply";
import { ReqBody } from "../types";

interface AutoreplyRequst extends ReqBody {
  message: string;
}

const send_autoreply = async (
  req: Request<Record<string, never>, string, AutoreplyRequst>,
  res: Response<string>,
) => {
  const {
    email,
    name,
    message: formContent,
    sender,
    contactEmail: senderContactEmail,
  } = req.body;

  // TODO: need to check the type of request body here

  const contactEmail = senderContactEmail || CS_EMAIL;
  if (!contactEmail) {
    console.log("AutoReply Handler: Contact Email is not configured")
    return res.status(500).send(`Contact Email is not configured`);
  }

  try {
    // Get base-64 string of email banner
    // var banner = fs.readFileSync(path.join(__dirname, "../../public/email-banner.png"), 'base64');

    // Generate Email HTML
    let html;
    ejs.renderFile(
      path.join(process.cwd(), "/public/email-templates/autoreply.ejs"),
      {
        name,
        formContent,
        sender,
        contactEmail: contactEmail,
        // banner: banner
      },
      (err, str) => (html = str),
    );

    // Generate Email Text
    const text = generateText({
      name,
      sender,
      contactEmail: contactEmail,
      formContent,
    });

    // Config Email Sending
    const mailOptions: Mail.Options = {
      to: email,
      subject: "Your contact form was received!",
      html: html,
      text: text,
      bcc: contactEmail,
      from: {
        name: sender || "Email.Service.Studio",
        address: HOST_EMAIL || "",
      },
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.status(200).end();
  } catch (error) {
    res.status(500).send(`Failed to send email to ${email}: ${error}`);
  }
};

export const autoreplyRoute = (app: express.Application) => {
  app.post("/autoreply", send_autoreply);
};
