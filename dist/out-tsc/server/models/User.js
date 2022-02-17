"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bcrypt = require('bcrypt');
var crypto = require('crypto');
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerified: Boolean,
    snapchat: String,
    facebook: String,
    twitter: String,
    google: String,
    github: String,
    instagram: String,
    linkedin: String,
    steam: String,
    twitch: String,
    quickbooks: String,
    tokens: Array,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, { timestamps: true });
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    var user = this;
    if (!user.isModified('password')) {
        return next();
    }
    exports.bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return next(err);
        }
        exports.bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    exports.bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        cb(err, isMatch);
    });
};
/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size) {
    if (!size) {
        size = 200;
    }
    if (!this.email) {
        return "https://gravatar.com/avatar/?s=" + size + "&d=retro";
    }
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return "https://gravatar.com/avatar/" + md5 + "?s=" + size + "&d=retro";
};
var User = mongoose.model('User', userSchema);
module.exports = User;
//# sourceMappingURL=User.js.map