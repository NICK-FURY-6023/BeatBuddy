const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');
const  { bot_token} = require('./config.json'); 
const { Database } = require("quickmongo");
const { readdirSync } = require("fs");
const Enmap = require("enmap");
const client = new Client({
   intents: [Intents.FLAGS.GUILDS, Intents.
FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES],
    allowedMentions: {
        parse: ["everyone", "roles", "users"],
        repliedUser: true
    },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]

});


module.exports = client;
client.musicsetup = new Enmap({
    name: "musicsetup",
    dataDir: "./databases/musicsetup"
  });

client.slashCommands = new Collection();
client.config = require("./config.json");
client.db = new Database(client.config.mongourl);
client.owner = client.config.ownerID;
client.prefix = client.config.prefix;
client.aliases = new Collection();
client.commands = new Collection();
client.categories = readdirSync("./commands/");
client.logger = require("./utils/logger.js");
client.emoji = require("./utils/emoji.json");
client.on('guildCreate', async (guild) => {
    try {
         client.db.set(`auto_${guild.id}`, `false`)
  client.db.set(`247_${guild.id}`, `false`)
        
        const owner = await guild.fetchOwner()
        const embed = new MessageEmbed()           
        .setTitle("Joined A New Server")
        .setColor("GREEN")
        .setThumbnail(guild.iconURL())
        .setDescription("Hey Owners Look! I've Joined A New Server !!")
        .addField("**Server Name**", guild.name, true)
        .addField("**Server ID**", guild.id, true)
        .addField("**Owner**", `Tag - ${owner.user.tag}\nID - ${owner.id}`, true)
        .addField("**Members**", `${guild.memberCount}`, true)
    try { embed.addField("**Region**", guild.region, true) } catch {/** */}
    
    client.channels.cache.get("1000734860752719883").send({embeds: [embed]})
  } catch (e) { console.log(e) }
  let channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  let prefix = "+";
      if (prefix === null) prefix = client.prefix;
      
    const embed = new MessageEmbed()
  
 .setTitle("Thank you for adding me in your server! ❤️")
    .setColor("#000000")
    .setDescription("Hi, This Is GALAXY If You Need Support Related Me Join My Support Server. Support Server Link Is Here https://discord.gg/fz8QMYdVDq")
    .setDescription(`\`\`\`fix\nMy prefix here is + You can see a list of commands by typing +help or +commands\nYou can change my prefix using +prefix <New Prefix>\`\`\``);


    channel.send({ embeds: [embed] })

 
});
require("./handler/Client")(client);
Array(
    'musicsystem'
).forEach(handler => {
	try {
		require(`./handlers/erela_events/${handler}`)(client);
	} catch (e) {
		console.warn(e);
	}
});


client.login("paste your bot token");
