// Require the necessary discord.js classes
const Discord = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds],
});

const rolereact = require("./modules/reactionrole");

const fs = require("fs");
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

async function command_func(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        client.commands.get("ping").execute(message, args);
    } else if (command === "youtube") {
        client.commands.get("youtube").execute(message, args);
    }
}

client.on("messageCreate", (message) => {
    command_func(message);
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Ready!");
    client.user.setStatus("online");
    client.user.setActivity("$help", { type: "LISTENING" });
    rolereact(client);
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);
