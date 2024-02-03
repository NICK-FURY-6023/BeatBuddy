const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
	name: "playerinfo",
    aliases: ["musicinfo"],
    category: "Music",
    description: "Shows The Settings Of The Music Player.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: false,
	 execute: async (message, args, client, prefix) => {
  
  const player = message.client.manager.get(message.guild.id);
  let rep = "";
if(player.trackRepeat) rep = "🔂 Track";
if(player.queueRepeat) rep = "🔁 Queue";
if(!player.queueRepeat && !player.trackRepeat) rep = "<a:dinowrong:989898494313635870> Disabled";
  const em = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : client.config.embedColor)
    .setAuthor(`Music Settings For ${message.guild.name}`, client.user.displayAvatarURL(), "https://discord.gg/fz8QMYdVDq")
    .setDescription(`**Now Playing - ${player.queue.current ? `[${player.queue.current.title.substring(0, 63)}](https://discord.gg/fz8QMYdVDq)` : "Nothing"}**`)
    .addField(`**<:queue:1014135650586472488> Queue Length**`, `**${player.queue.length}**`, true)
    .addField(`**<:pause:996039702736011385> Song Paused**`, `${player.paused ? "**<a:emote:981192384585023499> Yes**" : "**<a:dinowrong:989898494313635870> No**"}`,true)
    .addField(`**<:loop1:983307425543258162> Looping**`, `**${rep}**`, true)
    .addField(`<a:volume:1016609409696272414> Volume`, `**${player.volume}%**`, true)
    .addField(`**<:autoplay:981427763472908298> Autoplay**`, await client.db.get(`auto_${message.guild.id}`) === `true` ? "**<a:emote:981192384585023499> Enabled**" : "**<a:dinowrong:989898494313635870> Disabled**", true)
    .addField(`**24/7**`, await client.db.get(`247_${message.guild.id}`) === `true` ? "**<a:emote:981192384585023499>Enabled**" : "**<a:dinowrong:989898494313635870> Disabled**", true)
    .addField(`**<:spivoice:1027824734395707423> Current Voice Channel**`, `<#${player.voiceChannel}>`, true)
    .addField(`**<:spitext:1027824854440874044> Current Text Channel**`, `<#${player.textChannel}>`, true)
    message.channel.send({embeds: [em]})
   }
}