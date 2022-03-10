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
            try {
                const songIn = interaction.options.getString('song');
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(gold)
                            .setTitle((songIn.includes('playlist')) ? 'Loading musics...' : 'Loading music...')
                    ]
                });
                try {
                    let options = {
                        text_channel: channel,
                        member: member
                    }

                    await client.distube.play(voice_channel, songIn, options);
                    let queue = await client.distube.getQueue(guild.id);

                    const song = queue.songs;

                    if (songIn.includes('playlist')) {
                        interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(green_light)
                                    .setTitle(`**${song.length}** musics added to the queue !`)
                            ]
                        })
                    } else {
                        const last_music_position = song.length - 1;
                        interaction.editReply({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(green_light)
                                    .setTitle(`**${song[last_music_position].name}** added to the queue !`)
                            ]
                        })
                    }
                } catch (e) {
                    console.log(e.stack ? e.stack : e)
                    interaction.editReply({
                        embeds: [
                            new MessageEmbed().setColor(red_dark)
                                .setDescription(`\`\`\`${e}\`\`\``)
                        ],
                        ephemeral: true
                    })
                }
            } catch (e) {
                console.log(String(e.stack).bgRed);
            }
        }
    },
};