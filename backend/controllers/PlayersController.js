const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const players = await db.players.findAll();
    res.send(players.map(({id, name}) => {
        return {id, name}
    }))
}

exports.create = async (req, res) => {
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    const newPlayer = {
        name: req.body.name
    }
    const createdPlayer = await db.players.create(newPlayer);
    res.status(201)
        .location(`${Utils.getBaseUrl(req)}/players/${createdPlayer.id}`)
        .send(createdPlayer)
}

exports.deleteById = async (req, res) => {
    const player = await getPlayer(req, res)
    if (!player) { return }
    await player.destroy();
    return res.status(204).send()
};

exports.getById = async (req, res) => {
    const player = await getPlayer(req, res)
    if (!player) { return }
    return res.send(player)
};

exports.editById = async (req, res) => {
    const player = await getPlayer(req, res)
    if (!player) { return }
    if (!req.body.name || req.body.name.trim().length === 0) {
        return res.status(400).send({error: "Missing required field 'name'"})
    }
    player.name = req.body.name
    await player.save();
    return res
        .location(`${Utils.getBaseUrl(req)}/players/${player.id}`)
        .send(player)
};

const getPlayer = async (req, res) => {
    const idNumber = parseInt(req.params.id)
    if (isNaN(idNumber)) {
        res.status(400).send({error: `ID must be a whole number: ${req.params.id}`})
        return null
    }
    const player = await db.players.findByPk(idNumber)
    if (!player) {
        res.status(404).send({error: `Player Not Found!`})
        return null
    }
    return player
}