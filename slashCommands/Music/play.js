const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: "play",
  description: "To play some song.",
  player: false,
  inVoiceChannel: true,
    category: "Music",
  sameVoiceChannel: true,
  options: [
    {
      name: "input",
      description: "The search input (name/url)",
      required: true,
      type: "STRING"
    }
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, args) => {
{
  
          const em1 = new MessageEmbed()
   const { channel } = interaction.member.voice;
        var player = interaction.client.manager.get(interaction.guild.id);
        if (!player) {
            var player = interaction.client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: channel.id,
                textChannel: interaction.channel.id,
                volume: 50,
                selfDeafen: true,
            });
        }
   
        if (player.state !== "CONNECTED") player.connect();
        player.setTextChannel(interaction.channel.id);
      

      let SearchString = interaction.options.getString('input');

interaction.reply({content: `Searching **${SearchString}**`, ephemeral: true })
  if (SearchString.match(client.Lavasfy.spotifyPattern)) {
        await client.Lavasfy.requestToken();
        let node = client.Lavasfy.nodes.get("main");
        let Searched = await node.load(SearchString);
      if (Searched.loadType === "PLAYLIST_LOADED") {
          let songs = [];
         for (let i = 0; i < Searched.tracks.length; i++){
            songs.push(TrackUtils.build(Searched.tracks[i], interaction.user));
         }
          player.queue.add(songs);
         interaction.editReply({content: `**${SearchString}** added to queue successfully`, ephemeral: true })
          if (!player.playing && !player.paused) 
          player.play();
         const thing = new MessageEmbed()
          .setAuthor('Added Playlist To Queue')
         
             .setDescription(`<a:mus2:979293557619839007> **${Searched.tracks.length}** Tracks From **${Searched.playlistInfo.name}**\n\n <a:Duration:981469897987063838>**Duration: **\`❯ ${convertTime(Searched.tracks.reduce((acc, cure) => acc + cure.info.length, 0))}\``)
             .setColor("#000000")
         
          return interaction.editReply({ephemeral: true, embeds: [thing]});
     } else if (Searched.loadType.startsWith("TRACK")) {
          player.queue.add(TrackUtils.build(Searched.tracks[0], interaction.user));
          if (!player.playing && !player.paused) 
          return player.play();
            const trackload = new MessageEmbed()
          .setColor(client.embedColor)
          .setTimestamp()
           .setAuthor('Added Song To Queue', interaction.author.displayAvatarURL({dynamic: true}), "https://discord.gg/CdCfgSC3qy")
          
             .setDescription(`<a:mus2:979293557619839007> [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})\n\n<a:requester:1016691421937402007>**Requester: **<@${interaction.author.id}> | <a:Duration:981469897987063838>**Duration: **\`❯ ${convertTime(Searched.tracks[0].info.length)}\``)
          return interaction.reply({ephemeral: true, embeds: [trackload]});
           } else {
         return interaction.reply({ emphermal: true, embeds: [new MessageEmbed().setColor("#000000").setDescription('There were no results found.')]});
        }
      }
else {
        const search = interaction.options.getString('input');
        let res;

        try {
            res = await player.search(search, interaction.author);
            if (res.loadType === 'LOAD_FAILED') {
                if (!player.queue.current) player.destroy();
                throw res.exception;
            }
        } catch (err) {
            interaction.reply({emphermal: true, embeds: [new MessageEmbed().setColor("#000000").setDescription(`There were no results found..`)]});
        }

        switch (res.loadType) {
            case 'NO_MATCHES':
                if (!player.queue.current) player.destroy();
                return interaction.reply({emphermal: true, embeds: [new MessageEmbed().setColor("#000000").setDescription(`There were no results found..`)]});
            case 'TRACK_LOADED':
                var track = res.tracks[0];
                player.queue.add(track);
          if (!player.playing && !player.paused) 
             return player.play(); 
          else {
                    var thing = new MessageEmbed()
                        .setColor("#000000")
                         .setAuthor('Added Song To Queue', interaction.author.displayAvatarURL({dynamic: true}), "https://discord.gg/CdCfgSC3qy")
          
             .setDescription(`<a:mus2:979293557619839007> [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})\n\n<a:requester:1016691421937402007>**Requester: **<@${interaction.author.id}> | <a:Duration:981469897987063838>**Duration: **\`❯ ${convertTime(Searched.tracks[0].info.length)}\``)
                   return interaction.reply({ephemeral: true, embeds: [thing]});
                }
            case 'PLAYLIST_LOADED':
                player.queue.add(res.tracks);
          if (!player.playing && !player.paused) 
              player.play();
                  const playlistloadds = new MessageEmbed()
          .setColor(client.embedColor)
          .setTimestamp()
          .setAuthor('Added Playlist To Queue')
                    .setDescription(`<a:mus2:979293557619839007> ${res.tracks.length} Songs **${res.playlist.name}**\n\n<a:Duration:981469897987063838>**Duration: **\`❯ ${convertTime(res.playlist.duration)}\``)
        interaction.editReply({ephemeral: true, embeds: [playlistloadds]});
            case 'SEARCH_RESULT':
                var track = res.tracks[0];
                player.queue.add(track);
            if (!player.playing && !player.paused) 
                   return player.play(); 
            else {
                     const searchresult = new MessageEmbed()
            .setColor(client.embedColor)
            .setTimestamp()
             .setAuthor('Added Song To Queue')
                        .setDescription(`<a:mus2:979293557619839007> [${track.title.substring(0, 63)}](https://discord.gg/CdCfgSC3qy)\n\n<a:Duration:981469897987063838>**Duration: **\`❯ ${convertTime(track.duration)}\``)
                           .setThumbnail(`https://img.youtube.com/vi/${track.identifier}/mqdefault.jpg`)
                        
                    interaction.editReply({ephemeral: true, embeds: [searchresult]})
                }
        }
   }
    }
}
}