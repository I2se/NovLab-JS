const { ErelaClient, Utils } = require('erela.js');
const { nodes } = require('../../utils/config.json');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        /* client.music = new ErelaClient(client, nodes)
            .on('nodeError', console.log)
            .on('nodeConnect', () => console.log('Succesfully created a new Node'))
            .on('queueEnd', player => {
                player.textChannel.send('Queue has ended')
                return client.music.players.destroy(player.guild.id)
            })
            .on('trackStart', ({ textChannel }, { title, duration }) => textChannel.send(`Now Playing: **${title}** \`${Utils.formatTime(duration, true)}\``)
                .then(m => m.delete(15000)));

        client.levels = new Map()
            .set('none', 0.0)
            .set('low', 0.10)
            .set('medium', 0.15)
            .set('high', 0.25)*/

        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};