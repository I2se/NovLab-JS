const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');
const { blue_dark } = require('../../utils/colours.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Return the current song'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            if (!queue) {
                interaction.reply('The queue is empty')
            } else {
                const songs = await queue.songs;
                const song = songs[0];
                const embed = new MessageEmbed()
                    .setColor(blue_dark)
                    .setTitle(song.name)
                    .setURL(song.url)
                    .setThumbnail(song.thumbnail)
                    .setDescription('Duration: ' + song.formattedDuration)
                    .addFields(
                        {
                            name: 'Informations',
                            value: 'Views: ' + song.views + '\n' +
                                'Likes: ' + song.likes + '\n' +
                                'Age restricted: ' + song.age_restricted + '\n' +
                                'Uploader: ' + song.uploader.name + '\n' +
                                'Is a stream: ' + song.isLive + '\n'
                        });
                interaction.reply({ embeds: [embed] });
            }
        }
    }
}