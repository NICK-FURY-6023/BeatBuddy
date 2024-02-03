const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Info",
    description: "Shows bot's Latency.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
  
let embed = new MessageEmbed()
            .addField(`\u200b**Bot Ping**`, `\`\`\`nim\nPinging\`\`\``)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        const g = await message.channel.send({embeds: [embed]})

        embed = new MessageEmbed()
            .addField(`\u200b**Bot Ping**`, `\`\`\`nim\n${Math.round(client.ws.ping)}ms\`\`\``)
            .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        g.edit({embeds: [embed]})
    }
}