const port = 8080
const host = 'localhost'
const app = require("express")()
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./docs/swagger.json")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://${host}:${port}/docs">/docs</a>`)
})

const games = [
    { id:0, name:"Witcher 3", price: 29.99 },
    { id:1, name:"Cyberpunk 2077", price: 59.99 },
    { id:2, name:"Minecraft", price: 26.99 },
    { id:3, name:"Counter-Strike: Global Offensive", price: 0 },
    { id:4, name:"Roblox", price: 0 },
    { id:5, name:"Grand Theft Auto V", price: 29.99 },
    { id:6, name:"Valorant", price: null },
    { id:7, name:"Forza Horizon 5", price: 59.99 }
]

app.get("/games", (req, res) => {
    res.send(games.map((g)=> g.name))
})

app.get("/games/:id", (req, res) => {
    res.send(games[req.params.id])
})


app.listen(port, () => {
    console.log(`API up at: http://${host}:${port}`)
})