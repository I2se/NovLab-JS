const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { green_light } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Set the volume'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const embed = new MessageEmbed()
                .setColor(green_light)
                .setTitle(`Connected to \`\`${voice_channel.name}\`\``)

            interaction.reply({ embeds: [embed] });
        }
    }
}