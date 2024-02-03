const Discord = require("discord.js");
const {
  Client,
  Collection,
  MessageEmbed,
  MessageAttachment, Permissions, MessageButton, MessageActionRow, MessageSelectMenu
} = require("discord.js");
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const config = require(`${process.cwd()}/botconfig/config.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const radios = require("../botconfig/radiostations.json");
const ms = require("ms")
const moment = require("moment")
const fs = require('fs')

module.exports.getMember = getMember 
module.exports.shuffle = shuffle;
module.exports.formatDate = formatDate;
module.exports.duration = duration;
module.exports.promptMessage = promptMessage;
module.exports.delay = delay;
module.exports.getRandomInt = getRandomInt;
module.exports.getRandomNum = getRandomNum;
module.exports.createBar = createBar;
module.exports.format = format;
module.exports.stations = stations;
module.exports.escapeRegex = escapeRegex;
module.exports.autoplay = autoplay;
module.exports.arrayMove = arrayMove;
module.exports.swap_pages2 = swap_pages2;
module.exports.swap_pages1 = swap_pages;
module.exports.findOrCreateGuild = findOrCreateGuild;
module.exports.simple_databasing = simple_databasing;
// This function is used to find a guild data or create it
async function findOrCreateGuild(client, { id: guildID }, isLean){
  if(client.databaseCache.guilds.get(guildID)){
    return isLean ? client.databaseCache.guilds.get(guildID).toJSON() : client.databaseCache.guilds.get(guildID);
  } else {
    let guildData = (isLean ? await client.guildsData.findOne({ id: guildID }) : await client.guildsData.findOne({ id: guildID }));
    if(guildData){
      if(!isLean) client.databaseCache.guilds.set(guildID, guildData);
      return guildData;
    } else {
      guildData = new client.guildsData({ id: guildID });
      await guildData.save();
      client.databaseCache.guilds.set(guildID, guildData);
      return isLean ? guildData.toJSON() : guildData;
    }
  }
}


function getMember(message, toFind = "") {
  try {
    toFind = toFind.toLowerCase();
    let target = message.guild.members.get(toFind);
    if (!target && message.mentions.members) target = message.mentions.members.first();
    if (!target && toFind) {
      target = message.guild.members.find((member) => {
        return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
      });
    }
    if (!target) target = message.member;
    return target;
  } catch (e) {
    console.log("idk")
  }
}
function stations(client, prefix, message) {
  

  try {
    const reyfm_iloveradio_embed = new MessageEmbed().setFooter("GALAXY").setColor("#000000").setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription(`Example: \`${prefix}radio 11\``);
    const stationsembed = new MessageEmbed().setFooter("GALAXY").setColor("#000000").setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription(`Example: \`${prefix}radio 44\``);
    const stationsembed2 = new MessageEmbed().setFooter("GALAXY").setColor("#000000").setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription(`Example: \`${prefix}radio 69\``);
    const stationsembed3 = new MessageEmbed().setFooter("GALAXY").setColor("#000000").setTitle("Pick your Station, by typing in the right `INDEX` Number!").setDescription(`Example: \`${prefix}radio 120\``);
    const stationsembed4 = new MessageEmbed().setFooter("GALAXY").setColor("#000000").setTitle("CUSTOM REQUESTS | Pick your Station, by typing in the right `INDEX` Number!");
    
    let beforeindex = 1;
    let REYFM = "";
    for (let i = 0; i < radios.REYFM.length; i++) {
      REYFM += `**${i + beforeindex}** [${radios.REYFM[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.REYFM[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.REYFM.length;
    let ILOVERADIO = "";
    for (let i = 0; i < radios.ILOVERADIO.length; i++) {
      ILOVERADIO += `**${i + beforeindex}** [${radios.ILOVERADIO[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.ILOVERADIO[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.ILOVERADIO.length;
    reyfm_iloveradio_embed.addField("**RANDOM-STATIONS:**", `${REYFM}`.substring(0, 1024), true)
    reyfm_iloveradio_embed.addField("**ILOVEMUSIC-STATIONS:**", `${ILOVERADIO}`.substring(0, 1024), true)
    reyfm_iloveradio_embed.addField("**INFORMATION:**", "> On the next pages, are country specific Radiostations")
    reyfm_iloveradio_embed.addField("**INFORMATION:**", "> You Can suggest radio stations by using >suggest")

    let United_Kingdom = "";
    for (let i = 0; i < radios.EU.United_Kingdom.length; i++) {
      United_Kingdom += `**${i + beforeindex}** [${radios.EU.United_Kingdom[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.United_Kingdom[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.United_Kingdom.length;
    stationsembed.addField("🇬🇧 United Kingdom", `>>> ${United_Kingdom}`, true);

    let austria = "";
    for (let i = 0; i < radios.EU.Austria.length; i++) {
      austria += `**${i + beforeindex}** [${radios.EU.Austria[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Austria[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Austria.length;
    stationsembed.addField("🇦🇹 Austria", `>>> ${austria}`, true);
    
    let Belgium = "";
    for (let i = 0; i < radios.EU.Belgium.length; i++) {
      Belgium += `**${i + beforeindex}** [${radios.EU.Belgium[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Belgium[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Belgium.length;
    stationsembed.addField("🇧🇪 Belgium", `>>> ${Belgium}`, true);
    
    let Bosnia = "";
    for (let i = 0; i < radios.EU.Bosnia.length; i++) {
      Bosnia += `**${i + beforeindex}** [${radios.EU.Bosnia[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Bosnia[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Bosnia.length;
    stationsembed.addField("🇧🇦 Bosnia", `>>> ${Bosnia}`, true);
    
    let Czech = "";
    for (let i = 0; i < radios.EU.Czech.length; i++) {
      Czech += `**${i + beforeindex}** [${radios.EU.Czech[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Czech[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Czech.length;
    stationsembed.addField("🇨🇿 Czech", `>>> ${Czech}`, true);
    
    let Denmark = "";
    for (let i = 0; i < radios.EU.Denmark.length; i++) {
      Denmark += `**${i + beforeindex}** [${radios.EU.Denmark[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Denmark[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Denmark.length;
    stationsembed.addField("🇩🇰 Denmark", `>>> ${Denmark}`, true);
    
    let germany = "";
    for (let i = 0; i < radios.EU.Germany.length; i++) {
      germany += `**${i + beforeindex}** [${radios.EU.Germany[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Germany[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Germany.length;
    stationsembed2.addField("🇩🇪 Germany", `>>> ${germany}`, true);
    
    let Hungary = "";
    for (let i = 0; i < radios.EU.Hungary.length; i++) {
      Hungary += `**${i + beforeindex}** [${radios.EU.Hungary[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Hungary[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Hungary.length;
    stationsembed2.addField("🇭🇺 Hungary", `>>> ${Hungary}`, true);
    
    let Ireland = "";
    for (let i = 0; i < radios.EU.Ireland.length; i++) {
      Ireland += `**${i + beforeindex}** [${radios.EU.Ireland[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Ireland[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Ireland.length;
    stationsembed2.addField("🇮🇪 Ireland", `>>> ${Ireland}`, true);
    
    let Italy = "";
    for (let i = 0; i < radios.EU.Italy.length; i++) {
      Italy += `**${i + beforeindex}** [${radios.EU.Italy[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Italy[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Italy.length;
    stationsembed2.addField("🇮🇹 Italy", `>>> ${Italy}`, true);
    
    let Luxembourg = "";
    for (let i = 0; i < radios.EU.Luxembourg.length; i++) {
      Luxembourg += `**${i + beforeindex}** [${radios.EU.Luxembourg[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Luxembourg[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Luxembourg.length;
    stationsembed2.addField("🇱🇺 Luxembourg", `>>> ${Luxembourg}`, true);
    
    let Romania = "";
    for (let i = 0; i < radios.EU.Romania.length; i++) {
      Romania += `**${i + beforeindex}** [${radios.EU.Romania[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Romania[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Romania.length;
    stationsembed2.addField("🇷🇴 Romania", `>>> ${Romania}`, true);
    
    let Serbia = "";
    for (let i = 0; i < radios.EU.Serbia.length; i++) {
      Serbia += `**${i + beforeindex}** [${radios.EU.Serbia[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Serbia[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Serbia.length;
    stationsembed3.addField("🇷🇸 Serbia", `>>> ${Serbia}`, true);
    
    let Spain = "";
    for (let i = 0; i < radios.EU.Spain.length; i++) {
      Spain += `**${i + beforeindex}** [${radios.EU.Spain[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Spain[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Spain.length;
    stationsembed3.addField("🇪🇸 Spain", `>>> ${Spain}`, true);
    
    let Sweden = "";
    for (let i = 0; i < radios.EU.Sweden.length; i++) {
      Sweden += `**${i + beforeindex}** [${radios.EU.Sweden[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Sweden[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Sweden.length;
    stationsembed3.addField("🇸🇪 Sweden", `>>> ${Sweden}`, true);
    
    let TURKEY = "";
    for (let i = 0; i < radios.EU.TURKEY.length; i++) {
      TURKEY += `**${i + beforeindex}** [${radios.EU.TURKEY[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.TURKEY[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.TURKEY.length;
    stationsembed3.addField("🇹🇷 TURKEY", `>>> ${TURKEY}`, true);
    let Ukraine = "";
    for (let i = 0; i < radios.EU.Ukraine.length; i++) {
      Ukraine += `**${i + beforeindex}** [${radios.EU.Ukraine[i].split(" ")[0].replace("-", " ").substring(0, 16)}](${radios.EU.Ukraine[i].split(" ")[1]})\n`;
    }
    beforeindex+=radios.EU.Ukraine.length;
    stationsembed3.addField("🇺🇦 Ukraine", `>>> ${Ukraine}`, true);

    let embeds = []
    embeds.push(reyfm_iloveradio_embed)
    embeds.push(stationsembed)
    embeds.push(stationsembed2)
    embeds.push(stationsembed3)
    let requests = "";
    for (let i = 0; i < radios.OTHERS.request.length; i++) {
      requests += `**${i + beforeindex}** [${radios.OTHERS.request[i].split(" ")[0].replace("-", " ").substring(0, 20)}](${radios.OTHERS.request[i].split(" ")[1]})\n`;
      if(requests.length > 1900){
        embeds.push(new MessageEmbed().setFooter("GALAXY").setTitle("CUSTOM REQUESTS | Pick your Station, by typing in the right `INDEX` Number!").setDescription(`${requests}`))
        requests = "";
      }
    }
    beforeindex+=radios.OTHERS.request.length;
    stationsembed4.setDescription(`${requests}`);
    embeds.push(stationsembed4)
    require("./functions").swap_pages2(client, message, embeds);
    let amount = 0;
    

  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}
function simple_databasing(client, guildid, userid) {
  if(!client || client == undefined || !client.user || client.user == undefined) return;
  try {
   
    if(userid){
      client.settings.ensure(userid, {
        dm: true,
      })
    }
    if (guildid) {
  
      client.settings.ensure(guildid, {
        prefix: config.prefix,
        pruning: true,
        requestonly: true,
        autobackup: false,
        unkowncmdmessage: false,
        defaultvolume: 30,
        channel: "773836425678422046",
        language: "en",
        embed: {
          "color": ee.color,
          "thumb": true,
          "wrongcolor": ee.wrongcolor,
          "footertext": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).name : ee.footertext,
          "footericon": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).iconURL({
            dynamic: true
          }) : ee.footericon,
        },
        adminlog: "no",
        reportlog: "no",
        autonsfw: "no",
        dailyfact: "no",
        autoembeds: [],
        adminroles: [],

        volume: "69",
        
        showdisabled: true,

        MUSIC: true,
        FUN: true,
        ANIME: true,
        MINIGAMES: true,
        ECONOMY: true,
        SCHOOL: true,
        NSFW: false,
        VOICE: true,
        RANKING: true,
        PROGRAMMING: true,
        CUSTOMQUEUE: true,
        FILTER: true,
        SOUNDBOARD: true,

        djroles: [],
        djonlycmds: ["autoplay", "clearqueue", "forward", "loop", "jump", "loopqueue", "loopsong", "move", "pause", "resume", "removetrack", "removedupe", "restart", "rewind", "seek", "shuffle", "skip", "stop", "volume"],
        botchannel: [],
      });
    }
    return;
  } catch (e) {
    console.log("idk")
  }
}

function shuffle(a) {
  try {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  } catch (e) {
    console.log("idk")
  }
}

function formatDate(date) {
  try {
    return new Intl.DateTimeFormat("en-US").format(date);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function duration(ms) {
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (60 * 1000)) % 60).toString();
  const hrs = Math.floor((ms / (60 * 60 * 1000)) % 60).toString();
  const days = Math.floor((ms / (24 * 60 * 60 * 1000)) % 60).toString();
  return `${days}Days,${hrs}Hours,${min}Minutes,${sec}Seconds`;
}



function delay(delayInms) {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

//randomnumber between 0 and x
function getRandomInt(max) {
  try {
    return Math.floor(Math.random() * Math.floor(max));
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}
//random number between y and x
function getRandomNum(min, max) {
  try {
    return Math.floor(Math.random() * Math.floor((max - min) + min));
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}
function createBar(player) {
  try{
    let size = 15;
    if (!player.queue.current) return `**${emoji.msg.progress_bar.emptybeginning}${emoji.msg.progress_bar.filledframe}${emoji.msg.progress_bar.emptyframe.repeat(size - 1)}${emoji.msg.progress_bar.emptyend}**\n**00:00:00 / 00:00:00**`;
    let current = player.queue.current.duration !== 0 ? player.position : player.queue.current.duration;
    let total = player.queue.current.duration;
    let rightside = size - Math.round(size * (current / total));
    let leftside = Math.round(size * (current / total));
    let bar;
    if (leftside < 1) bar = String(emoji.msg.progress_bar.emptybeginning) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(emoji.msg.progress_bar.emptyend);
    else bar = String(emoji.msg.progress_bar.leftindicator) + String(emoji.msg.progress_bar.filledframe).repeat(leftside) + String(emoji.msg.progress_bar.emptyframe).repeat(rightside) + String(size - rightside !== 1 ? emoji.msg.progress_bar.emptyend : emoji.msg.progress_bar.rightindicator);
    return `**${bar}**\n**${!player.queue.current.isStream ? `**${new Date(player.position).toISOString().substr(11, 8)} / ${new Date(player.queue.current.duration).toISOString().slice(11, 19)}**` : '`â—‰ LIVE`'}**`;
  }catch (e){
    console.log(String(e.stack).bgRed)
  }
}
function format(millis) {
  try {
    var h = Math.floor(millis / 3600000),
      m = Math.floor(millis / 60000),
      s = ((millis % 60000) / 1000).toFixed(0);
    if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function escapeRegex(str) {
  try {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

function arrayMove(array, from, to) {
  try {
    array = [...array];
    const startIndex = from < 0 ? array.length + from : from;
    if (startIndex >= 0 && startIndex < array.length) {
      const endIndex = to < 0 ? array.length + to : to;
      const [item] = array.splice(from, 1);
      array.splice(endIndex, 0, item);
    }
    return array;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

async function promptMessage(message, author, time, validReactions) {
  try {
    time *= 1000;
    for (const reaction of validReactions) await message.react(reaction);
    const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message.awaitReactions(filter, {
      max: 1,
      time: time
    }).then((collected) => collected.first() && collected.first().emoji.name);
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}

async function autoplay (client, player, type) {
  try {
    if (player.queue.size > 0) return;
    let previoustrack = player.get("previoustrack");
    if (!previoustrack) return;

    const mixURL = `https://www.youtube.com/watch?v=${previoustrack.identifier}&list=RD${previoustrack.identifier}`;
    const res = await client.manager.search(mixURL, previoustrack.requester);
    //if nothing is found, send error message, plus if there  is a delay for the empty QUEUE send error message TOO
    if (!res || res.loadType === 'LOAD_FAILED' || res.loadType !== 'PLAYLIST_LOADED') {
      let embed = new MessageEmbed()
      .setDescription(`${emoji.msg.ERROR} Found nothing related for the latest Song!`)
      .setColor(ee.wrongcolor)
      try {
        client.channels.cache.get(player.textChannel).send({embeds: [embed]})
      } catch (e) { console.log(e) }
    }
    player.queue.add(res.tracks[2]);
    if(type === "skip") {
      player.stop()
    } else {
      player.play()
    }
    return;
  } catch (e) {
    console.log(String(e.stack).bgRed)
  }
}


async function swap_pages(client, message, description, TITLE) {
  const settings = client.settings.get(message.guild.id)
  let es = settings.embed;
  let prefix = settings.prefix
  let ls = settings.language;
  let cmduser = message.author;
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.eu
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */

  let currentPage = 0;
  //GET ALL EMBEDS
  let embeds = [];
  //if input is an array
  if (Array.isArray(description)) {
    try {
      let k = 20;
      for (let i = 0; i < description.length; i += 20) {
        const current = description.slice(i, k);
        k += 20;
        const embed = new MessageEmbed()
          .setDescription(current.join("\n"))
          .setTitle(TITLE)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setFooter(client.getFooter(es))
        embeds.push(embed);
      }
      embeds;
    } catch (e){console.error(e)}
  } else {
    try {
      let k = 1000;
      for (let i = 0; i < description.length; i += 1000) {
        const current = description.slice(i, k);
        k += 1000;
        const embed = new MessageEmbed()
          .setDescription(current)
          .setTitle(TITLE)
          .setColor(es.color).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
          .setFooter(client.getFooter(es))
        embeds.push(embed);
      }
      embeds;
    } catch (e){console.error(e)}
  }
  if (embeds.length === 0) return message.channel.send({embeds: [new MessageEmbed()
  .setTitle(`${emoji?.msg.ERROR} No Content added to the SWAP PAGES Function`)
  .setColor(es.wrongcolor).setThumbnail(es.thumb ? es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL() : null)
  .setFooter(client.getFooter(es))]}).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  if (embeds.length === 1) return message.channel.send({embeds: [embeds[0]]}).catch(e => console.log("THIS IS TO PREVENT A CRASH"))

  let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("983306316409892914").setLabel("Back")
  let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel("Home")
  let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('983306397548691456').setLabel("Forward")
  const allbuttons = [new MessageActionRow().addComponents([button_back, button_home, button_forward])]
  //Send message with buttons
  let swapmsg = await message.channel.send({   
      content: `***Click on the __Buttons__ to swap the Pages***`,
      embeds: [embeds[0]], 
      components: allbuttons
  });
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({filter: (i) => i?.isButton() && i?.user && i?.user.id == cmduser.id && i?.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  collector.on('collect', async b => {
      if(b?.user.id !== message.author.id)
        return b?.reply({content: `<a:cross:1027796062452322304> **Only the one who typed ${prefix}help is allowed to react!**`, ephemeral: true})
        //page forward
        if(b?.customId == "1") {
          collector.resetTimer();
          //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage !== 0) {
              currentPage -= 1
              await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
              await b?.deferUpdate();
            } else {
                currentPage = embeds.length - 1
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            }
        }
        //go home
        else if(b?.customId == "2"){
          collector.resetTimer();
          //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
            currentPage = 0;
            await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
            await b?.deferUpdate();
        } 
        //go forward
        else if(b?.customId == "3"){
          collector.resetTimer();
          //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage < embeds.length - 1) {
                currentPage++;
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            } else {
                currentPage = 0
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            }
        
        } 
        //go forward
        else if(b?.customId == "stop"){
            await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents(swapmsg.components)}).catch(() => {});
            await b?.deferUpdate();
            collector.stop("stopped");
        }
  });
  collector.on("end", (reason) => {
    if(reason != "stopped"){
      swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents(swapmsg.components)}).catch(() => {});
    }
  })


}
async function swap_pages2(client, message, embeds) {
  let currentPage = 0;
  let cmduser = message.author;
  if (embeds.length === 1) return message.channel.send({embeds: [embeds[0]]}).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("983306316409892914").setLabel("Back")
  let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel("Home")
  let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('983306397548691456').setLabel("Forward")
  const allbuttons = [new MessageActionRow().addComponents([button_back, button_home, button_forward])]
  let prefix = ">";
  //Send message with buttons
  let swapmsg = await message.channel.send({   
      content: `***Click on the __Buttons__ to swap the Pages***`,
      embeds: [embeds[0]], 
      components: allbuttons
  });
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({filter: (i) => i?.isButton() && i?.user && i?.user.id == cmduser.id && i?.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  collector.on('collect', async b => {
      if(b?.user.id !== message.author.id)
        return b?.reply({content: `<a:cross:1027796062452322304> **Only the one who typed ${prefix}help is allowed to react!**`, ephemeral: true})
        //page forward
        if(b?.customId == "1") {
          collector.resetTimer();
          //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage !== 0) {
              currentPage -= 1
              await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
              await b?.deferUpdate();
            } else {
                currentPage = embeds.length - 1
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            }
        }
        //go home
        else if(b?.customId == "2"){
          collector.resetTimer();
          //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
            currentPage = 0;
            await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
            await b?.deferUpdate();
        } 
        //go forward
        else if(b?.customId == "3"){
          collector.resetTimer();
          //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage < embeds.length - 1) {
                currentPage++;
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            } else {
                currentPage = 0
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            }
        
        } 
        //go forward
        else if(b?.customId == "stop"){
            await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents(swapmsg.components)}).catch(() => {});
            await b?.deferUpdate();
            collector.stop("stopped");
        }
  });
  collector.on("end", (reason) => {
    if(reason != "stopped"){
      swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents(swapmsg.components)}).catch(() => {});
    }
  })

}
function getDisabledComponents (MessageComponents) {
  if(!MessageComponents) return []; // Returning so it doesn't crash
  return MessageComponents.map(({components}) => {
      return new MessageActionRow()
          .addComponents(components.map(c => c.setDisabled(true)))
  });
}
async function swap_pages2_interaction(client, interaction, embeds) {
  let currentPage = 0;
  let cmduser = interaction?.member.user;
  if (embeds.length === 1) return interaction?.reply({ephemeral: true, embeds: [embeds[0]]}).catch(e => console.log("THIS IS TO PREVENT A CRASH"))
  let button_back = new MessageButton().setStyle('SUCCESS').setCustomId('1').setEmoji("983306316409892914").setLabel("Back")
  let button_home = new MessageButton().setStyle('DANGER').setCustomId('2').setEmoji("🏠").setLabel("Home")
  let button_forward = new MessageButton().setStyle('SUCCESS').setCustomId('3').setEmoji('983306397548691456').setLabel("Forward")
  const allbuttons = [new MessageActionRow().addComponents([button_back, button_home, button_forward])]
  let prefix = ">";
  //Send message with buttons
  let swapmsg = await interaction?.reply({   
      content: `***Click on the __Buttons__ to swap the Pages***`,
      embeds: [embeds[0]], 
      components: allbuttons,
      ephemeral: true
  });
  //create a collector for the thinggy
  const collector = swapmsg.createMessageComponentCollector({filter: (i) => i?.isButton() && i?.user && i?.user.id == cmduser.id && i?.message.author.id == client.user.id, time: 180e3 }); //collector for 5 seconds
  //array of all embeds, here simplified just 10 embeds with numbers 0 - 9
  collector.on('collect', async b => {
      if(b?.user.id !== cmduser.id)
        return b?.reply({content: `<a:cross:1027796062452322304> **Only the one who typed ${prefix}help is allowed to react!**`, ephemeral: true})
        //page forward
        if(b?.customId == "1") {
          collector.resetTimer();
          //b?.reply("***Swapping a PAGE FORWARD***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage !== 0) {
              currentPage -= 1
              await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
              await b?.deferUpdate();
            } else {
                currentPage = embeds.length - 1
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            }
        }
        //go home
        else if(b?.customId == "2"){
          collector.resetTimer();
          //b?.reply("***Going Back home***, *please wait 2 Seconds for the next Input*", true)
            currentPage = 0;
            await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
            await b?.deferUpdate();
        } 
        //go forward
        else if(b?.customId == "3"){
          collector.resetTimer();
          //b?.reply("***Swapping a PAGE BACK***, *please wait 2 Seconds for the next Input*", true)
            if (currentPage < embeds.length - 1) {
                currentPage++;
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            } else {
                currentPage = 0
                await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents[swapmsg.components]}).catch(() => {});
                await b?.deferUpdate();
            }
        
        } 
        //go forward
        else if(b?.customId == "stop"){
            await swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents(swapmsg.components)}).catch(() => {});
            await b?.deferUpdate();
            collector.stop("stopped");
        }
  });
  collector.on("end", (reason) => {
    if(reason != "stopped"){
     swapmsg.edit({embeds: [embeds[currentPage]], components: getDisabledComponents(swapmsg.components)}).catch(() => {});
    }
  })

}

function databasing(client, guildid, userid) {
  if (!client || client == undefined || !client.user || client.user == undefined) return;
  try {
    if (userid) {
      client.queuesaves.ensure(userid, {
        "TEMPLATEQUEUEINFORMATION": ["queue", "sadasd"]
      });
    }
    if (guildid) {
      client.musicsettings.ensure(guildid, {
        "channel": "",
        "message": ""
      })
      client.stats.ensure(guildid, {
        commands: 0,
        songs: 0
      });
      client.settings.ensure(guildid, {
        prefix: "!",
        embed: {
          "color": ee.color,
          "thumb": true,
          "wrongcolor": ee.wrongcolor,
          "footertext": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).name : ee.footertext,
          "footericon": client.guilds.cache.get(guildid) ? client.guilds.cache.get(guildid).iconURL({
            dynamic: true
          }) : ee.footericon,
        },
        language: settings.default_db_data.language,
        pruning: settings.default_db_data.pruning,
        unkowncmdmessage: settings.default_db_data.unkowncmdmessage,
        autoresume: settings.default_db_data.autoresume,

        defaultvolume: settings.default_db_data.defaultvolume,
        defaulteq: settings.default_db_data.defaultequalizer,
        defaultap: settings.default_db_data.defaultautoplay,

        playmsg: settings.default_db_data.playmsg,

        djroles: [],
        botchannel: [],
      });
    }
    return;
  } catch (e) {
    console.log(String(e.stack).grey.bgRed)
  }
}