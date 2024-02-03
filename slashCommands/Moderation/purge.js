
const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "purge",
        description: "Purge Messages",
  category: 'Moderation',
 options: [
            {
              type: "NUMBER",
              name: "amount",
              description: "Amount of Messages",
              required: true
            },
                 {
              type: "STRING",
              name: "phrase",
              description: "Phrase to Delete",
              required: false
            }
          ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
     if (!interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply("**You Don't Have The Permission To Purge Text!**");
            if (!interaction.guild.me.permissions.has("MANAGE_MESSAGES")) return interaction.reply("**I Don't Have The Permission To Purge Text!**");

            const amount = interaction.options.getNumber('amount');
            const phrase = interaction.options.getString('phrase');

            if (isNaN(amount)) return interaction.reply('**Please Supply A Valid Amount To Delete Messages!**');

            if (amount > 100) return interaction.reply("**Please Supply A Number Less Than 100!**");
            if (amount < 1) return interaction.reply("**Please Supply A Number More Than 1!**");

            if (!phrase) {
                interaction.channel.bulkDelete(amount, { filterOld: true }).then(async (messages) => {
                    await interaction.reply(`**Succesfully deleted \`${messages.size}/${amount}\` messages**`);
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 2000);
                }).catch(() => null);
            } else {
                interaction.channel.bulkDelete(
                    (await interaction.channel.messages.fetch({ limit: amount })).filter(filteredMsg => filteredMsg.content.toLowerCase() === phrase.toLowerCase()), { filterOld: true }
                ).then(async (messages) => {
                    await interaction.reply(`**Succesfully deleted \`${messages.size}/${amount}\` messages**`);
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 2000);
                }).catch(() => null);
            }
         },
};