const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require("discord.js");

module.exports = {
  name: "join",
  aliases: ["j"],
  category: "Music",
  description: "Join voice channel",
  args: false,
  usage: "",
  permission: [],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {


    
  let player = message.client.manager.get(message.guildId);
        if(player && player.voiceChannel && player.state === "CONNECTED") {
            return await message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription( `I'm already connected to <#${player.voiceChannel}> voice channel!`)]})
        } else {
    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`)]});
    
    const { channel } = message.member.voice;
   
    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)]});
   
    const emojiJoin = message.client.emoji.join;

     player = message.client.manager.create({
        guild: message.guild.id,
        voiceChannel: channel.id,
        textChannel: message.channel.id,
        volume: 100,
        selfDeafen: true,
      }) 
      if(player && player.state !== "CONNECTED") player.connect();

      let thing = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`<a:tick:1027795911868416050> Joined <#${channel.id}>  and Bounded To <#${message.channel.id}>!`)
      return message.channel.send({ embeds: [thing], content:"Consider voting us on https://top.gg/bot/1044596050859663401/vote, It just takes a few seconds." });

    };
  }
};