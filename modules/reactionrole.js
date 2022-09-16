const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (client) => {
    const channel = client.channels.cache.get("1011555094262718494");

    const ROLES = {
        GROUND: '1011078021995827231',
        FIRST: '1011080645772070964',
        SECOND: '1011080697135517756',
        THIRD: '1011080743054737429',
        FOURTH: '1011080784381223054',
    }

    const checkemoji0 = "0️⃣";
    const checkemoji1 = "1️⃣";
    const checkemoji2 = "2️⃣";
    const checkemoji3 = "3️⃣";
    const checkemoji4 = "4️⃣";

    channel.send({
        content: "Which floor do you currently live on?",
        components: [
            new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                    .setCustomId('ground')
                    .setLabel(`${checkemoji0} Floor`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('first')
                    .setLabel(`${checkemoji1} Floor`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('second')
                    .setLabel(`${checkemoji2} Floor`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('third')
                    .setLabel(`${checkemoji3} Floor`)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('fourth')
                    .setLabel(`${checkemoji4} Floor`)
                    .setStyle(ButtonStyle.Primary)
            ),
        ],
    });

    client.on("interactionCreate", async (interaction) => {
        if (interaction.isButton()) {
            const role = interaction.guild.roles.cache.get(
                ROLES[interaction.customId.toUpperCase()]
            );

            if (!role) return interaction.reply({ content: 'Role not found', ephemeral: true });
            
            return interaction.member.roles
                .add(role)
                .then((member) =>
                    interaction.reply({
                        content: `The ${role} role was added to you ${member}`,
                        ephemeral: true,
                    })
            )
            .catch((err) => {
                console.log(err);
                return interaction.reply({
                    content: `Something went wrong. The ${role} role was not added`,
                    ephemeral: true,
                });
            });
        }
    });
};
