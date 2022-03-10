const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Guilds = require('guilds.js')(sequelize, Sequelize.DataTypes);

Reflect.defineProperty(Guilds.prototype, 'getGuild', {
    /* eslint-disable-next-line func-name-matching */
    value: async function getGuild(guild) {
        const guildDb = await Guilds.findOne({
            where: { guildId: this.guildId }
        })
        if (guildDb) {
            guildDb.name = guild.name;
            guildDb.save();
            return true;
        }
        return false;
    },
});

Reflect.defineProperty(Guilds.prototype, 'addGuild', {
    /* eslint-disable-next-line func-name-matching */
    value: async function addGuild(guild) {
        const guildDb = await Guilds.findOne({
            where: { guildId: this.guildId }
        })
        if (guildDb) {
            guildDb.name = guild.name;
            guildDb.save();
            return true;
        }
        return false;
    },
});

Reflect.defineProperty(Guilds.prototype, 'deleteGuild', {
    /* eslint-disable-next-line func-name-matching */
    value: async function deleteGuild(guild) {
        const guildDb = await Guilds.findOne({
            where: { guildId: this.guildId }
        })
        if (guildDb) {
            guildDb.name = guild.name;
            guildDb.save();
            return true;
        }
        return false;
    },
});

module.exports = { Guilds };