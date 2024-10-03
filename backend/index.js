const port = 8080
const host = 'localhost'
const app = require("express")()
const swaggerUi = require("swagger-ui-express")
const swaggerDoc = require("./docs/swagger.json")

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.get("/", (req, res) => {
    res.send(`Server running. Docs at <a href="http://${host}:${port}/docs">/docs</a>`)
})

app.get("/games", (req, res) => {
    res.send(["Witcher 3", "Cybepunk 2077"])
})


app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})