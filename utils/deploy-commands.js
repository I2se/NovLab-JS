const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const { readdirSync } = require('fs');

const commands = [];
const load = dirs => {
    const commandes = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
    for (let file of commandes) {
        const command = require(`../commands/${dirs}/${file}`)
        commands.push(command.data.toJSON());
        console.log('Command ' + command.data.name + ' deployed');
    }
}
['music', 'utils'].forEach(x => load(x))

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);