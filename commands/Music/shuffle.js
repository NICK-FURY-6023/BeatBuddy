const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "shuffle",
       category: "Dj",
      dj: true,
    description: "Shuffles the queue.",
    args: false,
    usage: "",
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


        player.queue.shuffle();
        
        const emojishuffle = message.client.emoji.shuffle;

        let thing = new MessageEmbed()
            .setDescription(`${emojishuffle} Shuffled the queue`)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        return message.channel.send({embeds: [thing]}).catch(error => message.client.logger.log(error, "error"));
	
    }
};