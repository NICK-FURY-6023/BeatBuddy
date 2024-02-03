const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");


module.exports = {
 name: "autoplay",
  description: "Toggle autoplay in this server!",
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    category: "Settings",
        permission: [],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
const em1 = new MessageEmbed()

      if (!interaction.member.permissions.has('MANAGE_GUILD') && !'701643179212013568'.includes(interaction.author.id)) interaction.reply({embeds: [new MessageEmbed().setColor("#FF0000").setDescription('You must have `Manage Guild` permission to use this command.')]});

        const player = interaction.client.manager.get(interaction.guild.id);


          let data = await client.db.get(`auto_${interaction.guild.id}`);
  if(!data)
  {
    client.db.set(`auto_${interaction.guild.id}`, `false`)
  }


        if (data === `false`) {
          client.db.set(`auto_${interaction.guild.id}`, `true`)
            let thing = new MessageEmbed()
                      .setColor("#000000")
        .setDescription(`<a:emote:981192384585023499> Autoplay is now enabled in this server`)
          return interaction.reply({embeds: [thing]});
        } else {
          client.db.set(`auto_${interaction.guild.id}`, `false`)
            let thing = new MessageEmbed()
                     .setColor("#000000")
                  .setDescription(`<a:emote:981192384585023499> Autoplay is now disabled in this server`)
               
            return interaction.reply({embeds: [thing]});
        }
   }
}