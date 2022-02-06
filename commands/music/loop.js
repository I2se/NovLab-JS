const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { red_light, green_light } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Enable or disable repeat mode'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            const embed = new MessageEmbed();
            embed.setColor(red_light)
            if (!queue) {
                embed.setTitle('The queue is empty')
                return;
            }
            const actualRepeatMode = queue.repeatMode;
            queue.setRepeatMode();
            switch (actualRepeatMode) {
                case 0:
                    embed.setTitle('The song is in repeat mode')
                    embed.setColor(green_light)
                    break;
                case 1:
                    embed.setTitle('The queue is in repeat mode')
                    embed.setColor(green_light)
                    break;
                case 2:
                    embed.setTitle('The repeat mode is disable')
                    break;
                default:
                    embed.setTitle('Error with repeat mode')
                    break;
            }
            interaction.reply({ embeds: [embed] });
        }
    }
}