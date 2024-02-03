const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "loop",
    aliases: ['l'],
        category: "Dj",
      dj: true,
	description: "Toogle looping your currently playing track!",
	args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

            let thing = new MessageEmbed()
        if (!player.queue.current) {
                thing.setColor("#000000")
                thing.setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
        }
		
		const emojiloop = message.client.emoji.loop;
      if(!args[0]){
      if(!player.trackRepeat && !player.queueRepeat){
        player.setQueueRepeat(true)
     message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`<a:autoplay:1026255710058709114> Now looping the whole queue **enabled**`)]})
      }
      else if(!player.trackRepeat && player.queueRepeat){
        player.setTrackRepeat(true)
     message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`<a:autoplay:1026255710058709114> Looping the current song **enabled**`)]})
      }
      else if(player.trackRepeat && !player.queueRepeat){
        player.setTrackRepeat(false)
        player.setQueueRepeat(false)
     message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`<a:autoplay:1026255710058709114> Now looping mode is **disabled**`)]})
      }
    }
   else if(args[0] == "off"){
      player.setQueueRepeat(false)
      player.setTrackRepeat(false)
     message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`<a:autoplay:1026255710058709114> Now looping mode is **disabled**`)]});
    }
    else if(args[0] === "track"){
      player.setTrackRepeat(true)
     message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`<a:autoplay:1026255710058709114> Looping the current song **enabled**`)]})
    }
    else if(args[0] === "queue"){
      player.setQueueRepeat(true)
     message.channel.send({embeds: [new MessageEmbed().setColor("RANDOM").setDescription(`<a:autoplay:1026255710058709114> Now looping the whole queue **enabled**`)]})
    }

    
   }   
};