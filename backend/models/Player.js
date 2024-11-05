module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define(
        'Player',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            // Other model options go here
        },
    );
    return Player;
}