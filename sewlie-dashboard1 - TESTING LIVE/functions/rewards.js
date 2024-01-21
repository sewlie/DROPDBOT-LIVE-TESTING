function fetchAssetRewards(eth_address) {
    const assetsList = document.getElementById('rewards-list')

    axios.get(`/rewards/assets/${eth_address}`)
    .then((response) => {
        assetsList.removeChild(assetsList.firstElementChild)
        if (response.data.data.length != 0) {
            for (var i = 0; i < response.data.data.length; i++) {
                var li = document.createElement('li')
                var img = document.createElement('img')
                img.src=response.data.data[i].url
                img.classList.add('owned-preview')
                const id = response.data.data[i].id
                img.onclick = function() {window.open(`https://immutascan.io/tx/${id}`)}
                li.appendChild(img)
                assetsList.appendChild(li)
            }
        }
    })
}

function fetchTokenRewards(eth_address) {
    const gods_inp = document.getElementById('gods-amount')
    const eth_inp = document.getElementById('eth-amount')

    const gods_transaction_list = document.getElementById('gods-rewards-list')
    const eth_transaction_list = document.getElementById('eth-rewards-list')
 
    axios.get(`/rewards/amounts/${eth_address}`)
    .then((response) => {
        if (response.data.data.gods.total != 0) {
            gods_inp.textContent = response.data.data.gods.total
        } else {
            gods_inp.textContent = '0.00'
        }
        if (response.data.data.eth.total != 0) {
            eth_inp.textContent = response.data.data.eth.total
        } else {
            eth_inp.textContent = '0.00'
        }

        console.log(response.data.data.gods.transactions)
        console.log(response.data.data.eth.transactions)
        
        //<li><img class="nav-rewards-logo-3" src="../images/gods.png" alt="">1.1<img class="nav-rewards-logo-4" src="../images/immuta.png" alt=""></li>
        //<li><img class="nav-rewards-logo-3" src="../images/eth.png" alt="">0.000014<img class="nav-rewards-logo-4" src="../images/immuta.png" alt=""></li>

        for (var i = 0; i < response.data.data.gods.transactions.length; i++) {
            var li = document.createElement('li')
            var img = document.createElement('img')
            img.src="../images/gods.png"
            img.classList.add('nav-rewards-logo-3')
            li.appendChild(img)

            var p = document.createElement('p')
            p.innerHTML = `${response.data.data.gods.transactions[i].amount}`
            li.appendChild(p)

            var img = document.createElement('img')
            img.src = "../images/immuta.png"
            img.classList.add("nav-rewards-logo-4")
            const id = response.data.data.gods.transactions[i].id
            img.onclick = function() {window.open(`https://immutascan.io/tx/${id}`)}
            li.appendChild(img)

            gods_transaction_list.appendChild(li)
        }

        for (var i = 0; i < response.data.data.eth.transactions.length; i++) {
            var li = document.createElement('li')
            var img = document.createElement('img')
            img.src="../images/eth.png"
            img.classList.add('nav-rewards-logo-3')
            li.appendChild(img)

            var p = document.createElement('p')
            p.innerHTML = `${response.data.data.eth.transactions[i].amount}`
            li.appendChild(p)

            var img = document.createElement('img')
            img.src = "../images/immuta.png"
            img.classList.add("nav-rewards-logo-4")
            const id = response.data.data.gods.transactions[i].id
            img.onclick = function() {window.open(`https://immutascan.io/tx/${id}`)}
            li.appendChild(img)

            eth_transaction_list.appendChild(li)
        }
    })
}