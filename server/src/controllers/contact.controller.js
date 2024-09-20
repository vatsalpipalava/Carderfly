import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import path from "path";
import nodemailer from "nodemailer";
import logger from "../utils/logger.js";
import { fileURLToPath } from "url";
import fs from "fs";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replacePlaceholders(template, values) {
  return template.replace(/{{(.*?)}}/g, (_, key) => values[key.trim()]);
}

async function verifyRecaptcha(token) {
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.GOOGLE_CAPTCHA_SECRET,
          response: token,
        },
      }
    );
    return response.data.success;
  } catch (error) {
    logger.error(`Error verifying reCAPTCHA: ${error}`);
    return false;
  }
}

const contactForm = asyncHandler(async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    throw new ApiError(400, "reCAPTCHA verification failed");
  }

  const templatePath = path.join(__dirname, "..", "mails", "contactForm.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const htmlContent = replacePlaceholders(template, {
    name: name,
    email: email.toLowerCase(),
    message: message,
  });

  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_CONTACT_EMAIL_HOST,
  //   port: process.env.SMTP_CONTACT_EMAIL_PORT,
  //   secure: true,
  //   auth: {
  //     user: process.env.SMTP_CONTACT_AUTH_EMAIL,
  //     pass: """,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_EMAIL_SERVICE,
    host: process.env.SMTP_EMAIL_HOST,
    port: process.env.SMTP_EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_AUTH_EMAIL,
      pass: process.env.SMTP_AUTH_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_AUTH_EMAIL}>`,
    to: process.env.SMTP_AUTH_EMAIL,
    replyTo: email,
    subject: "General Enquiry",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(`Error sending contact email: ${error}`);
      throw new ApiError(500, "Failed to send contact email");
    }
    logger.info(`Contact Email sent: ${info.response}`);
    return res
      .status(200)
      .json(new ApiResponse(200, {}, `Email sent successfully`));
  });
});

const supportForm = asyncHandler(async (req, res) => {
  const email = req.email;
  const firstName = req.firstName;
  const lastName = req.lastName;
  const { message } = req.body;

  // req.body - recaptchaToken
  // const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  // if (!isRecaptchaValid) {
  //   throw new ApiError(400, "reCAPTCHA verification failed");
  // }

  const templatePath = path.join(__dirname, "..", "mails", "contactForm.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const htmlContent = replacePlaceholders(template, {
    name: `${firstName} ${lastName}`,
    email: email.toLowerCase(),
    message: message,
  });

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_EMAIL_SERVICE,
    host: process.env.SMTP_EMAIL_HOST,
    port: process.env.SMTP_EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_AUTH_EMAIL,
      pass: process.env.SMTP_AUTH_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${process.env.SMTP_AUTH_EMAIL}>`,
    to: process.env.SMTP_AUTH_EMAIL,
    replyTo: email,
    subject: "Support",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error(`Error sending contact email: ${error}`);
      throw new ApiError(500, "Failed to send contact email");
    }
    logger.info(`Contact Email sent: ${info.response}`);

    const thankyouTemplatePath = path.join(
      __dirname,
      "..",
      "mails",
      "Thankyou.html"
    );
    const thankyouTemplate = fs.readFileSync(thankyouTemplatePath, "utf-8");

    const thankyouHtmlContent = replacePlaceholders(thankyouTemplate, {
      name: `${firstName} ${lastName}`,
    });

    const thankYouMailOptions = {
      from: `"Carderfly" <${process.env.SMTP_AUTH_EMAIL}>`,
      to: email,
      subject: "Thank you for your message",
      html: thankyouHtmlContent,
    };

    transporter.sendMail(thankYouMailOptions, (error, info) => {
      if (error) {
        logger.error(`Error sending thankyou email: ${error}`);
        throw new ApiError(500, "Failed to send thankyou email");
      }
      logger.info(`Thankyou Email sent: ${info.response}`);
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, `Email sent successfully`));
  });
});

export { contactForm, supportForm };
