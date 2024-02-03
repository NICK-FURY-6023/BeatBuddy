const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");


module.exports = {
 name: "skip",
	description: "Skip the current playing track!",
    player: true,
    category: "Djj",
      dj: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
        permission: [],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
await interaction.deferReply({
      ephemeral: false
    });

    const emojiskip = client.emoji.skip;
    const player = client.manager.get(interaction.guildId);

    if (player && player.state !== "CONNECTED") {
      player.destroy();
      return await interaction.editReply({
        embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`Nothing is playing right now.`)]
      }).catch(() => { });
    };
    if (!player.queue) return await interaction.editReply({
      embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Nothing is playing right now.")]
    }).catch(() => { });
    if (!player.queue.current) return await interaction.editReply({
      embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Nothing is playing right now.")]
    }).catch(() => { });

    if (!player.queue.size) return await interaction.editReply({
      embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("No songs left in the queue to skip.")]
    }).catch(() => { });

    player.stop();
    return await interaction.editReply({
      embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`<a:security:1018788409638129704> **Gacho Gacho Skipped** \n[${player.queue.current.title}](https://discord.gg/CdCfgSC3qy)`)]
    }).catch(() => { });
  }
}