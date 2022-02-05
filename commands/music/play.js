const { SlashCommandBuilder } = require('@discordjs/builders');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song')
        .addStringOption(option => option.setName('song')
            .setDescription('Insert the song you want')
            .setRequired(true)),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const songIn = interaction.options.getString('song');
            if (!songIn) return interaction.reply('You need to insert a song !');

            client.distube.play(voice_channel, songIn, { text_channel: channel, member: member });
            const song = await client.distube.search(songIn, {
                limit: 1,
                type: 'video',
            });

            return await interaction.reply(`**${song[0].name}** added to the queue !`)
        }
    },
};