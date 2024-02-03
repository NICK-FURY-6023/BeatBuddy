const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'support',
  category: 'Info',
  aliases: [],
  description: 'Gives you the link of our support server',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

 
    await message.channel.send("https://discord.gg/fz8QMYdVDq");
  },
};