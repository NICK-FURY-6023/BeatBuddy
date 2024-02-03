const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
const ms = require("ms");
module.exports = {
    name: "unban",
    category: "Moderation",
    aliases: [ "unbanhammer" ],
    description: "unban a user lol",
    args: false,
    usage: "",
    permission: ["BAN_MEMBERS"],
    owner: false,
    execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has('BAN_MEMBERS') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Ban Members` permission to use this command.')]});
 let reason = args.slice(1).join(" ");
      let userID = args[0];

      if (!reason) reason = 'No reason given.';
      if (!args[0]) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.mediancolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`You must state someone to unban.`)
        ]
      });
      if (isNaN(args[0])) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`The ID stated is not a number.`)
        ]
      });

      message.guild.bans.fetch().then(async bans => {
        if (bans.size == 0) return message.reply({
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription(`This server does not have anyone banned`)
          ]
        });
        let bUser = bans.find(b => b.user.id == userID);
        if (!bUser) return message.reply({
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setDescription(`The user ID mentioned is not banned`)
          ]
        });
        await message.guild.members.unban(bUser.user, reason).catch(err => {
          console.log(err);
          return message.reply({
            embeds: [new MessageEmbed()
              .setColor(ee.wrongcolor)
              .setFooter(ee.footertext, ee.footericon)
              .setDescription(`Something went wrong unbanning the id.`)
            ]
          });
        }).then(() => {
          message.reply({
            embeds: [new MessageEmbed()
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setDescription(`<a:tick:1027795911868416050> Successfully Unbanned ${args[0]}`)
            ]
          });
        });
      });
  },
};