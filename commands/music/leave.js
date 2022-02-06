const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { red_light } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave a voice channel'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const guildId = voice_channel.guild.id;
            const connection = getVoiceConnection(guildId);
            connection.destroy();
            const embed = new MessageEmbed()
                .setColor(red_light)
                .setTitle(`Disconnected from \`\`${voice_channel.name}\`\``)

            interaction.reply({ embeds: [embed] });
        }
    }
}