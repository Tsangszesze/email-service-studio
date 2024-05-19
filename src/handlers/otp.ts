import express, { Request, Response } from "express";
import ejs from "ejs";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import cryptoRandomString from "crypto-random-string";

import { transporter, HOST_EMAIL, csEmail } from "../config/email";
import generateText from "../emails/email-texts/autoreply";
import { ReqBody, ResBody } from "../types";

interface OTPRequst extends ReqBody {}

const send_otp = async (
  req: Request<Record<string, never>, ResBody, OTPRequst>,
  res: Response<ResBody>,
) => {
  const { email, name, sender } = req.body;

  // TODO: need to check the type of request body here

  try {
    // Generate OTP
    const otpContent = cryptoRandomString({ length: 6, type: "numeric" });

    // Encode OTP with salt

    // Generate Email HTML
    let html;
    ejs.renderFile(
      path.join(__dirname, "../emails/email-templates/otp.ejs"),
      {
        name,
        sender,
        otpContent,
        csEmail: csEmail,
      },
      (err, str) => (html = str),
    );

    // Generate Email Text
    const text = generateText({ name, sender, otpContent, csEmail });

    // Config Email Sending
    const mailOptions: Mail.Options = {
      to: email,
      subject: "One Time Password",
      text: text,
      html: html,
      bcc: csEmail,
      from: {
        name: sender || "Email.Service.Studio",
        address: HOST_EMAIL,
      },
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    // Send back the encoded OTP to requested server
    res.status(200).end();
  } catch (error) {
    res
      .status(500)
      .send(
        new ResBody(`Nodemailer error sending email to ${email}: ${error}`),
      );
  }
};

export const otpRoute = (app: express.Application) => {
  app.post("/otp", validateAuth, send_otp);
};
