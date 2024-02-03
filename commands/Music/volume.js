const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "volume",
	aliases: ["v", "vol"],
	category: "Music",
	description: "Lets u adjust the volume of the bot",
	  args: false,
    usage: "<0 - 150>",
    permission: [],
    owner: false,
  	player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#000000")
                .setDescription("There is no music playing.");
            return message.channel.send({embeds: [thing]});
		}
		
		const volumeEmoji = "<:galaxyvolume_up:1044373079532507236>";

		if (!args.length) {
			let thing = new MessageEmbed()
			.setColor("#000000")
			.setDescription(`${volumeEmoji} The current volume is: **${player.volume}%**`)
			return message.channel.send({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 150) { 
			let thing = new MessageEmbed()
             .setColor("#000000")
				.setDescription(`<Provide the Number of volume between 0 - 150>`)
            return message.channel.send({embeds: [thing]});
		}
    const curv = player.volume;
		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = message.client.emoji.volumehigh;
	
		  return message.channel.send(`The volume has been changed from **${curv}%** to **${volume}%**`);
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setColor("#000000")
				.setDescription(`The volume has been changed from **${curv}%** to **${volume}%**`)
		  return message.channel.send(`The volume has been changed from **${curv}%** to **${volume}%**`);
		} else {
			let thing = new MessageEmbed()
				.setColor("#000000")
				.setDescription(`The volume has been changed from **${curv}%** to **${volume}%**`)
			return message.channel.send(`The volume has been changed from **${curv}%** to **${volume}%**`);
		}
		
 	}
};