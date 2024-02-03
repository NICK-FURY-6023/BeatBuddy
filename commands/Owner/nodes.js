const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "nodex",
    category: "Owner",
    description: "Check node information",
    args: false,
    usage: "nodex",
    permission: [],
    owner: false,
 execute: async (message, args, client, prefix) => {
  
     const all = client.manager.nodes.map(node => 
            `\nNode: 🟢 GALAXY LOADED READY TO PLAY` +
            `\nConnection: ${node.stats.playingPlayers}` +
            `\nMemory Usage: ${Math.round(node.stats.memory.used / 1024 / 1024)}mb` +
            `\nUptime: ${moment.duration(node.stats.uptime).format("D[d] H[h] m[m] s[s]")}`  
        ).join('\n\n----------------------------\n');

        const embed = new MessageEmbed()
  .setTitle("Node Statistics")
            .setDescription(`\`\`\`${all}\`\`\``)
.setColor("#000000")
        message.channel.send({embeds: [embed], content:"Consider voting us on https://top.gg/bot/1044596050859663401/vote, It just takes a few seconds."})
    }
}