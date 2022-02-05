const { SlashCommandBuilder } = require('@discordjs/builders');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the music'),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(voice_channel.guild.id);
            if (!queue) {
                interaction.reply('The queue is empty')
                return;
            }
            const songs = await queue.songs;
            if (songs.lenght >= 2) {
                const song = queue.skip();
                interaction.reply(`Music skip to \`\`${song.name}\`\``)
            } else {

                queue.stop();
                interaction.reply('No more music in the queue')
            }
        }
    }
}