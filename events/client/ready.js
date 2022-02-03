const { ErelaClient, Utils } = require('erela.js');
const { nodes } = require('../../utils/config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.distube.on('error', (channel, error) => {
            console.error(error)
            channel.send(`An error encoutered: ${error.slice(0, 1979)}`) // Discord limits 2000 characters in a message
        });
    },
};