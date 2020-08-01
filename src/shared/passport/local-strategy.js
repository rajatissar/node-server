import { set, pick } from 'lodash';
import passport from 'passport';
import { Strategy } from 'passport-local';

import UserModel from '../../models/user-model';
import { ERROR_MESSAGES } from '../../helpers/messages';
import { validatePassword } from '../../helpers/functions';
import { findOneRecord } from '../mongodb';

passport.serializeUser((user, done) => {
  done(null, user._id); // eslint-disable-line
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findOneRecord(UserModel, { _id: id });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (username, password, done) => {
      try {
        // check if user exist in db or not
        const user = await findOneRecord(UserModel, { email: username });
        if (!user) {
          return done(
            null,
            false,
            { emailError: true, message: ERROR_MESSAGES.EMAIL_ID_NOT_EXIST }
          );
        }

        // check if password match
        if (!validatePassword(password, user.password)) {
          return done(
            null,
            false,
            { passwordError: true, message: ERROR_MESSAGES.INCORRECT_PASSWORD }
          );
        }

        const responseUser = pick(user, ['_id', 'email', 'verify']);
        set(responseUser, 'success', true);
        return done(null, responseUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);
