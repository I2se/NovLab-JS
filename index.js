const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./utils/config.json');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES]
});

module.exports = client;

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    nsfw: true,
    youtubeDL: false,
    leaveOnEmpty: false,
    leaveOnStop: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
});

['commands'].forEach(x => client[x] = new Collection());
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(client))

client.login(token);