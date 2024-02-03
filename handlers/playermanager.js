const Discord = require("discord.js")
const {
  MessageEmbed
} = require("discord.js")
const config = require(`${process.cwd()}/botconfig/config.json`)
ee = require(`${process.cwd()}/botconfig/embed.json`)
const {
  format,
  delay,
  arrayMove
} = require(`./functions`)
module.exports = async (client, message, args, type, slashCommand = false, extras = false) => {
  let method = type.includes(":") ? type.split(":") : Array(type)
  if (!message.guild) return;
  
  //just visual for the console
  
 

  let { channel } = message.member.voice;
    if(!channel) return;
  let botchannel = message.guild.me.voice.channel;
  const permissions = channel.permissionsFor(client.user);

  if (!permissions.has("CONNECT")){
    if(slashCommand) 
      return slashCommand.reply({ephemeral: true, embeds: [new MessageEmbed()
        .setColor("RANDOM")
        .setFooter("GALAXY")
        .setTitle("\"I need permissions to join your channel\"")
      ]}).catch((e)=>console.log(String(e).grey));
    return message.reply({embeds: [new MessageEmbed()
      .setColor("RANDOM")
       .setFooter("GALAXY")
           .setTitle("\"I need permissions to join your channel\"")
    ]}).catch((e)=>console.log(String(e).grey));
  }
  if (!permissions.has("SPEAK")){
    if(slashCommand) 
      return slashCommand.reply({ephemeral: true, embeds: [new MessageEmbed()
       .setColor("RANDOM")
       .setFooter("GALAXY")
        .setTitle("\"<a:cross:1027796062452322304> I need permissions to speak in your channel\"")
      ]}).catch((e)=>console.log(String(e).grey));
    return message.reply({embeds: [new MessageEmbed()
 .setColor("RANDOM")
       .setFooter("GALAXY")
      .setTitle("\"<a:cross:1027796062452322304> I need permissions to speak in your channel\"")
    ]}).catch((e)=>console.log(String(e).grey));
  }
  if(botchannel && channel.userLimit != 0 && channel.full){
    if(slashCommand)  return slashCommand.reply({embeds: [new MessageEmbed().setTitle(":x: Your Voice Channel is full!").setColor("RANDOM").setFooter("GALAXY")]}).catch(()=>{});
    return message.reply({embeds: [new MessageEmbed().setTitle(":x: Your Voice Channel is full!").setColor("RANDOM").setFooter("GALAXY")]}).catch(()=>{});
  }
  if (method[0] === "song")
    require("./playermanagers/song")(client, message, args, type, slashCommand, extras); 
  else if (method[0] === "request")
    require("./playermanagers/request")(client, message, args, type, slashCommand);  
  else if (method[0] === "playlist")
    require("./playermanagers/playlist")(client, message, args, type, slashCommand);
  else if (method[0] === "similar")
    require("./playermanagers/similar")(client, message, args, type, slashCommand);
  else if (method[0] === "search")
    require("./playermanagers/search")(client, message, args, type, slashCommand);
  else if (method[0] === "skiptrack")
    require("./playermanagers/skiptrack")(client, message, args, type, slashCommand); 
  else if (method[0] === "playtop")
    require("./playermanagers/playtop")(client, message, args, type, slashCommand)
  else {
    if(slashCommand) 
      return slashCommand.reply({ephemeral: true, embeds: [new MessageEmbed()
       .setColor("RANDOM")
       .setFooter("GALAXY")
        .setTitle("\"<a:cross:1027796062452322304> No valid search Term? ... Please Contact: `ᴠᴀʏᴜ | ＱＵＴＹＰＩＥ<3`\"")
      ]}).catch((e)=>console.log(String(e).grey));
    return message.reply({embeds: [new MessageEmbed()
     .setColor("RANDOM")
       .setFooter("GALAXY")
      .setTitle("\"<a:cross:1027796062452322304> No valid search Term? ... Please Contact: `ᴠᴀʏᴜ | ＱＵＴＹＰＩＥ<3`\"")
    ]}).catch((e)=>console.log(String(e).grey));
  }
}
/**
 
 */
