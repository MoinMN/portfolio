import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  // service: "smtp",
  host: "smtp.titan.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSCODE,
  },
});

// Set up email data
export const sender = {
  from: `"Moin MN" ${process.env.EMAIL_ADDRESS}`, // sender address
};
