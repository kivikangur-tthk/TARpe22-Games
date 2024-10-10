const port = 8080
const host = 'localhost'
const express = require("express")
const app = express()
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./docs/swagger.json")

app.use(express.json())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://${host}:${port}/docs">/docs</a>`)
})

const games = [
    {id: 1, name: "Witcher 3", price: 29.99},
    {id: 8, name: "Cyberpunk 2077", price: 59.99},
    {id: 2, name: "Minecraft", price: 26.99},
    {id: 3, name: "Counter-Strike: Global Offensive", price: 0},
    {id: 4, name: "Roblox", price: 0},
    {id: 5, name: "Grand Theft Auto V", price: 29.99},
    {id: 6, name: "Valorant", price: null},
    {id: 7, name: "Forza Horizon 5", price: 59.99}
]

app.get("/games", (req, res) => {
    res.send(games.map(({id,name}) => {
         return {id, name}
    }))
})

function createId() {
    const maxIdGame = games.reduce((prev, current) => (prev.id > current.id) ? prev : current, 1)
    return maxIdGame.id + 1;
}

app.post("/games", (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    const newGame = {
        id: createId(),
        name: req.body.name,
        price: isNaN(newPrice) ? null : newPrice
    }
    games.push(newGame)
    res.status(201)
        .location(`http://${host}:${port}/games/${newGame.id}`)
        .send(newGame)
})

app.get("/games/:id", (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        return res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
    }
    const game = games.find(g => g.id === idNumber)
    if (!game) {
        return res.status(404).send({error: `Game Not Found!`})
    }
    res.send(game)
})


app.listen(port, () => {
    console.log(`API up at: http://${host}:${port}`)
})