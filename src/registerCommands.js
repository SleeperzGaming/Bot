const { Client, Intents } = require("discord.js");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

const intents = [Intents.FLAGS.GUILDS];
const client = new Client({ intents });
client.login(process.env.TOKEN);

client.on("ready", async () => {
    const guild = await client.guilds.fetch(process.env.GUILD);
    const files = fs.readdirSync(`${__dirname}/commands`);
    for (const fileName of files) {
        const command = require(`${__dirname}/commands/${fileName}`).info;
        console.log(`Registering ${command.name}...`);
        await guild.commands.create(command);
    }
    process.exit(0);
});
