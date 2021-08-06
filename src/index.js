const { Client, Intents } = require("discord.js");
const dotenv = require("dotenv");
const express = require("express");

//add environment variables from .env file
dotenv.config();

// start server to prevent repl.it from shutting down
const app = express();
app.get("/", (_, res) => res.sendFile(`${__dirname}/res/index.html`));
app.listen(process.env.PORT, () => console.log("Server is listening..."));

// start actual bot
const intents = [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS];
const client = new Client({ intents });
client.login(process.env.TOKEN);

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}.`);
});

client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand()) {
        const command = require(`${__dirname}/commands/${interaction.commandName}.js`);
        command.handle(interaction);
    }
});
