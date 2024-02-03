const { MessageEmbed } = require('discord.js');
const fetch = require("node-fetch");
const lyricsFinder = require('lyrics-finder');
module.exports = {
	name: "lyrics",
    aliases: ["ly"],
    category: "Music",
    description: "Displays lyrics for the currently playing song.",
    args: false,
    player: false,
    inVoiceChannel: false,
    sameVoiceChannel: false,
    permission: [],
    owner: false,
	 execute: async (message, args, client, prefix) => {
    try {
        
        let player = message.client.manager.get(message.guildId);

            let title = player.queue.current.title;
  
            let author = player.queue.current.author;
   
            if (args[0]) {
        
                title = args.join(` `);
             
                message.channel.send({embeds: [new MessageEmbed()
                    .setColor("#000000")
                    .setTitle(`Searching lyrics for: \`${title}\``.substr(0, 256))
                ]})
            }
        
            let lyrics;
          
               
                    try {
               
                        lyrics = await lyricsFinder(title, author ? author : ``);
               
                        if (!lyrics)
                            return message.reply({embeds: [new MessageEmbed()
                                .setColor("#000000")
                                .setTitle(` **No Lyrics found for: \`${title}\`**`)
                            ]});
                        
                    } catch (e) {
                
                        return message.channel.send({embeds: [new MessageEmbed()
                            .setColor("#000000")
                            .setDescription(`**No Lyrics found for: \`${title}\`**`)
                        ]});
                    }
                
            
        
        return message.channel.send({embeds: [new MessageEmbed()
                            .setColor("#000000")
                            .setTitle(`Lyrics of ${title}`)
                            .setDescription(`${lyrics}`)
                        ]});
        
        } catch (e) {
            console.log(e)
            };
        }
   }
