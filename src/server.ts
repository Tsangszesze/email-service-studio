// import dotenv from "dotenv";
import ejs from "ejs";
import express from "express";
import fs from "fs";
import nodemailer from "nodemailer";

// Create Server
const app = express();

// Middleware
app.use(express.json());

// -- Uncomment to init environment variables for local development --
// dotenv.config();
// -- Uncomment to init environment variables for local development --

// Init nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.HOST_EMAIL_ADDRESS,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
});

type OTPRequst = {
  to_email: string;
  from_email: string;
  sender: string;
  bcc: string;
  web: string;
};

// Routes
app.post(
  "/otp",
  async (req: express.Request<OTPRequst>, res: express.Response) => {
    const { to_email, from_email, sender, bcc, web } = req.body;
    try {
      const template = fs.readFileSync("template.html", "utf-8");
      const renderedTemplate = ejs.render(template, { variableName: web });
      const number = 12123;
      const mailOptions = {
        from: {
          name: sender,
          address: from_email,
        },
        to: to_email,
        bcc: bcc,
        subject: "Data Received",
        text: `Received data: ${JSON.stringify(number)}`,
        html: renderedTemplate,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(`Nodemailer error sending email to ${to_email}`, error);
    }

    res.send("Data received successfully");
  },
);
app.get(
  "/", (req: express.Request<OTPRequst>, res: express.Response) => {
    console.log('Testing')
    res.send(`Hi ${process.env.TESTVAR}`);
  },
);


// -- Uncomment to start localhost server for local development and testing --
// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server running on localhost: ${port}`);
// });
// -- Uncomment to start localhost server for local development and testing --
