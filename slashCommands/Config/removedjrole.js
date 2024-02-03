const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/dj");


module.exports = {
 name: "deletedj",
  description: "delete Dj Role",
    
    category: "Settings",
        permission: [],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
  await interaction.deferReply({
            ephemeral: false
        });

        let data = await db.findOne({ Guild: interaction.guildId });
        if (data) {
            await data.delete()
            return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Successfully Removed All DJ Roles.`).setColor("BLURPLE")] })
        } else return interaction.editReply({ embeds: [new MessageEmbed().setDescription(`Don't Have Dj Setup In This Guild`).setColor("BLURPLE")] })

    }
}