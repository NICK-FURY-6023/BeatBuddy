const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "enlargeemoji",
    category: "Utility",
    aliases: [ "emoji" ],
    description: "Enlarges a emoji",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
       const authoravatar = message.author.avatarURL();
    const emoji = args[0];
    if (!emoji) return message.channel.send(`Please Give Me A Emoji!`);

    let customemoji = Discord.Util.parseEmoji(emoji);

    if (customemoji.id) {
      const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
        customemoji.animated ? "gif" : "png"
      }`;

      const Added = new MessageEmbed()
        .setAuthor(`Enlarged Emoji`, authoravatar)
        .setColor("#000000")
        .setDescription(`\`${customemoji.name}\` \`${customemoji.id}\``)
        .setImage(Link);
      return message.channel.send({ embeds: [Added] });
    } else {
      let CheckEmoji = parse(emoji, { assetType: "png" });
      if (!CheckEmoji[0])
        return message.channel.send(`Please Give Me A Valid Emoji!`);
      message.channel.send(
        `You Can Use Normal Emoji Without Adding In Server!`
      );
    }
  },
};