const passport = require('passport');
const bcrypt = require('bcrypt');
const { Strategy: LocalStrategy } = require('passport-local');
const db = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // req.body.email
    passwordField: 'password', // req.body.password
  }, async (email, password, done) => {
    try {
      const exUser = await db.User.findOne({ where: { email } });
      if (!exUser) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
      }
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        return done(null, exUser);
      } else {
        return done(null, false, { reason: '비밀번호가 틀립니다.' });
      }
    } catch (err) {
      console.error(err);
      return done(err);
    }
  }));
};
