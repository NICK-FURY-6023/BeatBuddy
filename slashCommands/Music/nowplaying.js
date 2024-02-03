const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js')
const { createBar, format } = require(`../../handlers/functions`);
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");

module.exports = {
  name: "nowplaying",
    description: "Shows the current song playing!",
  player: false,
  inVoiceChannel: true,
    category: "Music",
  sameVoiceChannel: true,

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
const player = interaction.client.manager.get(interaction.guild.id);


  
        if (!player.queue.current) {
            return interaction.reply("<a:spotano:949977608945299457> There is nothing playing rn.");
        }
        const song = player.queue.current
        const emojimusic = client.emoji.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new MessageEmbed()
.setAuthor(`Now Playing:`)
            .setURL("https://discord.gg/fz8QMYdVDq")
            .setColor("#000000")
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`<:vr_galxy:1077449151995973704> **${player.queue.current.title}**`)
            .addField(`<a:loading:1026089420593561680> Duration: `, `\`${!player.queue.current.isStream ? `${new Date(player.queue.current.duration).toISOString().slice(11, 19)}` : '◉ LIVE'}\``, true)
            .addField(`<:galaxysupport1:1044372602145230861> Song By: `, `\`${player.queue.current.author}\``, true)
            .addField(`<:vrplaylist:1040551511379410944> Queue length: `, `\`${player.queue.length} Songs\``, true)
           .addField(`<a:loading:1026089420593561680> Progress: `, createBar(player), true) 
            return message.channel.send({embeds: [embed]})

  

    }
}