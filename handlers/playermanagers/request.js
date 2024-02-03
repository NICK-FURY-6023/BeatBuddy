var {
  MessageEmbed,
  Permissions
} = require("discord.js")
var ee = require(`${process.cwd()}/botconfig/embed.json`)
var config = require(`${process.cwd()}/botconfig/config.json`)
var {
  format,
  delay,
  arrayMove
} = require(`../../handlers/functions`)

//function for playling song
async function request(client, message, args, type, slashCommand) {
  
  var search = args.join(" ");
  var res;
  var player = client.manager.players.get(message.guild.id);
  //if no node, connect it 
  if (player && player.node && !player.node.connected) await player.node.connect()
  //if no player create it
  if (!player) {
    player = await client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true,
    });
    if (player && player.node && !player.node.connected) await player.node.connect()
  }
  let state = player.state;
  if (state !== "CONNECTED") {
    //set the variables
    player.set("message", message);
    player.set("playerauthor", message.author.id);
    player.connect();
    player.stop();
  }
   if (type.split(":")[1] === "youtube" || type.split(":")[1] === "soundcloud") {
      if (isValidURL(search)) {
        res = await client.manager.search({
          query: search,
          source: "youtube music"
        }, message.author);
      } else {
        res = await client.manager.search({
          query: search,
          source: "youtube music"
        }, message.author);
      }
    } else {
      res = await client.manager.search(search, message.author);
    }
    
  
  // Check the load type as this command is not that advanced for basics
  if (res.loadType === "LOAD_FAILED") {
    throw res.exception;
  } else if (res.loadType === "PLAYLIST_LOADED") {
    playlist_()
  } else {
    song()
  }
  //function for calling the song
  async function song() {
    //if no tracks found return info msg
    if (!res.tracks[0]) {
      if (slashCommand && slashCommand.isCommand())
        return slashCommand.reply({
          ephemeral: true,
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
            .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["request"]["variable1"]))
          ]
        }).catch(() => {})
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
          .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["request"]["variable1"]))
        ]
      }).catch(() => {}).then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => {})
        }, 3000)
      })
    }
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    } else if (!player.queue || !player.queue.current) {
      //add track
      player.queue.add(res.tracks[0]);
      //play track
      player.play();
      player.pause(false);
    }
    //otherwise
    else {
      //add track
      player.queue.add(res.tracks[0]);
    }
    //Update the Music System Message - Embed
    updateMusicSystem(player);
  }
  //function for playist
  async function playlist_() {
    if (!res.tracks[0]) {
      if (slashCommand && slashCommand.isCommand())
        return slashCommand.reply({
          ephemeral: true,
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
            .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["request"]["variable2"]))
          ]
        }).catch(() => {})
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setTitle(String("❌ Error | Found nothing for: **`" + search).substr(0, 256 - 3) + "`**")
          .setDescription(eval(client.la[ls]["handlers"]["playermanagers"]["request"]["variable2"]))
        ]
      }).catch(() => {}).then(msg => {
        setTimeout(() => {
          msg.delete().catch(() => {})
        }, 3000)
      })
    }
    //if the player is not connected, then connect and create things
    if (player.state !== "CONNECTED") {
      //set the variables
      player.set("message", message);
      player.set("playerauthor", message.author.id);
      player.connect();
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
      player.pause(false);
    } else if (!player.queue || !player.queue.current) {
      //add track
      player.queue.add(res.tracks);
      //play track
      player.play();
      player.pause(false);
    } else {
      player.queue.add(res.tracks);
    }
    //Update the Music System Message - Embed
    updateMusicSystem(player);
  }
     async function updateMusicSystem(player, leave = false) {
    if (client.musicsetup.get(`music_${player.guild}`, "channel") && client.musicsetup.get(`music_${player.guild}`, "channel").length > 5) {
      let messageId = client.musicsetup.get(`music_${player.guild}`, "message");
      let guild = client.guilds.cache.get(player.guild);
      if (!guild) return;
      let channel = guild.channels.cache.get(client.musicsetup.get(`music_${player.guild}`, "channel"));
      if (!channel) channel = await guild.channels.fetch(client.musicsetup.get(`music_${player.guild}`, "channel")).catch(() => {}) || false
      if (!channel) return;
      if (!channel.permissionsFor(channel.guild.me).has(Permissions.FLAGS.SEND_MESSAGES)) return;
      let message = channel.messages.cache.get(messageId);
      if (!message) message = await channel.messages.fetch(messageId).catch(() => {}) || false;
      if (!message) return;
      var data = require(`../erela_events/musicsystem`).generateQueueEmbed(client, player.guild, leave)
      message.edit(data).catch((e) => {
        console.log(e)
      })
    }
  };
    
   async function isValidURL(string) {
  const args = string.split(" ");
  let url;
  for (const arg of args) {
    try {
      url = new URL(arg);
      url = url.protocol.includes("http:") || url.protocol.includes("https:");
      break;
    } catch (_) {
      url = false;
    }
  }
  return url;
};
}

module.exports = request;
/**
 
