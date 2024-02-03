const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const config = require(`../../botconfig/config.json`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require("../../botconfig/emojis.json");
const ms = require("ms");
module.exports = {
    name: "add-role",
    category: "Moderation",
    aliases: [ "addrole" ],
    description: "add role to someone",
    args: false,
    usage: "",
    permission: ["MANAGE_ROLES"],
    owner: false,
    execute: async (message, args, client, prefix) => {
        if (!message.member.permissions.has('MANAGE_ROLES') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Manage Roles` permission to use this command.')]});
        
  const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

      if (!args[0]) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.mediancolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(` You must mention a member to give the role.`)
        ]
      });
      if (!mentionedMember) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(` The member mentioned is not in the server.`)
        ]
      });/*
      if (mentionedMember.roles.highest.position >= message.member.roles.highest.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`${client.allEmojis.x} You cannot add roles to this user as thier role is the same or higher then yours.`)
        ]
      });*/
      if (!args[1]) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.mediancolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(` You must mention a role to give to the member mentioned.`)
        ]
      });
      if (!role) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`The role mention does not exist.`)
        ]
      });
        
      if (message.member.roles.highest.position <= role.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`You cannot give this role as it is the same or above your current highest role.`)
        ]
      });
      if (message.guild.me.roles.highest.position <= role.position) return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`I cannot add this roles as this role is the same or higher then mine.`)
        ]
      });
      await mentionedMember.roles.add(role.id).catch(err => console.log(err));
      await message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setDescription(`<a:tick:1027795911868416050> Successfully Added ${role} to ${mentionedMember}.`)
        ]
      })
  },
};