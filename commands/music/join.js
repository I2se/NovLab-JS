const { SlashCommandBuilder } = require('@discordjs/builders');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join a voice channel'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            interaction.reply(`Connected to \`\`${voice_channel.name}\`\``)
        }
    }
}