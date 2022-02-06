const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');
const { blue_dark } = require('../../utils/colours.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Return the queue'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            if (!queue) {
                interaction.reply('The queue is empty')
            } else {
                const song = await queue.songs;
                let msg = ' ';
                const embed = new MessageEmbed()
                    .setColor(blue_dark)
                    .setTitle('Current Queue')

                for (let index = 0; index < 20; index++) {
                    const affIndex = index + 1
                    const affSong = song[index]
                    msg = msg + affIndex + '. ' + affSong.name + ' by ' + affSong.uploader.name + ' [' + affSong.formattedDuration + '] \n';
                }

                if (song.length >= 21) {
                    const numberMusics = song.length - 20;
                    msg = msg + 'And `' + numberMusics + '` other musics';
                }

                embed.setDescription(msg);

                interaction.reply({ embeds: [embed] });
            }
        }
    }
}