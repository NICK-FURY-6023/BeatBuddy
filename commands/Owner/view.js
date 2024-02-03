const {MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
let os = require("os");
let cpuStat = require("cpu-stat");
const { connected } = require("process");
module.exports = {
  name: 'view',
  category: 'Owner',
  aliases: ['view'],
  description: 'Show status bot',
  args: false,
  usage: 'view',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    let uptime = await os.uptime();
    let d = Math.floor(uptime / (3600 * 24));
    let h = Math.floor(uptime % (3600 * 24) / 3600);
    let m = Math.floor(uptime % 3600 / 60);
    let s = Math.floor(uptime % 60);
    let dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    let hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    let ccount = client.channels.cache.size;
    let scount = client.guilds.cache.size;
    let mcount = 0;
    client.guilds.cache.forEach((guild) => {
      mcount += guild.memberCount;
    });
      let connectedchannelsamount = 0;
                    let guilds = client.guilds.cache.map((guild) => guild);
                    for (let i = 0; i < guilds.length; i++) {
                        if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                    }
                    if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
    const embed = new MessageEmbed()
      .setDescription(`__**${client.user.username} Information**__`)
      .setThumbnail(client.user.displayAvatarURL())
      .addFields([
        { name: `<a:server_status:1034782761040494652> • **Servers**`, value: `\`\`\`Total: ${scount} servers\`\`\``, inline: true },
         { name: `<:ga_Users:1040538370595622942> • **Users**`, value: `\`\`\`Total: ${mcount} users\`\`\``, inline: true },
        { name: "<a:ga_disk:1040538534379016222> •**DISK**", value: `\`\`\`Disk Used: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${( os.totalmem() / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: false },
       { name: `<a:playing:995321694031990904> • **Playing Music in **`, value: `\`\`\`${connectedchannelsamount} Servers\`\`\``, inline: true },
        { name: `<a:developer:1035234772043190323> • **Developer**`, value: `\`\`\`\ᴠᴀʏᴜ | ＱＵＴＹＰＩＥ<3#5738\n\`\`\``, inline: true },
        { name: `<a:ga_Crown:1040538249048887356> • **Owners**`, value: `\`\`\`\₦ł₵₭  ₣ɄⱤɎ#6023\n\`\`\``, inline: true },
      ])
      .setColor("#000000")
      .setTimestamp(Date.now());
    message.channel.send({ embeds: [embed], content:"Consider voting us on https://top.gg/bot/1044596050859663401/vote, It just takes a few seconds." });
    });
}
};
