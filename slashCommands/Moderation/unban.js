
const { MessageEmbed, MessageActionRow, MessageButton, } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "unban",
        description: "Member unban time",
  category: 'Moderation',
 options: [
            {
              type: "USER",
              name: "member",
              description: "Member to Unban",
              required: true
            }
          ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
     if (!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply("**You Don't Have The Permission To Unban Users!**");
            if (!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply("**I Don't Have The Permission To Unban Users!**");

            const userID = interaction.options.getUser('member');
            let bannedMember;
            
            try {
                bannedMember = await interaction.guild.bans.fetch(userID);
            } catch {
                return interaction.reply("**Please Provide A Valid User Or ID Or The User Is Not Banned!**");
            };

            try {
                await interaction.guild.bans.remove(bannedMember.user.id);
            } catch {
                return interaction.reply(`Couldn't Unban ${bannedMember}`);
            };

            const banEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(bannedMember.user.username, bannedMember.user.displayAvatarURL({ dynamic: true }))
                .setDescription(`**${bannedMember.user.tag} Has Been Unbanned From ${interaction.guild.name}**`)
                .setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp();
            return interaction.reply({ embeds: [banEmbed] });
         },
};