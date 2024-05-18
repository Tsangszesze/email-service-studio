import express, { Request, Response } from "express";
import ejs from "ejs";
import fs from "fs";
import Mail from "nodemailer/lib/mailer";

import { transporter, host_email, cs_email } from "../email";
import generateText from "../emails/email_texts/autoreply";
import { ResBody } from "../types";

type AutoreplyRequst = {
  email: string;
  subject: string;
  name: string;
  message: string;
};

const send_autoreply = async (
  req: Request<{}, ResBody, AutoreplyRequst>,
  res: Response<ResBody>,
) => {
  const { email, subject, name, message } = req.body;
  const sender = req.get("HttpsAgent") || req.get("Httpagent");

  if (!sender) {
    // Need to check the req.body as well??
    res.status(400).send(new ResBody("Agent information is missing"));
    return;
  }

  try {
    // Read Email HTML Template
    const template = fs.readFileSync(
      "public/email_templates/form-autoreply-email.html",
      "utf-8",
    );

    // Generate Email HTML
    const html = ejs.render(template, {
      sender,
      cs_email: cs_email,
      name,
      message,
    });

    // Generate Email Text
    const text = generateText({ sender, cs_email, name });

    // Config Email Sending
    const mailOptions: Mail.Options = {
      bcc: cs_email,
      from: {
        name: sender || "Email.Service.Studio",
        address: host_email,
      },
      to: email,
      subject: subject || "Your form was received!",
      text: text,
      html: html,
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

export const autoreply_route = (app: express.Application) => {
  app.post("/autoreply", send_autoreply);
};
