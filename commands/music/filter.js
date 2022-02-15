const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { green_light, red_light } = require('../../utils/colours.json');
const { isInTheSameChannel } = require('../../utils/verif_voc.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('filter')
        .setDescription('Apply some filters')
        .addSubcommand(subcommand => subcommand
            .setName('add')
            .setDescription('Add a filter to your queue')
            .addStringOption(option => option
                .setName('addfilter')
                .setDescription('The filter you want to add')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('remove')
            .setDescription('Remove a filter from your queue')
            .addStringOption(option => option
                .setName('remfilter')
                .setDescription('The filter you want to remove')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('list')
            .setDescription('Get the list of actives filter on your queue'))
        .addSubcommand(subcommand => subcommand
            .setName('bassboost')
            .setDescription('Change the bassboost of the queue')
            .addIntegerOption(option => option
                .setName('valueBoost')
                .setDescription('The value of the BassBoost')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('speed')
            .setDescription('Change the speed of the songs in the queue')
            .addIntegerOption(option => option
                .setName('valueSpeed')
                .setDescription('The value of the Speed')
                .setRequired(true))),
    async execute(interaction, message, member, channel, client, guild) {
        const voice_channel = member.voice.channel;
        if (await isInTheSameChannel(voice_channel, client, interaction) == true) {
            const queue = client.distube.getQueue(guild.id);
            if (!queue) {
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor(red_light)
                            .setTitle('You need to have songs in your queue to execute this command')
                    ]
                })
                return;
            }
            let optionAddFilter = interaction.options.getString('addfilter').toLowerCase().split(' ');
            let optionRemFilter = interaction.options.getString('remfilter').toLowerCase().split(' ');
            let optionBoostFilter = interaction.options.getInteger('valueBoost');
            let optionSpeedFilter = interaction.options.getInteger('valueSpeed');
            switch (interaction.options.getSubcommand()) {

                case 'add':

                    if (!optionAddFilter) optionAddFilter = [interaction.options.getString('addfilter').toLowerCase()]

                    break;

                case 'remove':

                    if (!optionRemFilter) optionRemFilter = [interaction.options.getString('remfilter').toLowerCase()]

                    break;

                case 'list':

                    break;

                case 'bassboost':

                    break;

                case 'speed':

                    break;

                default:
                    interaction.reply({
                        embeds: [
                            new MessageEmbed()
                                .setColor(red_light)
                                .setTitle('Unknown Subcommand')
                        ]
                    })
                    break;
            }
        }
    }
}