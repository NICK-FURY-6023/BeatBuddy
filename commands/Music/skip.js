const { MessageEmbed } = require("discord.js");


module.exports = {
	name: "skip",
	aliases: ["s"],
    category: "Dj",
      dj: true,
	description: "Skip the current playing track!",
	args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, track, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            return message.reply(`There is nothing playing.`);
        }
const previoustrack = player.get("previoustrack");
  if(player.queueRepeat){
    if(previoustrack){
      player.queue.add(previoustrack)
    }
  }
  if(player.trackRepeat){
    if(previoustrack){
      player.queue.unshift(previoustrack)
    }
  }
        player.stop();
        player.clearEQ();
        message.react("<a:tick:1027795911868416050>")
        
        }
    };