const { SlashCommandBuilder } = require('@discordjs/builders');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Enable or disable repeat mode'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            if (!queue) {
                interaction.reply('The queue is empty')
                return;
            }
            const actualRepeatMode = queue.repeatMode;
            queue.setRepeatMode();
            switch (actualRepeatMode) {
                case 0:
                    interaction.reply('The song is in repeat mode')
                    break;
                case 1:
                    interaction.reply('The queue is in repeat mode')
                    break;
                case 2:
                    interaction.reply('The repeat mode is disable')
                    break;
                default:
                    interaction.reply('Error with repeat mode')
                    break;
            }
        }
    }
}