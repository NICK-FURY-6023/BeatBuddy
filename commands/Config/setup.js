const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("../../schema/music_setup");
module.exports = {
    name: "setup",
    category: 'Settings',
    description: "Setup the music channel",
    args: false,
    usage: "",
    aliases: ["setup"],
    userPrams: ['MANAGE_CHANNELS'],
    botPrams: ['EMBED_LINKS', 'MANAGE_CHANNELS'],
    owner: false,
    execute: async (message, args, client, prefix) => {
        let color = client.config.embedColor;
    if(["clear", "remove", "delete"].includes(args[0])) {
          if(!client.musicsetup.get(`music_${message.guild.id}`)) {
         return message.reply({content: `There is no music setup in this guild yet!`})
     } 
          await client.musicsetup.delete(`music_${message.guild.id}`)
         console.log(client.musicsetup.get(`music_${message.guild.id}`))
          return message.reply({content: `Music setup Data got deleted successfully!`})
      }
        if(client.musicsetup.get(`music_${message.guild.id}`)) {
            return message.reply({content: `Music setup is already there!`})
        }
        var buttons = [
      new MessageActionRow().addComponents([
        new MessageButton().setStyle('SECONDARY').setCustomId('Skip').setEmoji(`⏭️`).setDisabled(),
        new MessageButton().setStyle('SECONDARY').setCustomId('Stop').setEmoji(`⏹️`).setDisabled(),
        new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸️').setDisabled(),
        new MessageButton().setStyle('SECONDARY').setCustomId('Autoplay').setEmoji('🔄').setDisabled(),
        new MessageButton().setStyle('SECONDARY').setCustomId('Shuffle').setEmoji('🔀').setDisabled(),
      ])
    ]
        
         message.guild.channels.create(`🎵 ${client.user.username} requests`, {
                      type: "GUILD_TEXT", 
                      rateLimitPerUser: 6,
                      topic: `Request a track in here and enojy the spice quality!`,
                      permissionOverwrites: [
                        {
                          id: message.guild.id,
                          allow: [
                            "VIEW_CHANNEL",
                            "SEND_MESSAGES",
                            "ADD_REACTIONS",
                          ],
                        },
                        {
                          id: client.user.id,
                          allow: [
                            "MANAGE_MESSAGES",
                            "MANAGE_CHANNELS",
                            "ADD_REACTIONS",
                            "SEND_MESSAGES",
                          ],
                        },
                      ],
                    }).then((ch)  => {
    ch.send({embeds: [new MessageEmbed().setTitle("> **Join any voice channel to listen our spice quality of music**").setColor(`${color}`).setImage("https://cdn.discordapp.com/attachments/1044371003880505346/1045124454440767558/IMG_20221124_052044.jpg")], components: buttons }).then(msg => {
        client.musicsetup.set(`music_${message.guild.id}`, ch.id, "channel");
        client.musicsetup.set(`music_${message.guild.id}`, msg.id, "message");
      return message.reply({content:`> **Alright, i've created the music player in ** <#${ch.id}>`})
    });
    })
        
    }
}