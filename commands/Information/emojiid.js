const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'emojiid',
  category: 'Utility',
  aliases: [],
  description: 'Get ID of emojis',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: [],
  owner: false,
  execute: async (message, args, client, prefix) => {
 const name = args.join(" ");
    const emoji = message.guild.emojis.cache.find((r) => r.name === name);
    if (!name) {
      return message.channel.send("Please type the emoji name");
    }
    if (!emoji) {
      return message.channel.send(
        "Couldn't find the Emojis with the provided name. Please make sure the Emoji name is correct"
      );
    }
    await message.channel.send(`\`\`\`${emoji}\`\`\``);
  },
};