const { MessageEmbed, CommandInteraction, Client, Permissions, MessageButton, MessageActionRow } = require("discord.js")
const { convertTime } = require('../../utils/convert.js');

module.exports = {
   name: "pause",
  description: "Pause the currently playing music",
    category:"Music",
  permissions: [],
  player: true,
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
    const player = interaction.client.manager.get(interaction.guildId);

    if (!player.queue.current) {
      let thing = new MessageEmbed()
        .setColor("#000000")
        .setDescription("There is no music playing.");
      return interaction.editReply({ embeds: [thing] });
    }

    const emojipause = client.emoji.pause;

    if (player.paused) {
      let thing = new MessageEmbed()
        .setColor("#000000")
        .setDescription(`<:pause:996039702736011385> The player is already paused.`)
        .setTimestamp()
      return interaction.editReply({ embeds: [thing] });
    }

    player.pause(true);

    const song = player.queue.current;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setTimestamp()
      .setDescription(`${emojipause} **Paused**\n[${song.title}](https://discord.gg/CdCfgSC3qy)`)
    return interaction.editReply({ embeds: [thing] });

  }
};