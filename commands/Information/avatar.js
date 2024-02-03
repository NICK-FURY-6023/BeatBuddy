const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "avatar",
    category: "Utility",
    aliases: [ "av" ],
    description: "To get user avatar",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
      let user = message.mentions.users.first() || message.author;
    let embed = new MessageEmbed()
      .setColor("000000")
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(
        `[Avatar Link](${user.displayAvatarURL({
          size: 2048,
          dynamic: true,
          format: "png",
        })})`
      )
      .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }));

    message.channel.send({ embeds: [embed] });
    message.delete();
  },
};