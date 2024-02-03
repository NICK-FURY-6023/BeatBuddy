const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const ee = require(`../../botconfig/embed.json`);
module.exports = {
    name: "invite",
    category: "Info",
    aliases: [ "addme", "links", "inv"],
    description: "Shows Skyfall music official invite link!",
    args: false,
    usage: "",
    permission: [],
    owner: false,
   execute: async (message, args, client, prefix) => {
         
         
  const row = new MessageActionRow()
			.addComponents(
    new MessageButton()
    .setLabel("GALAXY")
    .setStyle("LINK")
                  .setEmoji("1040662470064361582")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=1044596050859663401&permissions=2151008320&scope=bot`),
                 new MessageButton()
    .setLabel("VAYU RHYTHM")
    .setStyle("LINK")
                  .setEmoji("1021102720570114068")
    .setURL(`https://top.gg/bot/1044596050859663401/vote`),
              
              
    new MessageButton()
    .setLabel("Support Server")
    .setStyle("LINK")
                .setEmoji("981412296146440282")
    .setURL("https://discord.gg/Rqdx38Gdfn")
			);

           message.channel.send({components: [row]})
    }
}
