const router = require('express').Router()
const passport = require('passport')
const axios = require('axios')

router.get('/amounts/:eth_address' ,(req,res) => {
    const receiver = req.params.eth_address
    var totalGods = 0
    var totalEth = 0
    var transactionsGods = []
    var transactionsEth = []

    axios.get(`https://api.x.immutable.com/v1/transfers?user=0xd7e9b7e48e2d28b66694f29c0ede87fde608eb77&receiver=${receiver}&page_size=2000&token_type=ERC20&token_address=0xccc8cb5229b0ac8069c51fd58367fd1e622afd97`)
    .then((response) => {
        for (var i = 0; i < response.data.result.length; i++) {
            var amount = parseInt(response.data.result[i].token.data.quantity) / Math.pow(10,response.data.result[i].token.data.decimals)
            totalGods += amount
            transactionsGods.push({amount: amount, id: response.data.result[i].transaction_id})
        }

        axios.get(`https://api.x.immutable.com/v1/transfers?user=0xd7e9b7e48e2d28b66694f29c0ede87fde608eb77&receiver=${receiver}&page_size=2000&token_type=ETH`)
        .then((response) => {
            for (var i = 0; i < response.data.result.length; i++) {
                var amount = parseInt(response.data.result[i].token.data.quantity) / Math.pow(10,response.data.result[i].token.data.decimals) 
                totalEth += amount
                transactionsEth.push({amount: amount, id: response.data.result[i].transaction_id})
            }
            
            res.status(200).json({
                status:"success",
                message:"request processed",
                data:{
                    gods: {
                        total:Math.round(totalGods*100)/100,
                        transactions: transactionsGods
                    },
                    eth:{
                        total:Math.round(totalEth*1000000)/1000000,
                        transactions: transactionsEth
                    }
                }
            })
        })  
    })
})

router.get('/owned/:eth_address', (req,res) => {
    const receiver = req.params.eth_address
    responsedata = []

    axios.get(`https://api.x.immutable.com/v1/assets?auxiliary_fee_percentages=1&auxiliary_fee_recipients=0x12cB8E42c7ec27d30df6Cb8f44aa6445D0e1a78C&collection=0x2880c6ecf2f770bd31ddb0d776cc81048899b600&direction=asc&include_fees=true&order_by=name&page_size=500&sell_orders=true&status=imx&user=${receiver}`)
    .then((response) => {
        var rarities = {}
        for (var i = 0; i < response.data.result.length; i++) {
            rarities[response.data.result[i].metadata.title] = response.data.result[i].image_url
        }
        if ("Mythic" in rarities) {
            responsedata.push({url:rarities['Mythic'],message:'+40 PTS PER STREAM',type:'YOTG'})
        } else if ("Diamond" in rarities) {
            responsedata.push({url:rarities['Diamond'],message:'+40 PTS PER STREAM',type:'YOTG'})
        } else if ("Gold" in rarities) {
            responsedata.push({url:rarities['Gold'],message:'+30 PTS PER STREAM',type:'YOTG'})
        } else if ("Shadow" in rarities) {
            responsedata.push({url:rarities['Shadow'],message:'+20 PTS PER STREAM',type:'YOTG'})
        } else if ("Meteorite" in rarities) {
            responsedata.push({url:rarities['Meteorite'],message:'+10 PTS PER STREAM',type:'YOTG'})
        }

        axios.get(`https://api.x.immutable.com/v1/assets?auxiliary_fee_percentages=1&auxiliary_fee_recipients=0x12cB8E42c7ec27d30df6Cb8f44aa6445D0e1a78C&collection=0x42373fb90e871e6aa06758f58d093bb03db392da&direction=asc&include_fees=true&order_by=name&page_size=500&sell_orders=true&status=imx&user=${receiver}&name="Lysander"`)
        .then((response) => {
            var rarities = {}
            for (var i = 0; i < response.data.result.length; i++) {
                rarities[response.data.result[i].metadata.Rarity] = response.data.result[i].image_url
            }
            if ("Mythic" in rarities) {
                responsedata.push({url:rarities['Mythic'],message:'+40 PTS PER STREAM',type:'lysander'})
            } else if ("Diamond" in rarities) {
                responsedata.push({url:rarities['Diamond'],message:'+40 PTS PER STREAM',type:'lysander'})
            } else if ("Gold" in rarities) {
                responsedata.push({url:rarities['Gold'],message:'+30 PTS PER STREAM',type:'lysander'})
            } else if ("Shadow" in rarities) {
                responsedata.push({url:rarities['Shadow'],message:'+20 PTS PER STREAM',type:'lysander'})
            } else if ("Meteorite" in rarities) {
                responsedata.push({url:rarities['Meteorite'],message:'+10 PTS PER STREAM',type:'lysander'})
            }

            axios.get(`https://api.x.immutable.com/v1/assets?auxiliary_fee_percentages=1&auxiliary_fee_recipients=0x12cB8E42c7ec27d30df6Cb8f44aa6445D0e1a78C&collection=0x42373fb90e871e6aa06758f58d093bb03db392da&direction=asc&include_fees=true&order_by=name&page_size=500&sell_orders=true&status=imx&user=${receiver}&name="Mr.%20Brick%20Hands"`)
            .then((response) => {
                var rarities = {}
                for (var i = 0; i < response.data.result.length; i++) {
                    rarities[response.data.result[i].metadata.Tier] = response.data.result[i].image_url
                }
                if ('1' in rarities) {
                    responsedata.push({url:rarities['1'],message:'+30 PTS PER STREAM',type:'mrbricks'})
                } else if ('2' in rarities) {
                    responsedata.push({url:rarities['2'],message:'+20 PTS PER STREAM',type:'mrbricks'})
                } else if ('3' in rarities) {
                    responsedata.push({url:rarities['3'],message:'+10 PTS PER STREAM',type:'mrbricks'})
                }

                res.status(200).json({
                    status:"success",
                    message:"request processed",
                    data:responsedata
                })
            })
        })
    })
})
router.get('/assets/:eth_address', async (req,res) => {
    const receiver = req.params.eth_address

    const response = await axios.get(`https://api.x.immutable.com/v1/transfers?user=0xd7e9b7e48e2d28b66694f29c0ede87fde608eb77&page_size=2000&token_type=ERC721&token_address=0xacb3c6a43d15b907e8433077b6d38ae40936fe2c&receiver=${receiver}`)
    const result = response.data.result

    var responsedata = []
    
    for (var i = 0; i < response.data.result.length; i++) {
        
        const response1 = await axios.get(`https://api.x.immutable.com/v1/assets/${response.data.result[i].token.data.token_address}/${response.data.result[i].token.data.token_id}`)
        const image_url = response1.data.image_url
        responsedata.push({url:image_url,id:response.data.result[i].transaction_id})
    }
    res.status(200).json({
        status:"success",
        message:"request processed",
        data:responsedata
    })
})


module.exports = router