const PlayersController = require("../controllers/PlayersController");
module.exports = (app)=> {
    app.route("/players")
        .get(PlayersController.getAll)
        .post(PlayersController.create);
    app.route("/players/:id")
        .get(PlayersController.getById)
        .put(PlayersController.editById)
        .delete(PlayersController.deleteById);
}