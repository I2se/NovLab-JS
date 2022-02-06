const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { red_light, purple_light, green_light } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the music'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            const embed = new MessageEmbed();
            if (!queue) {
                embed.setTitle('The queue is empty')
                embed.setColor(red_light)
                return;
            }
            const songa = await queue.songs;
            if (songa.length >= 2) {
                const song = await queue.skip();
                embed.setTitle(`Music skip to \`\`${song.name}\`\``)
                embed.setColor(green_light)
            } else {
                queue.stop();
                embed.setTitle('No more music in the queue')
                embed.setColor(purple_light)
            }
            interaction.reply({ embeds: [embed] });
        }
    }
}