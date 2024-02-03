const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "version",
    category: "Info",
    aliases: [ "botinfo" ],
    description: "To get information about this bot!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
       
      const embed = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        .setAuthor(`Version Information`,client.user.displayAvatarURL())
        
 .addFields([
        { name: `**Bot Version**`, value: `\`1.4.0\``, inline: true },
        { name: `**Discord.js**`, value: `\`14.6.0\``, inline: true },
        { name: `**Player Version**`, value: `\`3.2.0\``, inline: true },
        { name: `**Lavaplayer version**`, value: `\`4.9.0\``, inline: false },
        { name: `**Nodejs version**`, value: `\`17.9.1\``, inline: true }

       
      ])
       .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({embeds: [embed]})
    }
}