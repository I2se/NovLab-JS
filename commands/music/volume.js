const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { red_light, green_light } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set the volume')
        .addIntegerOption(option => option.setName('percent')
            .setDescription('Insert the volume of the bot')
            .setRequired(true)),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const volume = interaction.options.getInteger('percent');

            const queue = client.distube.getQueue(guild.id);

            if (!queue) {
                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor(red_light)
                            .setTitle('Volume can\'t change if you don\'t listen music')
                    ]
                })
            } else {
                client.distube.setVolume(queue, volume);

                interaction.reply({
                    embeds: [
                        new MessageEmbed().setColor(green_light)
                            .setTitle(`The volume is now to \`\`${volume}\`\` %`)
                    ]
                })
            }
        }
    }
}