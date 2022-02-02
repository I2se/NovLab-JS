const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./utils/config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

['commands'].forEach(x => client[x] = new Collection());
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(client))

client.login(token);