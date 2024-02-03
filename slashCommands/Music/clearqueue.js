const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");


module.exports = {
 name: "clearqueue",
  description: "Clears the queue",
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    dj: true,
    category: "Djj",
        permission: [],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
 await interaction.deferReply({
      ephemeral: false
    });
    let player = interaction.client.manager.get(interaction.guildId);
    player.queue.clear();


    let thing = new MessageEmbed()
         .setColor("#000000")
      .setTimestamp()
      .setDescription(`<:Success:853965334297444393> Removed all songs from the queue`)
    return interaction.editReply({ embeds: [thing] });

  }
};