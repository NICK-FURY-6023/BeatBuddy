const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");


module.exports = {
 name: "settings",
  description: "Shows the server settings.",
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
 if (!interaction.member.permissions.has('MANAGE_GUILD') && !'701643179212013568'.includes(interaction.author.id)) return interaction.reply({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Manage Guild` permission to use this command.')]});
      let vc;
      let ap = await client.db.get(`auto_${interaction.guild.id}`)
      let tw = await client.db.get(`247_${interaction.guild.id}`)
      if(tw === "true") vc = await client.db.get(`vcid_${interaction.guild.id}`)
      const embed = new MessageEmbed()
      .setTitle(`<a:Settings:981176342877978694>${interaction.guild.name} Settings`)
      .setColor("#000000")
      .addField("**<:prefix:972103289791479838> Prefix**", `\`/\`,<@979228261924081709>`,true)
      .addField(`<:247:972103433173733396> 24/7`, tw === `true` ? "<:DynoSuccess:983623619219423262>" : "<:ERROR:976004129430315079>",true)
      if(tw === `true`){
      embed.addField(`<:247:972103433173733396> 24/7 VC`, `<#${vc}>`,true)
    }
      embed.addField(`<:autoplay:968861408739610696> Autoplay`, ap === `true` ? "<:DynoSuccess:983623619219423262>" : "<:ERROR:976004129430315079>",false)
      interaction.reply({embeds: [embed]})
    }
}
