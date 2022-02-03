module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            command.execute(interaction, interaction.message, interaction.member, interaction.channel, interaction.client, interaction.guild);
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};