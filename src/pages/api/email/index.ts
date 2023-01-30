import { NextApiHandler } from "next";
import nodemailer, { SendMailOptions } from "nodemailer";

export interface EmailBody {
  senderEmail: string;
  emailSubject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.RECEIVER_EMAIL,
    pass: process.env.RECEIVER_PASS,
  },
});

const handler: NextApiHandler = async (req, res) => {
  try {
    switch (req.method) {
      case "POST": {
        const { emailSubject, senderEmail, message } = req.body as EmailBody;

        if (!emailSubject || !senderEmail || !message) throw new Error();

        const mailOptions: SendMailOptions = {
          from: senderEmail,
          to: process.env.RECEIVER_EMAIL,
          subject: `Message from ${senderEmail}: ${emailSubject}`,
          text: message,
          priority: "high",
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            throw new Error();
          }
        });

        res.status(204).end();
        break;
      }

      default: {
        res.status(405).json({ message: "Invalid method for the request" });
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export default handler;
