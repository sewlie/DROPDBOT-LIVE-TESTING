const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    twitch_id: Number,
    twitch_username: String,
    eth_address: String,
    player_id: Number,
    discord_id: Number,
    discord_username: String
})

const User = mongoose.model('user',userSchema)

module.exports = User