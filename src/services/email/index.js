import nodemailer from 'nodemailer';
import {mailOptions} from './../../../config/config';

export const createTransport = () => nodemailer.createTransport(mailOptions);

export const createMailOptions = (user, resetPasswordUrl) => {
  const mailOpts = {
    from: 'Questionnaire <resetpassword@questionnaire.com>',
    to: user.email,
    subject: 'Questionnaire reset password',
    text: `Dear ${user.fullName},
        You requested for a password reset, kindly use this ${resetPasswordUrl} link to reset your password
        Cheers!`,
    html: `<div>
        <h3>Dear ${user.fullName},</h3>
        <p>You requested for a password reset, kindly use this <a href="${resetPasswordUrl}">link</a> to reset your password.</p>
        <br>
        <p>Cheers!</p>
    </div>`,
  };
  return mailOpts;
};

export const getResetPasswordUrl = (req, token) => {
  return `${req.protocol}://${req.headers.host}${req.originalUrl}?token=${token}`;
};
