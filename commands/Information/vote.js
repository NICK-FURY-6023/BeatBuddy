const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const axios = require("axios");
const moment = require("moment");
module.exports = {
    name: "vote",
    category: "Info",
    aliases: [ "voteme" ],
    description: "Vote about GALAXY",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
       const row = new MessageActionRow()
           .addComponents(new MessageButton()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/1044596050859663401/vote")
                          .setEmoji("994187339523956767")
			);
      const embed = new MessageEmbed()
      .setDescription("<a:tick:1027795911868416050> [Click here](https://top.gg/bot/1044596050859663401/vote) to vote for  GALAXY .")
      .setColor("#000000")
      return message.channel.send({
                    embeds: [embed], components: [row]})
    }
}