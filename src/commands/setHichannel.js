
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { getHiChannelId, setHiChannelId } = require('../hiChannelId.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setchannel')
        .setDescription('chọn kênh bot có thể gửi tin nhắn')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Chọn kênh chào mừng')
                .setRequired(true)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        if (getHiChannelId() === channel.id) {
            await interaction.reply({ content: `😟 Kênh chào mừng đang là kênh này rồi`, ephemeral: true });
        } else {
            setHiChannelId(channel.id);

            await interaction.reply({ content: `✅ Kênh chào mừng đã đổi thành: ${channel}`, ephemeral: true })
        }

    }
}