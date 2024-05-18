import express, { Request, Response } from "express";
import ejs from "ejs";
import fs from "fs";
import Mail from "nodemailer/lib/mailer";

import { transporter, hostEmail, csEmail } from "../email";
import generateText from "../emails/email-texts/autoreply";
import { ResBody } from "../types";

type AutoreplyRequst = {
  email: string;
  subject: string;
  name: string;
  message: string;
  sender: string;
};

const send_autoreply = async (
  req: Request<Record<string, never>, ResBody, AutoreplyRequst>,
  res: Response<ResBody>,
) => {
  const { email, subject, name, message, sender } = req.body;

  // TODO: need to check the type of request body here

  try {
    // Read Email HTML Template
    const template = fs.readFileSync(
      "/emails/email_templates/autoreply.ejs",
      "utf-8",
    );

    // Generate Email HTML
    const html = ejs.render(template, {
      name,
      message,
      sender,
      csEmail: csEmail,
    });

    // Generate Email Text
    const text = generateText({ name, sender, csEmail });

    // Config Email Sending
    const mailOptions: Mail.Options = {
      to: email,
      subject: subject || "Your form was received!",
      text: text,
      html: html,
      bcc: csEmail,
      from: {
        name: sender || "Email.Service.Studio",
        address: hostEmail,
      },
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.status(200);
  } catch (error) {
    res
      .status(500)
      .send(
        new ResBody(`Nodemailer error sending email to ${email}: ${error}`),
      );
  }
};

export const autoreplyRoute = (app: express.Application) => {
  app.post("/autoreply", send_autoreply);
};
