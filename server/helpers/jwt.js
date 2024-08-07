const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

//bikin function buat signing token + verif (pakai anon function)
const signToken = (payload) => jwt.sign(payload, secret)
const verifToken = (payload) => jwt.verify(payload, secret)

module.exports = {signToken, verifToken}