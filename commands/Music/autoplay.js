
const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");

module.exports = {
    name: "autoplay",
    aliases: ["ap"],
    category: "Settings",
    description: "Toggle autoplay in this server!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
   execute: async (message, args, client, prefix) => {
     const em1 = new MessageEmbed()

      if (!message.member.permissions.has('MANAGE_GUILD') && !'839054691626909696'.includes(message.author.id)) return message.reply('You must have `Manage Guild` permission to use this command.');

        const player = message.client.manager.get(message.guild.id);


          let data = await client.db.get(`auto_${message.guild.id}`);
  if(!data)
  {
    client.db.set(`auto_${message.guild.id}`, `false`)
  }

        const emojireplay = message.client.emoji.autoplay;

        if (data === `false`) {
          client.db.set(`auto_${message.guild.id}`, `true`)
            return message.reply(`Autoplay mode is now **enabled** in this server.`);
  
        } else {
          client.db.set(`auto_${message.guild.id}`, `false`)
            return message.reply(`Autoplay mode is now **disabled** in this server.`);
               
        }
   }
};