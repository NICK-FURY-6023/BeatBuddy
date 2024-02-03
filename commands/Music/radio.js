const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const radios = require(`../../botconfig/radiostations.json`);
const playermanager = require(`../../handlers/playermanager`);
const {
  stations
} = require(`${process.cwd()}/handlers/functions`);
const { handlemsg } = require(`${process.cwd()}/handlers/functions`);

module.exports = {
    name: "radio",
    aliases: ["cq", "clear"],
    category: "Music",
      dj: false,
  	description: "Removes all tracks from the queue and stop the player.",
	  args: false,
    usage: "<Number of song in queue>",
    permission: [],
    owner: false,
    player: false,
  
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		 if (!args[0]) return stations(client, config.prefix, message);
      //if not a number error
      if (isNaN(args[0])) {
        return message.reply({embeds :[new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("Not a valid radio station")
          .setDescription("`Please use a Number between \\`1\\` and \\`183\\``")
        ]});
      }
      //if the volume number is not valid
      if (Number(args[1]) > 150 || Number(args[1]) < 1)
        return message.reply({embeds : [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle("`Volume Number out of Range`")
          .setDescription("`Please use a Number between \\`1\\` and \\`150\\``")
        ]});
      //define the volume
      let volume;
      //if its not a number for volume, set it to 50
      if (isNaN(args[1])) {
        volume = 50;
      }
      //otherwise set it to the args
      else {
        volume = args[1];
      }
      //define args 2 of each single input
      let args2;
      function lengthUntil(array) {
        let lastitem = array[array.length - 1];
        let flatObject = [, ...Object.values(radios.REYFM), ...Object.values(radios.ILOVERADIO), ...Object.values(radios.EU), ...Object.values(radios.OTHERS)];
        let allArray = [];
        for(const element of flatObject){
          if(Array.isArray(element)) for(const e of element) allArray.push(e);
          else allArray.push(element);
        }
        return allArray.indexOf(lastitem);
      }


      if (Number([args[0]]) > 0 && Number([args[0]]) <= lengthUntil(radios.REYFM)) args2 = radios.REYFM[Number([args[0]]) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.REYFM) && Number([args[0]]) <= lengthUntil(radios.ILOVERADIO)) args2 = radios.ILOVERADIO[Number([args[0]]) - 1 - lengthUntil(radios.REYFM)].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.ILOVERADIO) && Number([args[0]]) <= lengthUntil(radios.EU.United_Kingdom)) args2 = radios.EU.United_Kingdom[Number([args[0]]) - 1 - lengthUntil(radios.ILOVERADIO)].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.United_Kingdom) && Number([args[0]]) <= lengthUntil(radios.EU.Austria)) args2 = radios.EU.Austria[Number([args[0]]) - 1 - lengthUntil(radios.EU.United_Kingdom)].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Austria) && Number([args[0]]) <= lengthUntil(radios.EU.Belgium)) args2 = radios.EU.Belgium[Number([args[0]]) - lengthUntil(radios.EU.Austria) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Belgium) && Number([args[0]]) <= lengthUntil(radios.EU.Bosnia)) args2 = radios.EU.Bosnia[Number([args[0]]) - lengthUntil(radios.EU.Belgium) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Bosnia) && Number([args[0]]) <= lengthUntil(radios.EU.Czech)) args2 = radios.EU.Czech[Number([args[0]]) - lengthUntil(radios.EU.Bosnia) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Czech) && Number([args[0]]) <= lengthUntil(radios.EU.Denmark)) args2 = radios.EU.Denmark[Number([args[0]]) - lengthUntil(radios.EU.Czech) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Denmark) && Number([args[0]]) <= lengthUntil(radios.EU.Germany)) args2 = radios.EU.Germany[Number([args[0]]) - lengthUntil(radios.EU.Denmark) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Germany) && Number([args[0]]) <= lengthUntil(radios.EU.Hungary)) args2 = radios.EU.Hungary[Number([args[0]]) - lengthUntil(radios.EU.Germany) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Hungary) && Number([args[0]]) <= lengthUntil(radios.EU.Ireland)) args2 = radios.EU.Ireland[Number([args[0]]) - lengthUntil(radios.EU.Hungary) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Ireland) && Number([args[0]]) <= lengthUntil(radios.EU.Italy)) args2 = radios.EU.Italy[Number([args[0]]) - lengthUntil(radios.EU.Ireland) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Italy) && Number([args[0]]) <= lengthUntil(radios.EU.Luxembourg)) args2 = radios.EU.Luxembourg[Number([args[0]]) - lengthUntil(radios.EU.Italy) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Luxembourg) && Number([args[0]]) <= lengthUntil(radios.EU.Romania)) args2 = radios.EU.Romania[Number([args[0]]) - lengthUntil(radios.EU.Luxembourg) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Romania) && Number([args[0]]) <= lengthUntil(radios.EU.Serbia)) args2 = radios.EU.Serbia[Number([args[0]]) - lengthUntil(radios.EU.Romania) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Serbia) && Number([args[0]]) <= lengthUntil(radios.EU.Spain)) args2 = radios.EU.Spain[Number([args[0]]) - lengthUntil(radios.EU.Serbia) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Spain) && Number([args[0]]) <= lengthUntil(radios.EU.Sweden)) args2 = radios.EU.Sweden[Number([args[0]]) - lengthUntil(radios.EU.Spain) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Sweden) && Number([args[0]]) <= lengthUntil(radios.EU.Ukraine)) args2 = radios.EU.Ukraine[Number([args[0]]) - lengthUntil(radios.EU.Sweden) - 1].split(` `);
      else if (Number([args[0]]) > lengthUntil(radios.EU.Ukraine) && Number([args[0]]) <= lengthUntil(radios.OTHERS.request)) args2 = radios.OTHERS.request[Number([args[0]]) - lengthUntil(radios.EU.Ukraine) - 1].split(` `);
      //if not found send an error
      else
        return message.channel.send({embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setTitle(`Error | Radio Station not found`)
          .setDescription(`Please use a Station between \`1\` and \`${lengthUntil(radios.OTHERS.request)}\``)
        ]});
      //get song information of it
      const song = {
        title: args2[0].replace(`-`, ` `),
        url: args2[1]
      };
      //define an embed
      let embed = new MessageEmbed()
        .setColor("#000000")

        .setTitle(`🎶Searching: ` + song.title)
      try {
        embed.setURL(song.url)
      } catch {}
      //send the message of the searching
      message.reply({embeds :[embed]})
      //play the radio but make the URL to an array ;) like that: [ `urlhere` ]
      playermanager(client, message, Array(song.url), `song:radio`);
    }
}