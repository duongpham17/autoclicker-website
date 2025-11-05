import nodemailer from 'nodemailer';

export const email_address = process.env.EMAIL_ADDRESS;
export const email_password = process.env.EMAIL_PASSWORD;

export const Email = () =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });