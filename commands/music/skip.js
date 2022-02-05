const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Join a voice channel'),
    async execute(interaction, message, member, channel, client, guild) {

    }
}