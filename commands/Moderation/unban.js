const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
const ms = require("ms");
module.exports = {
    name: "ban",
    category: "Moderation",
    aliases: [ "banhammer" ],
    description: "ban a user lol",
    args: false,
    usage: "",
    permission: ["BAN_MEMBERS"],
    owner: false,
    execute: async (message, args, client, prefix) => {
         if (!message.member.permissions.has('BAN_MEMBERS') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Ban Members` permission to use this command.')]});
  let reason = args.slice(1).join(" ");
      const mentionedMember = message.mentions.members.first();
        
        
      if (!reason) reason = 'No reason given.';
      if (!args[0]) return message.channel.send({ embeds:[new MessageEmbed()
        .setColor(ee.mediancolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`You must state someone to ban.`)]});
        
      if (!mentionedMember) return message.channel.send({ embeds:[new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`The member mentioned is not in the server.`)]});
        
        if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${client.allEmojis.x} You cannot ban this user as his role is same role of your's or above your current highest role.`)
        ]
      });
        
      if (message.guild.me.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${client.allEmojis.x} I cannot ban this user as his role is the same or higher then mine.`)
        ]
      });
        
      if (!mentionedMember.bannable) return message.channel.send({ embeds:[new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`I cannot ban that member.`)]});

      await mentionedMember.send({ embeds:[new MessageEmbed()
        .setTitle(`You have been banned from ${message.guild.name}`)
        .setDescription(`Reason for being banned: ${reason}`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTimestamp()]}).catch(err => console.log('I was unable to message the member.'));
      await mentionedMember.ban({
        reason: reason
      }).catch(err => console.log(err)).then(() => message.channel.send({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription("<a:tick:1027795911868416050> Successfully banned " + mentionedMember.user.tag)]}));
        

  },
};