const eth_input = document.getElementById('eth_input')
const full_eth_input = document.getElementById('full_eth')
const player_input = document.getElementById('player_input')
const messagebox = document.getElementById('message-box')
const message_input = document.getElementById('status-input')

function submit(twitch_id) {
    var eth_address = eth_input.value
    const full_eth = full_eth_input.value
    const player_id = player_input.value
    
    if (eth_address.substr(eth_address.length - 6) == full_eth.substr(full_eth.length - 6)) {
        eth_address = full_eth
    }
    
    messagebox.style.display = 'none'

    axios.post('/post/info', {twitch_id:twitch_id,eth_address:eth_address,player_id:player_id})
    .then((response) => {
        messagebox.style.display = 'block'
        message_input.innerHTML = response.data.message
        if (response.data.status == "failed") {
            messagebox.style.color = 'red'
            message_input.style.color = 'red'
        } else if (response.data.status == "success") {
            messagebox.style.color = 'green'
            message_input.style.color = 'green'
        }
    })
}

const ownedList = document.getElementById("owned-list")
const unownedList = document.getElementById("unowned-list")

axios.get(`/rewards/owned/${full_eth_input.value}`)
        .then((response) => {
            ownedList.removeChild(ownedList.firstElementChild)
            if (response.data.data.length != 0) {
                for (var i = 0; i < response.data.data.length; i++) {
                    var li = document.createElement('li')
                    var img = document.createElement('img')
                    img.src=response.data.data[i].url
                    img.classList.add('unowned-list2-li')
                    li.appendChild(img)
                    var p = document.createElement('p')
                    p.innerHTML = response.data.data[i].message
                    li.appendChild(p)
                    ownedList.appendChild(li)
                }
            }
            
            unownedList.removeChild(unownedList.firstElementChild)
            owned = response.data.data.map((x) => x.type)
            
            if (!owned.includes("YOTG")) {
                var li = document.createElement('li')
                var img = document.createElement('img')
                img.src = "../images/brickcover.png"
                img.classList.add("unowned-list-li")
                li.appendChild(img)
                var p = document.createElement('p')
                p.innerHTML = "+30 PTS PER STREAM"
                li.appendChild(p)
                unownedList.appendChild(li)
            }
            
            if (!owned.includes("lysander")) {
                var li = document.createElement('li')
                var img = document.createElement('img')
                img.src = "../images/brickcover.png"
                img.classList.add("unowned-list-li")
                li.appendChild(img)
                var p = document.createElement('p')
                p.innerHTML = "+30 PTS PER STREAM"
                li.appendChild(p)
                unownedList.appendChild(li)
            }

            if (!owned.includes("mrbricks")) {
                var li = document.createElement('li')
                var img = document.createElement('img')
                img.src = "../images/brickcover.png"
                img.classList.add("unowned-list-li")
                li.appendChild(img)
                var p = document.createElement('p')
                p.innerHTML = "+30 PTS PER STREAM"
                li.appendChild(p)
                unownedList.appendChild(li)
            }
        })