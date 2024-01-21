const router = require('express').Router()
const passport = require('passport')
const mongoose = require('mongoose')
const axios = require('axios')

const keys = require('../config/keys')
const User = require('../config/user-model')

router.post("/info", async (req,res) => {
    var twitch_id = req.body.twitch_id
    var eth_address = req.body.eth_address
    var player_id = req.body.player_id

    if (eth_address == '') {eth_address = 'x'}
    if (player_id == '') {player_id = -1}

    //check if player ID is unique in our data
    var users = await User.find({player_id:player_id})
    for (var i = 0; i < users.length; i ++) {
        if (users[i].twitch_id !== twitch_id) {
            res.status(200).json({
                status:"failed",
                message:"Player ID already in use"})
            return
        }
    }

    //check if eth address is unique in our data
    var users = await User.find({eth_address:eth_address})
    for (var i = 0; i < users.length; i ++) {
        if (users[i].twitch_id !== twitch_id) {
            res.status(200).json({
                status:"failed",
                message:"ETH address already in use"})
            return
        }
    }
            
    //check if eth is valid and linked to IMX
    var response = await axios.get(`https://api.x.immutable.com/v1/users/${eth_address}`,{validateStatus: () => true})
    if (response.data.code == "account_not_found") {
        res.status(200).json({
            status:"failed",
            message:"ETH address not valid or linked to IMX. Use a valid eth address (no ENS)"})
        return
    }

    //check if ETH is linked to entered player ID when possible
    if (eth_address != 'x' && player_id != -1) {
        try {
            var response = await axios.get(`https://auth.prod.prod.godsunchained.com/user/${player_id}`)
            if (!response.data.addresses.map((x) => x.address.toLowerCase()).includes(eth_address.toLowerCase())) {
                res.status(200).json({
                    status:"failed",
                    message:"ETH address is not linked to the entered player ID"
                })
                return
            }
        } catch (error) {
            if (error.response.data.error.includes("does not exist")) {
                res.status(200).json({
                    status:"failed",
                    message:"Invalid player ID"
                })
                return
            } else {
                res.status(200).json({
                    status:"failed",
                    message:"unknown error occured. Please contact Sewlie"
                })
            }
            
        }
    }

    //prepare data for saving to DB and pebblehost
    if (eth_address == 'x') {
        eth_address = null
        var eth_address_py = "NONE"
    } else {var eth_address_py = eth_address}
    
    if (player_id == -1) {
        player_id = null
        var player_id_py = "NONE"
    } else {var player_id_py = player_id}

    //save to db
    var currentUser = await User.findOneAndUpdate({twitch_id:twitch_id},{twitch_id:twitch_id,eth_address:eth_address,player_id:player_id},{new:true})
    console.log("updated user is "+currentUser)
    
    //save to pebblehost
    if (currentUser.discord_id == null) {var discord_id_py = "NONE"} else {var discord_id_py = currentUser.discord_id}

    axios.post(keys.pebblehost.url, {twitch_id:twitch_id,eth_address:eth_address_py,player_id:player_id_py,discord_id:discord_id_py})
    .then((response) => {
        console.log(response.data)
    })

    res.status(200).json({
        status:"success",
        message:"Data successfully saved",
        data:currentUser})
    })

module.exports = router