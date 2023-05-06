
const express = require("express")
const bodyParser = require("body-parser")

const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/push_dict", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const data = req.body
    console.log(data.dict)
    fetch(`http://rumberg.ru:8051/rdict/push/${data.dict}`)
        .then(resp => resp.text())
        .then(d => {
            res.send(d)
        })
})

app.post("/market_data", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const data = req.body
    console.log(data)
    fetch(`http://rumberg.ru:8051/autocall/get_md/?iid=${data.id}&corr_history=365&corr_floor=0.7&pricing_date=2023-05-01`, {
        header: {
            "accept": "application/json"
        }
    })
        .then(resp=> resp.text())
        .then(d => {
            console.log(d)
            res.send(d)
        })
})

app.post("/price", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const data = req.body
    console.log(data)
    fetch(`http://rumberg.ru:8051/price/{id}?iid=${data.id}`)
        .then(resp=> resp.json())
        .then(d => {
            console.log(d)
            res.send(d)
        })
})

app.listen(3016)