const { MessageEmbed, CommandInteraction, Client, MessageActionRow, MessageButton } = require("discord.js");
const db = require("../../schema/playlist");
const lodash = require("lodash");
module.exports = {
    name: "list",
    description: "To List The Playlist.",
    player: false,
  category:"Playlist",
    inVoiceChannel: false,
    sameVoiceChannel: false,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

     
        let data = await db.find({ UserId: interaction.user.id});
        if (!data.length) {
            return interaction.reply({ embeds: [new MessageEmbed().setColor("#2F3136").setDescription(`<:ERROR:976004129430315079> You don't have any Playlist.`)] });
        }
           const embeds = new MessageEmbed()
          data.map((x, i) => embeds.addField(`**<a:dinoyes:992060104792866816> Playlist: ${++i} | Name: ${x.PlaylistName}**`, `**Tracks: ${x.Playlist.length} | Created On: <t:${x.CreatedOn}> (<t:${x.CreatedOn}:R>)**`))
              embeds.setAuthor(`${interaction.user.username}'s Playlists`)
              embeds.setColor("#2F3136");
            return await interaction.reply({ embeds: [embeds] });

    }
};