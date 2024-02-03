const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require("../../botconfig/emojis.json");

module.exports = {
    name: "settings",
    category: "Settings",
    aliases: ["ms"],
    description: "Shows the server settings.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
       if (!message.member.permissions.has('MANAGE_GUILD') && !'701643179212013568'.includes(message.author.id)) return message.channel.send({embeds: [new MessageEmbed().setColor("#000000").setDescription('You must have `Manage Guild` permission to use this command.')]});
      let vc;
      let ap = await client.db.get(`auto_${message.guild.id}`)
      let tw = await client.db.get(`247_${message.guild.id}`)
      if(tw === "true") vc = await client.db.get(`vcid_${message.guild.id}`)
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL())
    .setColor("#000000")
    .setFooter(ee.footertext, ee.footericon);

  // Guild prefix
  embed.addField("Server Prefix", `\`${prefix}\``, true);


  if(tw === `true`){
      embed.addField(`<a:online:1026095741179007056> 24/7 VC`, `<#${vc}>`,true)
    }

embed.addField(`<a:online:1026095741179007056> 24/7`, tw === `true`? `<a:tick:1027795911868416050> \`Enabled\`` : `<a:cross:1027796062452322304> \`Disabled\``, true);
embed.addField(`<a:autoplay:1026255710058709114> Autoplay`, ap === `true`? `<a:tick:1027795911868416050> \`Enabled\`` : `<a:cross:1027796062452322304> \`Disabled\``, true);
    
      embed.addField(`<a:ga_dj:1040528782370537492> DJ Commands`,  `\`\`\`clearqueue, leave, loop, remove, fix, shuffle, skip, skipto, stop\`\`\``);
    


      // send embed
      message.channel.send({embeds: [embed]})
       }
}
