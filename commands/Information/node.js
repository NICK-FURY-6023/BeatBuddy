const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "node",
    category: "Info",
    description: "Check node information",
    args: false,
    usage: "",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {
   const em1 = new MessageEmbed();
      if (!client.owner.includes(message.author.id)) {
      return ;
};
  
     const all = client.manager.nodes.map(node => 
            `🟢 GALAXY NODE` +
            `\nTotal Players: ${node.stats.players}` +
            `\nTotal Playing: ${node.stats.playingPlayers}` +
            `\nUptime: ${moment.duration(node.stats.uptime).format("D[d] H[h] m[m] s[s]")}` +
            `\nReservable Memory: ${Math.round(node.stats.memory.reservable / 1024 / 1024)}mb` +
            `\nUsed Memory: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\nFree Memory: ${Math.round(node.stats.memory.free / 1024 / 1024)}mb` +
            `\nAllocated Memory: ${Math.round(node.stats.memory.allocated / 1024 / 1024)}mb` +
            `\nCores: ${node.stats.cpu.cores}` +
            `\nSystem Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%` +
            `\nLavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`
        ).join('\n\n----------------------------\n');

        const embed = new MessageEmbed()
            .setAuthor('GALAXY', client.user.displayAvatarURL())
            .setDescription(`\`\`\`${all}\`\`\``)
.setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
        message.channel.send({embeds: [embed]})
    }
}