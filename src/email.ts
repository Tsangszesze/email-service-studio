import nodemailer from "nodemailer";

const {HOST_EMAIL_ADDRESS, HOST_EMAIL_PASSWORD, FORWARD_EMAIL_ADDRESS} = process.env

export const host_email = HOST_EMAIL_ADDRESS || "email.service.studio@gmail.com"
export const cs_email = FORWARD_EMAIL_ADDRESS || ""

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: host_email,
    pass: HOST_EMAIL_PASSWORD,
  },
});