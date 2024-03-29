const { MessageEmbed, CommandInteraction, Client } = require("discord.js")

module.exports = {
  name: "resume",
  description: "Resume currently playing music",
  permissions: [],
  player: true,
  dj: false,
    category:"Music",
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
    const song = player.queue.current;

    if (!player.queue.current) {
      let thing = new MessageEmbed()
        .setColor("#000000")
        .setDescription("There is no music playing.");
      return interaction.editReply({ embeds: [thing] });
    }

    const emojiresume = client.emoji.resume;

    if (!player.paused) {
      let thing = new MessageEmbed()
        .setColor("#000000")
        .setDescription(`${emojiresume} The player is already **resumed**.`)
        .setTimestamp()
      return interaction.editReply({ embeds: [thing] });
    }

    player.pause(false);

    let thing = new MessageEmbed()
      .setDescription(`${emojiresume} **Resumed**\n[${song.title}](https://discord.gg/CdCfgSC3qy)`)
      .setColor(client.embedColor)
      .setTimestamp()
    return interaction.editReply({ embeds: [thing] });

  }
};
