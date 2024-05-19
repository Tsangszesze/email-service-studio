import express, { Request, Response } from "express";
import ejs from "ejs";
import Mail from "nodemailer/lib/mailer";
import path from "path";

import { transporter, HOST_EMAIL, CS_EMAIL } from "../config/email";
import generateText from "../emails/email-texts/autoreply";
import { ReqBody, ResBody } from "../types";

interface AutoreplyRequst extends ReqBody {
  formContent: string;
}

const send_autoreply = async (
  req: Request<Record<string, never>, ResBody, AutoreplyRequst>,
  res: Response<ResBody>,
) => {
  const { email, name, formContent, sender } = req.body;

  // TODO: need to check the type of request body here

  try {
    // Generate Email HTML
    let html;
    ejs.renderFile(
      path.join(__dirname, "../emails/email-templates/autoreply.ejs"),
      {
        name,
        formContent,
        sender,
        csEmail: CS_EMAIL,
      },
      (err, str) => (html = str),
    );

    // Generate Email Text
    const text = generateText({ name, sender, csEmail: CS_EMAIL });

    // Config Email Sending
    const mailOptions: Mail.Options = {
      to: email,
      subject: "Your contact form was received!",
      text: text,
      html: html,
      bcc: CS_EMAIL,
      from: {
        name: sender || "Email.Service.Studio",
        address: HOST_EMAIL || "",
      },
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    res.status(200).end();
  } catch (error) {
    res
      .status(500)
      .send(
        new ResBody(`Failed to send email to ${email}: ${error}`),
      );
  }
};

export const autoreplyRoute = (app: express.Application) => {
  app.post("/autoreply", send_autoreply);
};
