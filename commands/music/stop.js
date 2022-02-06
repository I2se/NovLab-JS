const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { red_light, red_dark } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and empty the queue'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            const embed = new MessageEmbed()
            if (!queue) {
                embed.setTitle('The queue is already empty')
                embed.setColor(red_dark)
            } else {
                queue.stop();
                embed.setTitle('This music has been stop and the queue is empty');
                embed.setColor(red_light)
            }
            interaction.reply({ embeds: [embed] });
        }
    }
}