const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option => option.setName('song')
            .setDescription('Insert the song you want')
            .setRequired(true)),
    async execute(interaction, message, member, channel, client, guild) {

        const voice_channel = member.voice.channel;
        if (!voice_channel) return interaction.reply('You need to be in a channel to execute this command !');

        const songIn = interaction.options.getString('song');
        if (!songIn) return interaction.reply('You need to insert a song !');

        client.distube.play(voice_channel, songIn, { text_channel: channel, member: member });
        const song = client.distube.search(songIn, {
            limit: 1,
            type: 'video',
        });

        return await interaction.reply(`**${song}** added to the queue !`)

    },
};