const { REST, Routes } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const setChannelCommand = require('./src/commands/setHichannel.js');

const commands = [setChannelCommand.data.toJSON()];
const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {


        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );


    } catch (error) {
        console.error(error);
    }
})();