import * as express from 'express'
import * as passport from 'passport'
import * as LocalStrategy from 'passport-local'

import { MEMBERS } from "../members-list";

const router = express.Router()

passport.use(new LocalStrategy(function verify(email, password, cb) {
  const userByEmail = MEMBERS.find(m => m.email === email)
  if (!userByEmail || userByEmail.password !== password) return cb(null, false, { message: 'Incorrect username or password' })
  return cb(null, userByEmail)
}))

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
