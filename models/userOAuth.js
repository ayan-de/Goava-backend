const mongoose = require('mongoose')

const userOAuthSchema = new mongoose.Schema({
    name: String,
    googleId: String,
    email: String
})

module.exports= mongoose.model('UserOAuth', userOAuthSchema)