const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "suggest",
    category: "Info",
    aliases: [ "s" ],
    description: "Make an suggestion for the bot",
    args: false,
    usage: "",
    permission: ["MANAGE_MESSAGES"],
    owner: false,
    execute: async (message, args, client, prefix) => {
 const avatar = message.author.avatarURL;
    const suggestchannel = client.channels.cache.get("1044716897016500335");
    const suggestion = args.join(" ");
    if (!suggestion) {
      return message.channel.send("Please Suggest Something");
    }
    message.channel.send(
      "Thanks for Suggesting Features for GALAXY . Our Owners will inform you if your Suggestion is accepted or not!"
    );
    const embed = new MessageEmbed()
      .setAuthor(`New Suggestion!`, avatar)
      .setDescription(`${suggestion} \n\nBy: ${message.author.tag}\nUser ID: ${message.author.id}`)
      .setColor("#000000");

    suggestchannel.send({ embeds: [embed] })
           }
}