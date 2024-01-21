const router = require('express').Router()
const passport = require('passport')

router.get('/GodsUnchained' ,(req,res) => {
    res.render('game_godsUnchained',{user:req.user})
})

router.get('/CrossTheAges' ,(req,res) => {
    res.render('game_crossTheAges',{user:req.user})
})

router.get('/GuildOfGuardians' ,(req,res) => {
    res.render('game_guildofGuardians',{user:req.user})
})

router.get('/Illuvium' ,(req,res) => {
    res.render('game_illuvium',{user:req.user})
})

module.exports = router