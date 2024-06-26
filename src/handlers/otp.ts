import express, { Request, Response } from "express";
import ejs from "ejs";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import bcrypt from "bcryptjs";

import { transporter, HOST_EMAIL, CS_EMAIL } from "../config";
import generateText from "../helpers/email-texts/otp";
import { ReqBody } from "../types";
import { OTP_PEPPER, OTP_PEPPER_ROUND } from "../config";
import randomstring from "randomstring";

interface OTPRequst extends ReqBody {}

const send_otp = async (
  req: Request<Record<string, never>, string, OTPRequst>,
  res: Response<string>,
) => {
  const { email, name, sender, contactEmail: senderContactEmail } = req.body;

  // TODO: need to check the type of request body here

  const contactEmail = senderContactEmail || CS_EMAIL;
  if (!contactEmail) {
    return res.status(500).send(`Contact Email is not configured`);
  }

  if (!OTP_PEPPER) {
    return res.status(500).send(`OTP env is not configured`);
  }

  try {
    // Generate OTP
    const otpContent = randomstring.generate({
      charset: "numeric",
      length: 6,
    });

    // Encode OTP with salt
    const encodedOtp = bcrypt.hashSync(
      otpContent + OTP_PEPPER,
      parseInt(OTP_PEPPER_ROUND || "5"),
    );

    // Generate Email HTML
    let html;
    ejs.renderFile(
      path.join(process.cwd(), "/public/email-templates/otp.ejs"),
      {
        name,
        sender,
        otpContent,
        contactEmail: contactEmail,
      },
      (err, str) => (html = str),
    );

    // Generate Email Text
    const text = generateText({
      name,
      sender,
      otpContent,
      contactEmail: contactEmail,
    });

    // Config Email Sending
    const mailOptions: Mail.Options = {
      to: email,
      subject: "Verification Code",
      text: text,
      html: html,
      from: {
        name: sender || "Email.Service.Studio",
        address: HOST_EMAIL || "",
      },
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    // Send back the encoded OTP to requested server
    res.status(200).send(encodedOtp);
  } catch (error) {
    res.status(500).send(`Failed to send OTP email to ${email}: ${error}`);
  }
};

// export const otpRoute = (app: express.Application) => {
//   app.post("/otp", validateAuth, send_otp);
// };

export const otpRoute = (app: express.Application) => {
  app.post("/otp", send_otp);
};
