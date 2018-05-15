import crypto from 'crypto';
import {sign} from '../../services/jwt';
import {success} from '../../services/response/';
import {User} from './../../models/';
import {createMailOptions, createTransport, getResetPasswordUrl} from '../../services/email';
import * as Op from 'sequelize/lib/operators';

const REST_PASSWORD_EXPIRES = 21600000; // 6 hours

export const login = ({user}, res, next) =>
  sign(user.id)
    .then(token => ({token, user: user.view()}))
    .then(success(res, 201))
    .catch(next);

export const forgotPassword = (req, res) => {
  const {email} = req.body;
  User.findOne({
    where: {
      [Op.and]:
        [{email}, {facebookId: null}]
    }
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: 'Failed to send email with instructions. Please check if you have entered correct email address.',
        });
        return null;
      }
      return user;
    })
    .then((user) => {
      if (!user) {
        return null;
      }
      crypto.randomBytes(20, (err, buffer) => {
        const resetPasswordToken = buffer.toString('hex');
        user.update({
          resetPasswordToken,
          resetPasswordExpires: Date.now() + REST_PASSWORD_EXPIRES,
        }).then((updatedUser) => {
          const transporter = createTransport();
          const resetPasswordUrl = getResetPasswordUrl(req, resetPasswordToken);
          const mailOptions = createMailOptions(updatedUser, resetPasswordUrl);
          transporter.sendMail(mailOptions, (sendErr) => {
            if (sendErr) {
              return res.status(422).json({
                message: 'Failed to send email with instructions for resetting password.',
              });
            }
            return res.status(200).json({
              message: `An email has been sent to ${updatedUser.email} with further instructions.`,
            });
          });
        });
      });
    });
};

export const resetPassword = (req, res) => {
  const {token} = req.query;
  const {password} = req.body;
  User.findOne({
    where:
      {
        [Op.and]: [{resetPasswordToken: token}, {resetPasswordExpires: {[Op.gt]: Date.now()}}],
      },
  })
    .then((user) => {
      if (!user) {
        res.status(404).json({
          message: 'Your token for reseting password is expired or invalid.',
        });
        return null;
      }
      return user;
    })
    .then((user) => {
      if (!user) {
        return null;
      }
      User.hashPassword(password).then((hashedPassword) => {
        user.updateAttributes({
          password: hashedPassword,
          resetPasswordExpires: new Date(0),
          resetPasswordToken: '',
        }).then(() => res.status(200).json({
          message: 'Password has been updated',
        }))
          .catch(() => res.status(422).json({
            message: 'Password update failed',
          }));
      });
    });
};
