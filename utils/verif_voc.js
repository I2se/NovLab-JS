const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    isConnectedToChannelBot: async function (channel) {
        const connection = getVoiceConnection(channel.guild.id);
        if (!connection) {
            return false;
        }
        return true;
    },
    isConnectedToChannelMember: async function (channel) {
        if (!channel) {
            return false;
        }
        return true;
    },
    isInTheSameChannel: async function (channel_member, client, interaction) {
        if (await module.exports.isConnectedToChannelMember(channel_member) == true) {
            if (await module.exports.isConnectedToChannelBot(channel_member) == true) {
                const connection = getVoiceConnection(channel_member.guild.id);
                if (channel_member.id == connection.packets.state.channel_id) {
                    return true;
                }
                interaction.reply('You are not in the same voice channel !');
                return false;
            }
            const connection = joinVoiceChannel({
                channelId: channel_member.id,
                guildId: channel_member.guild.id,
                adapterCreator: channel_member.guild.voiceAdapterCreator
            });
            return true;
        }
        interaction.reply('You need to be in a voice channel !');
        return false;
    },
    isInTheSameChannelJoin: async function (channel_member, client, interaction) {
        if (await module.exports.isConnectedToChannelMember(channel_member) == true) {
            if (await module.exports.isConnectedToChannelBot(channel_member) == true) {
                const connection = getVoiceConnection(channel_member.guild.id);
                if (channel_member.id == connection.packets.state.channel_id) {
                    interaction.reply('I\'m already connected')
                    return true;
                }
                interaction.reply('You are not in the same voice channel !');
                return false;
            }
            const connection = joinVoiceChannel({
                channelId: channel_member.id,
                guildId: channel_member.guild.id,
                adapterCreator: channel_member.guild.voiceAdapterCreator
            });
            return true;
        }
        interaction.reply('You need to be in a voice channel !');
        return false;
    }
}