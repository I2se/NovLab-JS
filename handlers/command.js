const { readdirSync } = require('fs');

module.exports = (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'))
        for (let file of commands) {
            const pull = require(`../commands/${dirs}/${file}`)
            client.commands.set(pull.data.name, pull)
            console.log('Command ' + pull.data.name + ' loaded');
        }
    }
    ['music', 'utils', 'module'].forEach(x => load(x))
}