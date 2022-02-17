"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = require('axios');
var validator = require('validator');
var nodemailer = require('nodemailer');
var nodemailerSendgrid = require('nodemailer-sendgrid');
/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = function (req, res) {
    var unknownUser = !(req.user);
    res.render('contact', {
        title: 'Contact',
        sitekey: process.env.RECAPTCHA_SITE_KEY,
        unknownUser: unknownUser,
    });
};
/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    function getValidateReCAPTCHA(token) {
        return exports.axios.post("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.RECAPTCHA_SECRET_KEY + "&response=" + token, {}, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
        });
    }
    var validationErrors, fromName, fromEmail, validateReCAPTCHA, transportConfig_1, transporter_1, mailOptions_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                validationErrors = [];
                if (!req.user) {
                    if (validator.isEmpty(req.body.name))
                        validationErrors.push({ msg: 'Please enter your name' });
                    if (!validator.isEmail(req.body.email))
                        validationErrors.push({ msg: 'Please enter a valid email address.' });
                }
                if (validator.isEmpty(req.body.message))
                    validationErrors.push({ msg: 'Please enter your message.' });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, getValidateReCAPTCHA(req.body['g-recaptcha-response'])];
            case 2:
                validateReCAPTCHA = _a.sent();
                if (!validateReCAPTCHA.data.success) {
                    validationErrors.push({ msg: 'reCAPTCHA validation failed.' });
                }
                if (validationErrors.length) {
                    req.flash('errors', validationErrors);
                    return [2 /*return*/, res.redirect('/contact')];
                }
                if (!req.user) {
                    fromName = req.body.name;
                    fromEmail = req.body.email;
                }
                else {
                    fromName = req.user.profile.name || '';
                    fromEmail = req.user.email;
                }
                if (process.env.SENDGRID_API_KEY) {
                    transportConfig_1 = nodemailerSendgrid({
                        apiKey: process.env.SENDGRID_API_KEY
                    });
                }
                else {
                    transportConfig_1 = {
                        auth: {
                            user: process.env.SMTP_USER,
                            pass: process.env.SMTP_PASSWORD
                        }
                    };
                }
                transporter_1 = nodemailer.createTransport(transportConfig_1);
                mailOptions_1 = {
                    to: process.env.SITE_CONTACT_EMAIL,
                    from: fromName + " <" + fromEmail + ">",
                    subject: 'Contact Form | Hackathon Starter',
                    text: req.body.message
                };
                return [2 /*return*/, transporter_1.sendMail(mailOptions_1)
                        .then(function () {
                        req.flash('success', { msg: 'Email has been sent successfully!' });
                        res.redirect('/contact');
                    })
                        .catch(function (err) {
                        if (err.message === 'self signed certificate in certificate chain') {
                            console.log('WARNING: Self signed certificate in certificate chain. Retrying with the self signed certificate. Use a valid certificate if in production.');
                            transportConfig_1.tls = transportConfig_1.tls || {};
                            transportConfig_1.tls.rejectUnauthorized = false;
                            transporter_1 = nodemailer.createTransport(transportConfig_1);
                            return transporter_1.sendMail(mailOptions_1);
                        }
                        console.log('ERROR: Could not send contact email after security downgrade.\n', err);
                        req.flash('errors', { msg: 'Error sending the message. Please try again shortly.' });
                        return false;
                    })
                        .then(function (result) {
                        if (result) {
                            req.flash('success', { msg: 'Email has been sent successfully!' });
                            return res.redirect('/contact');
                        }
                    })
                        .catch(function (err) {
                        console.log('ERROR: Could not send contact email.\n', err);
                        req.flash('errors', { msg: 'Error sending the message. Please try again shortly.' });
                        return res.redirect('/contact');
                    })];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=contact.js.map