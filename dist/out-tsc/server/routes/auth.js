"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var members_list_1 = require("../members-list");
var router = express.Router();
passport.use(new LocalStrategy(function verify(email, password, cb) {
    var userByEmail = members_list_1.MEMBERS.find(function (m) { return m.email === email; });
    if (!userByEmail || userByEmail.password !== password)
        return cb(null, false, { message: 'Incorrect username or password' });
    return cb(null, userByEmail);
}));
router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
//# sourceMappingURL=auth.js.map