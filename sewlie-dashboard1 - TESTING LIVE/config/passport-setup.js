const passport = require('passport')
const TwitchStrategy = require('passport-twitch').Strategy
const DiscordStrategy = require('passport-discord')
const axios = require('axios')

const User = require('./user-model')
const keys = require('./keys')

passport.serializeUser((user, done) => {
    done(null,user)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null,user)
    })
})

passport.use(new DiscordStrategy({
    passReqToCallback: true,
    clientID: keys.discord.clientID,
    clientSecret: keys.discord.clientSecret,
    callbackURL: '/auth/discord/callback',
    scope: 'identify'
}, (req, accessToken, refreshToken, profile, done) => {
    User.findOneAndUpdate({twitch_id:req.user.twitch_id},{discord_id:profile.id,discord_username:profile.username},{new:true}).then((currentUser) => {
        
        if (currentUser.eth_address == '') {
            var eth_address_py = "NONE"
        } else {
            var eth_address_py = currentUser.eth_address
        }
        if (currentUser.player_id == '') {
            var player_id_py = "NONE"
        } else {
            var player_id_py = currentUser.player_id
        }

        if (currentUser.discord_id == null) {
            var discord_id_py = "NONE"
        } else {
            var discord_id_py = currentUser.discord_id
        }

        axios.post(keys.pebblehost.url, {twitch_id:currentUser.twitch_id,eth_address:eth_address_py,player_id:player_id_py,discord_id:discord_id_py})
        .then((response) => {
            console.log(response)
        })
        console.log("updated user :"+currentUser)
        done(null, currentUser)
    })
}))

passport.use(new TwitchStrategy({
    clientID: keys.twitch.clientID,
    clientSecret: keys.twitch.clientSecret,
    callbackURL: '/auth/twitch/callback',
    scope: "user_read"
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOneAndUpdate({twitch_id:profile.id},{twitch_username:profile.displayName},{new:true}).then((currentUser) => {
        if (currentUser) {
            console.log("User found: "+currentUser)
            done(null, currentUser)
        } else {
            new User({
                twitch_id:profile.id,
                twitch_username:profile.displayName,
                eth_address: null,
                player_id: null,
                discord_id: null,
                discord_username: null
            }).save().then((newUser) => {
                console.log("User created: "+newUser)
                done(null,newUser)
            })
        }
    })
}))