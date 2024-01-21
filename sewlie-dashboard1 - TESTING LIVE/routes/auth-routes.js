const router = require('express').Router()
const passport = require('passport')

router.get('/twitch', passport.authenticate('twitch'))

router.get('/twitch/callback', passport.authenticate('twitch', {failureRedirect: '/sewlie'}), (req,res) => {
    res.redirect('/profile')
})

router.get('/discord', passport.authenticate('discord'))

router.get('/discord/callback', passport.authenticate('discord', {failureRedirect: '/profile/user'}), (req,res) => {
    res.redirect('/profile')
})

router.get('/logout', (req,res) => {
    req.logout()
    res.redirect("/")
})
module.exports = router