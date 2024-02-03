const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "stop",
    category: "Music",
    description: "Stops the music",
    args: false,
    usage: "",
    permission: [],
    dj: true,
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	execute: async (message, args, client, prefix) => {
  
        const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("#000000")
                .setDescription("There is no music playing.");
            return message.reply({embeds: [thing]});
        }

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.destroy()

        const emojistop = client.emoji.stop;

		    let thing = new MessageEmbed()
            .setColor("#000000")
    
            .setDescription(`**Thank you for using our service!**`)
            .addField("Loving The Bot?",`Consider Voting our Bot on [Top.gg](https://top.gg/bot/1044596050859663401/vote)`)
            .setImage("https://cdn.discordapp.com/attachments/1035156691932676106/1035551811412701274/The_Most_Feature_Rich_Music_Bot.png")
        message.channel.send({embeds: [thing]});
	
  	}
};