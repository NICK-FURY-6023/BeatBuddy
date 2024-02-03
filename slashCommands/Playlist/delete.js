const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
    name: "delete",
    description: "Delete your saved playlist.",
    usage: "<playlist name>",
    player: false,
      category:"Playlist",
    inVoiceChannel: false,
    sameVoiceChannel: false,
    options: [
        {
            name: "name",
            description: "Playlist Name",
            required: true,
            type: "STRING"
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {

        await interaction.deferReply({});

        const Name = interaction.options.getString("name").replace(/_/g, ' ');
        const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });

        if (!data) {
            return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`<a:dinowrong:989898494313635870> You don't have a playlist called **${Name}**.`)] });
        }

        if (data.length == 0) {
            return interaction.editReply({ embeds: [new MessageEmbed().setColor(client.embedColor).setDescription(`<a:dinowrong:989898494313635870> You don't have a playlist called **${Name}**.`)] });
        }

        await data.delete();
        const embed = new MessageEmbed()
          .setColor("#FF00FF")
            .setDescription(`<a:dinoyes:992060104792866816> Successfully deleted ${Name} playlist`)
        return interaction.editReply({ embeds: [embed] })
    }
}