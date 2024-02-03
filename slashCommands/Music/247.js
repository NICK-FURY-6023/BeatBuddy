const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");


module.exports = {
 name: "247",
  description: "Toggle 247 in this server!",
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

        
  let data = await client.db.get(`247_${interaction.guild.id}`);
  if(!data)
  {
    client.db.set(`247_${interaction.guild.id}`, `false`)
  }
  const { channel } = interaction.member.voice;
    const player = interaction.client.manager.players.get(interaction.guild.id);
    if (data === `true`) {
      client.db.set(`247_${interaction.guild.id}`, `false`);
      client.db.delete(`vcid_${interaction.guild.id}`);
      client.db.delete(`chid${interaction.guild.id}`);
      const embed = new MessageEmbed()
          .setColor("#FF00FF")
       .setDescription(`24/7 mode is now **disabled**!`)
      return interaction.reply({embeds: [embed]});
    
    }
    else if(data === `false`)
    {
      client.db.set(`247_${interaction.guild.id}`, `true`);
      client.db.set(`vcid_${interaction.guild.id}`, channel.id);
      client.db.set(`chid_${interaction.guild.id}`, interaction.channel.id);
      const embed = new MessageEmbed()
     .setColor("#000000")
       .setDescription(`24/7 mode is now **enabled**!`)
      
   return interaction.reply({embeds: [embed]});
    }
  }
};