"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const members_list_1 = require("../members-list");
const router = express.Router();
passport.use(new LocalStrategy(function verify(email, password, cb) {
    const userByEmail = members_list_1.MEMBERS.find(m => m.email === email);
    if (!userByEmail || userByEmail.password !== password)
        return cb(null, false, { message: 'Incorrect username or password' });
    return cb(null, userByEmail);
}));
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
//# sourceMappingURL=/Users/lucas/Development/Angular-Node-Express-Typescript-master/server/routes/auth.js.map