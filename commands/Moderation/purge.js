const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
module.exports = {
    name: "purge",
    category: "Moderation",
    aliases: [ "purgeit" ],
    description: "Purge Messages!",
    args: false,
    usage: "",
    permission: ["MANAGE_MESSAGES"],
    owner: false,
    execute: async (message, args, client, prefix) => {
         if (!message.member.permissions.has('MANAGE_MESSAGES') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Manage Messages` permission to use this command.')]});
     const member = message.mentions.members.first();
      const messages = message.channel.messages.fetch();

      if (member) {
        const userMessages = (await messages).filter((m) => m.author.id === member.id);
        await message.channel.bulkDelete(userMessages);
        message.channel.send({ embeds:[new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${member} messages has been cleared.`)]})
      } else {
        if (!args[0]) return message.reply({ embeds:[new MessageEmbed()
          .setColor(ee.mediancolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`Please specify a number of messages to purge.`)]});
        if (isNaN(args[0])) return message.reply({ embeds:[new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`Number specified is not a valid number.`)]});
        if (!parseInt(args[0]) || parseInt(args[0]) < 1 || parseInt(args[0]) > 99) return message.reply({ embeds:[new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`The number specified must be between 1 and 99.`)]});
        await message.channel.bulkDelete(parseInt(args[0])).then(messages => message.channel.send({ embeds:[new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`<a:tick:1027795911868416050> **Succesfully deleted \`${messages.size}/${args[0]}\` messages.**`)]}).then(msg => setTimeout(() => msg.delete(), 3000))).catch(() => null)
        //   .setDescription(`**Succesfully deleted \`${messages.size}/${args[0]}\` messages.**`)]}).then(msg => msg.delete({
        //   timeout: 3000
        // }))).catch(() => null)
      }
  },
};