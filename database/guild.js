module.exports = (sequelize, DataTypes) => {
    return sequelize.define('guilds', {
        guildId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        music: {
            type: DataTypes.STRING,
            defaultValue: 'true',
            unique: true,
        },
        level: {
            type: DataTypes.STRING,
            defaultValue: 'false',
            unique: true,
        }
    });
};