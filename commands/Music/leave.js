const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "leave",
    aliases: ["dc"],
    category: "Dj",
      dj: true,
    description: "Leave the Voice channel and reset the player.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
   

   
		const { channel } = message.member.voice;
       
        const player = message.client.manager.get(message.guild.id);

try {
    if(player.get('nowplayingMSG'))
    {
      let mess = player.get('nowplayingMSG')
        if(mess.deletable){

            mess.delete();
    }
    }
    }catch(err)  { 
    
  }

        const emojiLeave = message.client.emoji.leave;

        player.destroy();
        
        let thing = new MessageEmbed()
            .setColor("#000000")
            .setDescription(`<a:tick:1027795911868416050> Left<#${channel.id}>!`)
          return message.channel.send({embeds: [thing], content:"Consider voting us on https://top.gg/bot/1044596050859663401/vote, It just takes a few seconds."});
	
    }
};