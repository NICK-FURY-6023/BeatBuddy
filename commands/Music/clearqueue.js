const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq", "clear"],
    category: "Dj",
      dj: true,
  	description: "Removes all tracks from the queue and stop the player.",
	  args: false,
    usage: "<Number of song in queue>",
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

		player.queue.clear();
    return message.react(`<a:tick:1027795911868416050>`);
    }
};