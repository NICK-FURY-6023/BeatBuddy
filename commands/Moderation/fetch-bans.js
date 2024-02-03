const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
const ms = require("ms");
module.exports = {
    name: "fetch-bans",
    category: "Moderation",
    aliases: [ "bans" ],
    description: "Display Banned Member!",
    args: false,
    usage: "",
    permission: ["MANAGE_ROLES"],
    owner: false,
    execute: async (message, args, client, prefix) => {
  const fetchBans = message.guild.bans.fetch();
      const bannedMembers = (await fetchBans).map((member) => `\`${member.user.tag}\``).join("\n");
      message.channel.send({ embeds:[new MessageEmbed()
        .setAuthor('Banned Members List', message.guild.iconURL({
          dynamic: true
        }))
        .setThumbnail(message.guild.iconURL({
          dynamic: true
        }))
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(bannedMembers)]});
  },
};