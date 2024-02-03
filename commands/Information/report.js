const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "report",
    category: "Info",
    aliases: [ "r" ],
    description: "Report a bug",
    args: false,
    usage: "",
    permission: ["MANAGE_MESSAGES"],
    owner: false,
    execute: async (message, args, client, prefix) => {
 const reportchannel = client.channels.cache.get("1044716271964528681");
    const report = args.join(" ");
    if (!report) {
      return message.channel.send(
        "Enter the Description of the bug you encountered!"
      );
    }
    message.channel.send(
      `${message.author}, Your Report has been Successfully Submitted. Our Owners will reply to you as soon as possible`
    );
    const embed = new MessageEmbed()
      .setTitle("New Bug Report")
      .setDescription(`${report} \n\nBy: ${message.author.tag}\nUser ID: ${message.author.id}`)
      .setColor("#000000");

    reportchannel.send({embeds: [embed]})
          }
}