const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const { check_if_dj, autoplay, escapeRegex, format, duration, createBar } = require("../../handlers/functions");
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const playermanager = require("../../handlers/playermanager");

//we need to create the music system, somewhere...
module.exports = client => {
    let color = client.config.embedColor;
    client.on("interactionCreate", async (interaction) => {
        if(!interaction?.isButton()) return;
        var { guild, message, channel, member, user } = interaction;
        if(!guild) guild = client.guilds.cache.get(interaction?.guildId);
        if(!guild) return;
        if(!client.db.get(`music_${guild.id}`)) return;
        let data = await client.musicsetup.get(`music_${guild.id}`)
        var musicChannelId = data.channel;
        var musicChannelMessage = data.message;
        //if not setupped yet, return
        if(!musicChannelId || musicChannelId.length < 5) return;
        if(!musicChannelMessage || musicChannelMessage.length < 5) return;
        //if the channel doesnt exist, try to get it and the return if still doesnt exist
        if(!channel) channel = guild.channels.cache.get(interaction?.channelId);
        if(!channel) return;
        //if not the right channel return
        if(musicChannelId != channel.id) return;
        //if not the right message, return
        if(musicChannelMessage != message.id) return;

        if(!member) member = guild.members.cache.get(user.id);
        if(!member) member = await guild.members.fetch(user.id).catch(() => {});
        if(!member) return;
        
        if (!member.voice.channel)
            return interaction?.reply({
                content: `**Join a Voice Channel first!**`,
                ephemeral: true
            })      
            
        var player =  message.client.manager.get(message.guild.id);
        if (!player || !player.queue || !player.queue.current)
            return interaction?.reply({content: "Nothing Playing yet", ephemeral: true})
                        
        if (player && member.voice.channel.id !== player.voiceChannel)
            return interaction?.reply({
                content: `**Iam already connected to <#${player.voiceChannel}>**`,
                ephemeral: true
            })
        
        switch(interaction?.customId){
            
            case "Skip": {
                if (player && player.queue.current && !player.queue || player.queue.length === 0) {
                    if(client.db.get(`auto_${message.guildId}`) === `true`) {
                             const previoustrack = player.get("previoustrack") || player.queue.current || player.queue.previous;
           if (!previoustrack) return;
        const requester = previoustrack.requester;
        const search = `https://music.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
        player.set("requester", client.user)
        response = await player.search(search, client.user);
		player.queue.add(response.tracks[Math.floor(Math.random() * Math.floor(response.tracks.length))]);
                        interaction?.reply({
                  embeds: [new MessageEmbed()
                  .setColor(color)
                  .setTimestamp()
                  .setDescription(`**Skipped to the next Song!**`)]
                })
                       return player.stop()
                    }
                    interaction?.reply({
                        embeds: [new MessageEmbed()
                        .setColor(color)
                        .setTimestamp()
                        .setDescription(`**Player destroyed and left the channel!**`)]
                    })
                    await player.destroy()
                    //edit the message so that it's right!
                    var data4 = generateQueueEmbed(client, guild.id, true)
                    message.edit(data4).catch((e) => {
                    //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                    })
                    return
                }
                //skip the track
                await player.stop();
                interaction?.reply({
                  embeds: [new MessageEmbed()
                  .setColor(color)
                  .setTimestamp()
                  .setDescription(`**Skipped the Song!**`)]
                })
                //edit the message so that it's right!
                var data5 = generateQueueEmbed(client, guild.id)
                message.edit(data5).catch((e) => {
                  //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                })
            }break;
            case "Stop": {
                //Stop the player
                interaction?.reply({
                  embeds: [new MessageEmbed()
                  .setColor(color)
                  .setTimestamp()
                  .setDescription(`**Destroyed the player and left the channel**`)]
                }) 
                await player.destroy()
                //edit the message so that it's right!
                var data6 = generateQueueEmbed(client, guild.id, true)
                message.edit(data6).catch((e) => {
                  //console.log(e.stack ? String(e.stack).grey : String(e).grey)
                })
            }break;
                case "queue": {
          
    const tracks = player.queue;
    var maxTracks = 10; 
    var songs = tracks.slice(0, maxTracks);
     let embeds = new MessageEmbed()
    .setTitle(`Queue length:  [ ${player.queue.length} Tracks ]`)
      .setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
    .setColor(color)
    .setDescription(String(songs.map((track, index) => `**\` ${++index}. \` ${track.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\` - [**${track.requester.tag}**]`).join(`\n`)).substr(0, 2048));
         embeds.addField(`**PLAYING NOW: **`, `**${player.queue.current.uri ? `[${player.queue.current.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${player.queue.current.uri})` : player.queue.current.title}** - \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(` | `)[0]}\` - [**${player.queue.current.requester.tag}**]`)
    if(player.queue.length > 10)
      embeds.addField(`**\` Next. \` *${player.queue.length > maxTracks ? player.queue.length - maxTracks : player.queue.length} other Tracks ...***`, `\u200b`)
          .setDescription(String(songs.map((track, index) => `**\` ${++index}. \` ${track.uri ? `[${track.title.substr(0, 60).replace(/\[/igu, "\\[").replace(/\]/igu, "\\]")}](${track.uri})` : track.title}** - \`${track.isStream ? `LIVE STREAM` : format(track.duration).split(` | `)[0]}\` - [**${track.requester.tag}**]`).join(`\n`)).substr(0, 2048))
          return interaction.reply({embeds: [embeds], ephemeral: true})
      }
      break;
                case "Shuffle": {
      
        player.queue.shuffle();
        interaction.reply({
          embeds: [new MessageEmbed()
            .setColor(color)
            .setTimestamp()
            .setDescription(`**Now the queue will shuffle!**`)
          ]
        })
        var data56 = generateQueueEmbed(client, guild.id)
        message.edit(data56).catch((e) => {
        })
      }
      break;
            case "Pause": {
                if (!player.playing){
                    player.pause(false);
                    interaction?.reply({
                      embeds: [new MessageEmbed()
                      .setColor(color)
                      .setTimestamp()
                      .setDescription(`**Song Resumed!**`)]
                    })
                  } else{
                    //pause the player
                    player.pause(true);

                    interaction?.reply({
                      embeds: [new MessageEmbed()
                      .setColor(color)
                      .setTimestamp()
                      .setDescription(`**Song Paused!**`)]
                    })
                  }
                  var data7 = generateQueueEmbed(client, guild.id)
                  message.edit(data7).catch((e) => {
                  console.log(e)
                  })
            }
                break;
        }
        
    })

    client.manager
      .on("playerMove", async (player, oldChannel, newChannel) => {
      if (!newChannel) {
        await player.destroy();
      } else {
        player.voiceChannel = newChannel;
        if (player.paused) return;
        setTimeout(() => {
          player.pause(true);
          setTimeout(() => player.pause(false), client.ws.ping * 2);
        }, client.ws.ping * 2);
      }
    })
    .on("playerDestroy", async (player) => {
      
      if(player.textChannel && player.guild){
        
        if(client.musicsetup.get(`music_${player.guild}`, "channel") && client.musicsetup.get(`music_${player.guild}`, "channel").length > 5){
          let messageId = client.musicsetup.get(`music_${player.guild}`, "message");
          let guild = client.guilds.cache.get(player.guild);
          if(!guild) return 
          let channel = guild.channels.cache.get(client.musicsetup.get(`music_${player.guild}`, "channel"));
          if(!channel) return 
          let message = channel.messages.cache.get(messageId);
          if(!message) message = await channel.messages.fetch(messageId).catch(()=>{});
          if(!message) return
         var data = generateQueueEmbed(client, player.guild, true)
          message.edit(data).catch(() => {})
          if(client.musicsetup.get(`music_${player.guild}`, "channel") == player.textChannel){
            return;
          }
        }
      }
      
    })
    .on("trackStart", async (player, track) => {
      try {
        
        if(client.musicsetup.get(`music_${player.guild}`, "channel") && client.musicsetup.get(`music_${player.guild}`, "channel").length > 5){
          let messageId = client.musicsetup.get(`music_${player.guild}`, "message");
          let guild = client.guilds.cache.get(player.guild);
          if(!guild) return 
          let channel = guild.channels.cache.get(client.musicsetup.get(`music_${player.guild}`, "channel"));
          if(!channel) return 
          let message = channel.messages.cache.get(messageId);
          if(!message) message = await channel.messages.fetch(messageId).catch(()=>{});
          if(!message) return
          var data = generateQueueEmbed(client, player.guild)
          message.edit(data).catch(() => {})
          if(client.musicsetup.get(`music_${player.guild}`, "channel") == player.textChannel){
            return;
          }
        }
        } catch (e) {
        console.log(e) /* */
      }
    })
    .on("trackStuck", async (player, track, payload) => {
      await player.stop();
      if(player.textChannel){
       
        if(client.musicsetup.get(`music_${player.guild}`, "channel") && client.musicsetup.get(`music_${player.guild}`, "channel").length > 5){
          let messageId = client.musicsetup.get(`music_${player.guild}`, "message");
          let guild = client.guilds.cache.get(player.guild);
          if(!guild) return 
          let channel = guild.channels.cache.get(client.musicsetup.get(`music_${player.guild}`, "channel"));
          if(!channel) return 
          let message = channel.messages.cache.get(messageId);
          if(!message) message = await channel.messages.fetch(messageId).catch(()=>{});
          if(!message) return
          //edit the message so that it's right!
          var data = generateQueueEmbed(client, player.guild)
          message.edit(data).catch(() => {})
          if(client.musicsetup.get(`music_${player.guild}`, "channel") == player.textChannel){
            return;
          }
        }
      }
    })
    .on("trackError", async (player, track, payload) => {
      await player.stop();
      if(player.textChannel){
        
        if(client.musicsetup.get(`music_${player.guild}`, "channel") && client.musicsetup.get(`music_${player.guild}`, "channel").length > 5){
          let messageId = client.musicsetup.get(`music_${player.guild}`, "message");
          let guild = client.guilds.cache.get(player.guild);
          if(!guild) return 
          let channel = guild.channels.cache.get(client.musicsetup.get(`music_${player.guild}`, "channel"));
          if(!channel) return 
          let message = channel.messages.cache.get(messageId);
          if(!message) message = await channel.messages.fetch(messageId).catch(()=>{});
          if(!message) return
          //edit the message so that it's right!
          var data = generateQueueEmbed(client, player.guild)
          message.edit(data).catch(() => {})
          if(client.musicsetup.get(`music_${player.guild}`, "channel") == player.textChannel){
            return;
          }
        }
      }
    })
    .on("queueEnd", async (player, track, payload) => {
            

	let guild = client.guilds.cache.get(player.guild);
	if (!guild) return;

try {
        if(player.get('nowplayingMSG').deletable){
           await player.get('nowplayingMSG').delete();
    }
    }catch(err)  { 
    
  }

         try {
          let autoplay;
        if (player && !player.queue.current && !player.queue || player.queue.length === 0) {
          if(client.musicsetup.get(`music_${player.guild}`, "channel") && client.musicsetup.get(`music_${player.guild}`, "channel").length > 5){
            let messageId = client.musicsetup.get(`music_${player.guild}`, "message");
            let guild = client.guilds.cache.get(player.guild);
            if(!guild) return 
            let channel = guild.channels.cache.get(client.musicsetup.get(`music_${player.guild}`, "channel"));
            if(!channel) return 
            let message = channel.messages.cache.get(messageId);
            if(!message) message = await channel.messages.fetch(messageId).catch(()=>{});
            if(!message) return

        const emojiwarn = client.emoji.warn;
	let thing = new MessageEmbed()
		.setColor(client.embedColor)
		.setAuthor(`Queue Concluded`,client.user.displayAvatarURL())
	channel.send({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) });
                   var data = generateQueueEmbed(client, player.guild, false)
                   message.edit(data).catch(() => {}) 
                   return;
    
            //edit the message so that it's right!
            var data = generateQueueEmbed(client, player.guild, true)
            message.edit(data).catch(() => {})
          }
          
        }
      } catch (e) {
        console.log(e);
      }
    })
    
    client.on("messageCreate", async message => {
    
        if(!message.guild) return;
       if(!client.musicsetup.get(`music_${message.guild.id}`)) return;
        var datal = await client.musicsetup.get(`music_${message.guild.id}`)
        var musicChannelId = datal.channel;
        //if not setupped yet, return
        if(!musicChannelId) return;
        
        //if not the right channel return
        if(musicChannelId != message.channel.id) return;
            
        
         //getting the Voice Channel Data of the Message Member
        const { channel } = message.member.voice;
       
        //Delete the message once it got sent into the channel, bot messages after 5 seconds, user messages instantly!
        if (message.author.id === client.user.id) 
            setTimeout(()=>{
              try{
                message.delete().catch(() => {
                  setTimeout(()=>{
                    try{message.delete().catch((e) => {console.log(e)});}catch(e){ console.log(e)}}, 5000)});}catch(e){setTimeout(()=>{try{message.delete().catch((e) => {console.log(e)});}catch(e){ console.log(e)}}, 3000)}}, 3000)
        else 
            {
            setTimeout(()=>{
                try{
                message.delete().catch(() => {})
                  }catch(e){ }
            }, 3000);
                if (message.author.bot) return;
                      //if not in a Voice Channel return!
        if (!channel) return message.channel.send("**Join any voice channel first!**").then(msg=>{setTimeout(()=>{try{msg.delete().catch(() => {});}catch(e){ }}, 3000)})
        //get the lavalink erela.js player information
        const player =  message.client.manager.get(message.guild.id);
        //if there is a player and the user is not in the same channel as the Bot return information message
        if (player && channel.id !== player.voiceChannel) return message.channel.send(`**Iam already connected to <#${player.voiceChannel}>**`).then(msg=>{setTimeout(()=>{try{msg.delete().catch(() => {});}catch(e){ }}, 3000)})
            }
      
      
       var prefix = await client.db.get(`prefix_${message.guild.id}`) || ">>";
        //get the prefix regex system
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`); //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
        var args;
        var cmd;
        if (prefixRegex.test(message.content)) {
            //if there is a attached prefix try executing a cmd!
            const [, matchedPrefix] = message.content.match(prefixRegex); //now define the right prefix either ping or not ping
            args = message.content.slice(matchedPrefix.length).trim().split(/ +/); //create the arguments with sliceing of of the rightprefix length
            cmd = args.shift().toLowerCase(); //creating the cmd argument by shifting the args by 1
           
            var command = client.commands.get(cmd); //get the command from the collection
            if (!command) command = client.commands.get(client.aliases.get(cmd)); //if the command does not exist, try to get it by his alias
            if (command) //if the command is now valid
            {
                return message.channel.send("**Don't use commands here!**").then(msg=>{setTimeout(()=>{try{msg.delete().catch(() => {});}catch(e){ }}, 3000)})
            }
        }
        
        else {
            if (message.author.bot) return;
        if(client.user.id === message.author.id) return;
            return playermanager(client, message, message.content.trim().split(/ +/), "request:spotify");
        }
    })


}
function generateQueueEmbed(client, guildId, leave){
    let guild = client.guilds.cache.get(guildId)
    if(!guild) return;
    var embeds = [
     new MessageEmbed()
          .setTitle("> **Join any voice channel to listen our spice quality of music**")
        .setFooter({ text: "VAYU ESPORTS" })
        .setColor(`${client.config.embedColor}`)
        .setImage("https://cdn.discordapp.com/attachments/1045433468512915456/1047366483237404772/VAYU_ESPORTS.gif")
    ]
    const player =  client.manager.get(guild.id);
   
    var stop = new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji(`981500247614324806`).setDisabled()
    var skip = new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji(`995322731002335312`).setDisabled()
    var pause = new MessageButton().setStyle('SUCCESS').setCustomId('Pause').setEmoji('988409341784768533').setDisabled()
     var queue = new MessageButton().setStyle('SECONDARY').setCustomId('queue').setEmoji('📑').setDisabled()
     var shuffle = new MessageButton().setStyle('SECONDARY').setCustomId('Shuffle').setEmoji('1026255710058709114').setDisabled()
    if(!leave && player && player.queue && player.queue.current){
        embeds[0].setTitle("Current Status: Playing...")
    .setDescription(`Playing: [${player.queue.current.author} - ${player.queue.current.title}](https://discord.gg/fz8QMYdVDq)`)
     .addField(`Duration:`, `> \`${player.queue.current.isStream ? `LIVE STREAM` : format(player.queue.current.duration).split(" | ")[0]}\``, true)
     .addField(`Requested By:`, `> ${player.queue.current.requester.tag}`, true)
     .addField(`Queue Length:`, `> ${player.queue.length}`, true)
        .setImage(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
    .setColor("#000000")
    
        skip = skip.setDisabled(false);
        stop = stop.setDisabled(false);
        pause = pause.setDisabled(false);
        queue = queue.setDisabled(false);
        shuffle = shuffle.setDisabled(false);
        if (!player.playing) {
            pause = pause.setStyle('SUCCESS').setEmoji('988409339851198495')
        }
    }
    //now we add the components!
    var components = [
      new MessageActionRow().addComponents([
        skip,
        stop,
        pause,
        queue,
        shuffle,
      ])
    ]
    return {
      embeds, 
      components
    }
}
module.exports.generateQueueEmbed = generateQueueEmbed;