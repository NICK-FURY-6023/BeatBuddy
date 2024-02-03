const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
module.exports = {
  name: "247",
  aliases: ["24h", "24/7", "24*7"],
  category: "Settings",
  description: "Toggles 24/7 mode in the server.",
  args: false,
  usage: "",
  userPrams: ["ADMINISTRATOR"],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {

  
  let data = await client.db.get(`247_${message.guild.id}`);
      if(!data)
  {
    client.db.set(`247_${message.guild.id}`, `false`)
  }
  const { channel } = message.member.voice;
    const player = message.client.manager.players.get(message.guild.id);
    if (data === `true`) {
      client.db.set(`247_${message.guild.id}`, `false`);
      client.db.delete(`vcid_${message.guild.id}`);
      client.db.delete(`chid${message.guild.id}`);
      const embed = new MessageEmbed()
          .setColor("#000000")
       .setDescription(`24/7 mode is now **disabled**!`)
      return message.channel.send({embeds: [embed], content:"Consider voting us on https://top.gg/bot/1044596050859663401/vote, It just takes a few seconds."});
    
    }
    else if(data === `false`)
    {
      client.db.set(`247_${message.guild.id}`, `true`);
      client.db.set(`vcid_${message.guild.id}`, channel.id);
      client.db.set(`chid_${message.guild.id}`, message.channel.id);
      const embed = new MessageEmbed()
       .setColor("#000000")
       .setDescription(`24/7 mode is now **enabled**!`)
      
      return message.channel.send({embeds: [embed], content:"Consider voting us on https://top.gg/bot/1044596050859663401/vote, It just takes a few seconds."});
    }
  }
};