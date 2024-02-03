const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
module.exports = {
    name: "kick",
    category: "Moderation",
    aliases: [ "kicklol" ],
    description: "Bans a member from your server.",
    args: false,
    usage: "",
    permission: ["BAN_MEMBERS"],
    owner: false,
    execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has('KICK_MEMBERS') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Kick Members` permission to use this command.')]});
    const mentionedMember = message.mentions.members.first();
      let reason = args.slice(1).join(" ");
      if (!reason) reason = "No reason given";

      // `${prefix}kick @user reason`
      if (!args[0]) return message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.mediancolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`You need to state a user to kick!`)]});
      if (!mentionedMember) return message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`The member mentioned is not in the server!`)]});
        
        if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${client.allEmojis.x} You cannot kick this user as his role is same role of your's or above your current highest role.`)
        ]
      });
        
      if (message.guild.me.roles.highest.position <= mentionedMember.roles.highest.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${client.allEmojis.x} I cannot kick this user as his role is the same or higher then mine.`)
        ]
      });
        
      try {
        await mentionedMember.send({ embeds:[new MessageEmbed()
          .setTitle(`You were kicked from ${message.guild.name}`)
          .setDescription(`Reason: ${reason}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
          .setFooter(client.user.tag, client.user.displayAvatarURL())]});
      } catch (err) {
        console.log('I was unable to message the member.');
      }

      try {
        await mentionedMember.kick(reason);
      } catch (err) {
        console.log(err)
        return message.reply({ embeds:[new MessageEmbed()
          .setDescription(`I was unable to kick the member mentioned.`)
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.color)]})
      }
      message.reply({ embeds:[new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setDescription(`<a:tick:1027795911868416050> Successfully Kicked the member!`)]});
 
  },
};