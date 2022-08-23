const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
    const channel = client.channels.cache.get("1011555094262718494");

    const checkauth0 = client.guilds.cache.find(
        (role) => role.name === "Ground Floor"
    );
    const checkauth1 = client.guilds.cache.find(
        (role) => role.name === "First Floor"
    );
    const checkauth2 = client.guilds.cache.find(
        (role) => role.name === "Second Floor"
    );
    const checkauth3 = client.guilds.cache.find(
        (role) => role.name === "Third Floor"
    );
    const checkauth4 = client.guilds.cache.find(
        (role) => role.name === "Fourth Floor"
    );

    const checkemoji0 = "0️⃣";
    const checkemoji1 = "1️⃣";
    const checkemoji2 = "2️⃣";
    const checkemoji3 = "3️⃣";
    const checkemoji4 = "4️⃣";

    const embed = new EmbedBuilder()
        .setColor("#0023ff")
        .setTitle("Please react to this message to continue!")
        .setDescription(
            "You're one step away to start chatting with the community!\n\n Please react to the" +
                " emojis below to continue!"
        );
    if (channel.messages.find("942334997229084703")) {
        channel.send({ embeds: [embed] }).then((m) => {
            m.react(checkemoji0);
            m.react(checkemoji1);
            m.react(checkemoji2);
            m.react(checkemoji3);
            m.react(checkemoji4);
        });
    } else {
        console.log("message already sent.");
    }

    client.on("messageReactionAdd", async (reaction, user) => {
        if (user.bot) return;

        if (reaction.message.channel.id === channel.id) {
            if (reaction.emoji.name === checkemoji0) {
                reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add("1011078021995827231");
            } else if (reaction.emoji.name === checkemoji1) {
                reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add("1011080645772070964");
            } else if (reaction.emoji.name === checkemoji2) {
                reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add("1011080697135517756");
            } else if (reaction.emoji.name === checkemoji3) {
                reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add("1011080743054737429");
            } else if (reaction.emoji.name === checkemoji4) {
                reaction.message.guild.members.cache
                    .get(user.id)
                    .roles.add("1011080784381223054");
            }
        }
        console.log("add");
    });
};
