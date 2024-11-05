const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const games = await db.games.findAll();
    res.send(games.map(({id, name}) => {
        return {id, name}
    }))
}

exports.create = async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    const newGame = {
        name: req.body.name,
        price: isNaN(newPrice) ? null : newPrice
    }
    const createdGame = await db.games.create(newGame);
    res.status(201)
        .location(`${Utils.getBaseUrl(req)}/games/${createdGame.id}`)
        .send(createdGame)
}

exports.deleteById = async (req, res) => {
    const game = await getGame(req, res)
    if (!game) { return }
    await game.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const game = await getGame(req, res)
    if (!game) { return }
    return res.send(game)
};

exports.editById = async (req, res) => {
    const game = await getGame(req, res)
    if (!game) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPrice = parseFloat(req.body.price);
    game.name = req.body.name
    game.price = isNaN(newPrice) ? null : newPrice
    await game.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/games/${game.id}`)
        .send(game)
};

const getGame = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const game = await db.games.findByPk(idNumber)
    if (!game) {
        res.status(404).send({error: `Game Not Found!`})
        return null
    }
    return game
}