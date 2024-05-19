import nodemailer from "nodemailer";

// Prod and Dev

export const HOST_EMAIL = process.env.HOST_EMAIL_ADDRESS;
export const CS_EMAIL = process.env.FORWARD_EMAIL_ADDRESS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
});
