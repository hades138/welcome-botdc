
const { getHiChannelId } = require('./hiChannelId.js');
const setChannelCommand = require('./commands/setHichannel.js');
require('dotenv').config();
const token = process.env.TOKEN;
const newMembers = new Set();

const { Client, IntentsBitField, SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});



client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

//bat su kien nguoi dung bam nut chao
client.on("interactionCreate", async interaction => {
    if (interaction.customId === 'welcome_button') {
        if (newMembers.has(interaction.user.id)) {
            await interaction.reply({ content: `${interaction.user.tag} đã gửi lời chào đến mọi người!` });
        } else {
            await interaction.reply({ content: `${interaction.user.tag} đã gửi lời chào đến thành viên mới!` });
        }

    }

    if (interaction.isChatInputCommand() && interaction.commandName === 'setchannel') {
        await setChannelCommand.execute(interaction);
    }
})

//bat su kien nguoi dung moi
client.on("guildMemberAdd", (guildMember) => {
    if (!guildMember.user.bot) {
        newMembers.add(guildMember.user.id);

        setTimeout(() => {
            newMembers.delete(guildMember.user.id);
        }, 5 * 60 * 1000);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('welcome_button')
                    .setLabel('Say hi!')
                    .setStyle(ButtonStyle.Secondary)
            );

        client.channels.cache
            .get(getHiChannelId()).
            send({
                content: `Welcome ${guildMember.user.tag}! Let's get a nice time together!!`
                , components: [row]
            });
    }
})



client.login(
    token
);