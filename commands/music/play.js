const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { green_light, red_dark, gold } = require('../../utils/colours.json');
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
            const embed = new MessageEmbed();
            if (!songIn) {
                embed.setTitle('You need to insert a song !');
                embed.setColor(red_dark)
                return interaction.reply({ embeds: [embed] });
            }
            try {
                embed.setTitle('Loading music(s)...')
                embed.setColor(gold)
                interaction.reply({ embeds: [embed] });
                await client.distube.play(voice_channel, songIn, { text_channel: channel, member: member });
                const queue = client.distube.getQueue(voice_channel.guild.id);
                const song = await queue.songs;
                embed.setColor(green_light)
                if (songIn.includes('playlist')) {
                    embed.setTitle(`**${song.length}** musics added to the queue !`)
                } else {
                    const last_music_position = song.length - 1;
                    await embed.setTitle(`**${song[last_music_position].name}** added to the queue !`)
                }
                interaction.editReply({ embeds: [embed] });
            } catch (err) {
                console.log(err)
                embed.setTitle('No result found !');
                embed.setColor(red_dark);
                return interaction.editReply({ embeds: [embed] });
            }
        }
    },
};