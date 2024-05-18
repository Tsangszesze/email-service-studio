import nodemailer from "nodemailer";

const { HOST_EMAIL_ADDRESS, HOST_EMAIL_PASSWORD, FORWARD_EMAIL_ADDRESS } =
  process.env;

export const hostEmail = HOST_EMAIL_ADDRESS || "email.service.studio@gmail.com";
export const csEmail = FORWARD_EMAIL_ADDRESS || "";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: hostEmail,
    pass: HOST_EMAIL_PASSWORD,
  },
});
