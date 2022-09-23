const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (client) => {
    const channel = client.channels.cache.get("1022658856104497202");

    const ROLES = {
        HE: '1011085087716147321',
        HER: '1011085171937775686',
        THEY: '1011085215256555561',
    }

    channel.send({
        content: "What pronouns do you go by? Please click one of the buttons below to be assigned!",
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setCustomId('he')
                    .setLabel(`He/Him`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('her')
                    .setLabel(`She/Her`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('they')
                    .setLabel(`They/Them`)
                    .setStyle(ButtonStyle.Primary)
            ),
        ],
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.channelId != channel) return;
        if (!interaction.isButton()) return;

        const role = interaction.guild.roles.cache.get(
            ROLES[interaction.customId.toUpperCase()]
        );

        if (!role) return interaction.reply({ content: 'Role not found', ephemeral: true });
        
        return interaction.member.roles
            .add(role)
            .then((member) =>
                interaction.reply({
                    content: `The role was added to you ${member}`,
                    ephemeral: true,
                })
        )
        .catch((err) => {
            console.log(err);
            return interaction.reply({
                content: `Something went wrong. The role was not added`,
                ephemeral: true,
            });
        });
    });
};
