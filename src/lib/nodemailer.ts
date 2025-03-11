import nodemailer from "nodemailer";

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;

const transporter = nodemailer.createTransport({
  //service: SMTP_SERVER_SERVICE,
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

interface Props {
  subject: string;
  email: string;
  html: string;
}

export async function sendMail({ subject, email, html }: Props) {
  try {
    const isVerified = await transporter.verify();
    if (!isVerified) {
      throw new Error('SMTP server verification failed');
    }
  } catch (error) {
    console.error('Error verifying SMTP server:', error);
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: email,
      subject: subject,
      html: html,
    });
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
  }
}