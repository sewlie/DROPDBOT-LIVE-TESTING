const router = require('express').Router()
const passport = require('passport')

function AuthCheck(req,res, next) {
    if (req.user) {
        next()
    } else {
        //res.redirect("/")
        res.redirect('/auth/twitch')
    }
}

router.get('/', AuthCheck, (req,res) => {
    res.render('profile',{user:req.user})
})

router.get('/rewards', AuthCheck ,(req,res) => {
    res.render('rewards',{user:req.user})
})

module.exports = router