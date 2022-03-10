const { Client, Collection, Intents } = require('discord.js');
const { token, clientIdSpotify, clientSecretSpotify, cookie } = require('./utils/config.json');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const Sequelize = require('sequelize');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS]
});

module.exports = client;

let spotifyoptions = {
    parallel: true,
    emitEventsAfterFetching: true,
}

spotifyoptions.api = {
    clientId: clientIdSpotify,
    clientSecret: clientSecretSpotify,
}

client.distube = new DisTube(client, {
    emitNewSongOnly: false,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: false,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 0,
    youtubeCookie: cookie,
    nsfw: true,
    emptyCooldown: 25,
    ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: 'highestaudio',
        format: 'audioonly',
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
    },
    youtubeDL: false,
    updateYouTubeDL: true,
    plugins: [
        new SpotifyPlugin(spotifyoptions),
        new SoundCloudPlugin()
    ]
});

['commands'].forEach(x => client[x] = new Collection());
['console', 'command', 'event'].forEach(x => require(`./handlers/${x}`)(client))

client.login(token);