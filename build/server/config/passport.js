"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/User');
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});
/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
            return done(null, false, {
                msg: 'Your account was registered using a sign-in provider. To enable password login,'
                    + ' sign in using a provider, and then set a password under your user profile.'
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false, { msg: 'Invalid email or password.' });
        });
    });
}));
/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return next();
};
//# sourceMappingURL=/Users/lucas/Development/Hackathon-Angular/server/config/passport.js.map