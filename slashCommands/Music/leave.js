const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "leave",
  description: "Leave voice channel",
  permissions: [],
  player: true,
    category:"Music",
  dj: true,
    category: "Djj",
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false
    });

    const player = client.manager.get(interaction.guildId);

    const emojiLeave = client.emoji.leave;

    player.destroy();

    let thing = new MessageEmbed()
          .setColor("#000000")
      .setDescription(`${emojiLeave} **Leave the voice channel**\nThank you for using ${interaction.client.user.username}!`)
    return interaction.editReply({ embeds: [thing] });

  }
};
