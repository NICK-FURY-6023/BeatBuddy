const { MessageEmbed, MessageActionRow, MessageButton, Client, Permissions} = require("discord.js");
const Topgg = require("@top-gg/sdk");
const topgg = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwNDQ1OTYwNTA4NTk2NjM0MDEiLCJib3QiOnRydWUsImlhdCI6MTY3ODE5MjAwMX0.qwGv9fE_Az8lCmBJZNUCQO9E5Jc_5ppzg2hM2PQNX9s");

module.exports = async (client, interaction) => {
	 let prefix = await client.db.get(`prefix_${interaction.guild.id}`);
      if (prefix === null) prefix = client.prefix;
      
 let color = interaction.guild.me.displayHexColor !== '#000000' ? interaction.guild.me.displayHexColor : client.config.embedColor;

  const music = new MessageEmbed();
     music.setColor(color)
  const player = interaction.client.manager.get(interaction.guildId);

     if(interaction.isButton()){
if(!interaction.guild.me.permissionsIn(interaction.channel).has('VIEW_CHANNEL'))
       return;
       if(interaction.customId === 'vdown')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           let amount = Number(player.volume) - 10;
               await player.setVolume(amount);
               music.setDescription(`Volume Set To **${amount}%**`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }

       if(interaction.customId === 'vup')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           let amount = Number(player.volume) + 10;
            if(amount > 150) return interaction.reply({ content: `Cannot higher the player volume further more.`, ephemeral: true });
               await player.setVolume(amount);
               music.setDescription(`Volume Set To **${amount}%**`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }

     
       if(interaction.customId === 'pause')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
            const But1 = new MessageButton().setCustomId("vdown").setEmoji("<:apera_vdown:1073839038345256990>").setStyle("SUCCESS");
    
   const But2 = new MessageButton().setCustomId("rewind").setEmoji("⏮️").setStyle("PRIMARY");

   const But3 = new MessageButton().setCustomId("pause").setEmoji(!player.paused ? "<:icons_pause:988409339851198495>" : "<:icons_play:988409341784768533>").setStyle(!player.paused ? "SUCCESS" : "SECONDARY");

   const But4 = new MessageButton().setCustomId("forward").setEmoji("⏭️").setStyle("PRIMARY");
    
   const But5 = new MessageButton().setCustomId("vup").setEmoji("<:apera_vup:1073839286669037610>").setStyle("SUCCESS");

   const But6 = new MessageButton().setCustomId("back").setEmoji("<:icons_backforward:988409328698523708>").setStyle("SUCCESS");

   const But7 = new MessageButton().setCustomId("right").setEmoji("<:icons_hyphen:859388129596014592>").setStyle("SECONDARY").setDisabled(true);

   const But8 = new MessageButton().setCustomId("stop").setEmoji("<:stop:981500247614324806>").setStyle("DANGER");

   const But9 = new MessageButton().setCustomId("left").setEmoji("<:icons_hyphen:859388129596014592>").setStyle("SECONDARY").setDisabled(true);

   const But10 = new MessageButton().setCustomId("skip").setEmoji("<:icons_frontforward:988409335791124551>").setStyle("SUCCESS");
   
   const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);
   const row1 = new MessageActionRow().addComponents(But6, But7, But8, But9, But10)
  try{
    player.get('nowplayingMSG').edit({components: [row, row1]})
  }catch(e) {
}
           player.pause(!player.paused);
                const Text = player.paused ? "<:vr_playy:1079900302083379350> Paused" : "<:vr_pause:1079900527791452312> Resumed";
               
             music.setDescription(`**${Text} the player**`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       } // "pause" work above 
       if(interaction.customId === 'skip')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           await player.stop();
                music.setDescription(`Skipped to the next track.`)
              
              interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "skip work above"  
       if(interaction.customId === 'stop')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.paused)
                {
                  player.pause(true)
                music.setDescription(`**🛑 Stopped The Player**`)
                interaction.reply({embeds: [music], ephemeral: true});
                }
                else
                {
                  music.setDescription(`**The Music Is Already Stopped**`)
                interaction.reply({embeds: [music], ephemeral: true});
                }
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "stop" work above    
       if(interaction.customId === 'back')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           if(!player.queue.previous)
           {
             music.setDescription(`There is no previous song`)
             return interaction.reply({embeds: [music], ephemeral: true});
           }
           else 
           {
              player.queue.unshift(player.queue.previous);
              player.stop();
              music.setDescription(`Backed to previous song`)
              interaction.reply({embeds: [music], ephemeral: true});
           }
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "back" work above 
       if(interaction.customId === 'rewind')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           let seektime = player.position - 10000;
           if (seektime >= player.queue.current.duration - player.position || seektime < 0) {
           seektime = 0;
          }
          player.seek(Number(seektime));
          music.setDescription(`Rewinded The Song **10s**`)
          interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "rewind" work above  
       if(interaction.customId === 'forward')
       {
         if(!player)
         {
           return interaction.message.delete();
         }/* end of not player */
         if(!player.get('nowplayingMSG') || interaction.message.id != player.get('nowplayingMSG').id)
         {
           return interaction.message.delete();
         }
         if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId === interaction.member.voice.channelId)
         {
           let seektime = Number(player.position) + 10000;
           if (10000 <= 0) seektime = Number(player.position);
           if (Number(seektime) >= player.queue.current.duration) seektime = player.queue.current.duration - 1000;
           player.seek(Number(seektime));
          music.setDescription(`Forwarded The Song **10s**`)
          interaction.reply({embeds: [music], ephemeral: true});
         }
         else {
           interaction.reply({content: `You are not connected to ${interaction.guild.me.voice.channel} to use this buttons.`, ephemeral: true})
         }
       }// "forward" work above
     }

//Below Are The Slash (/) command handler

     if(interaction.isCommand()) {

        const SlashCommands = client.slashCommands.get(interaction.commandName);
        if(!SlashCommands) return;
if (!interaction.guild.me.permissionsIn(interaction.channel).has([Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.USE_EXTERNAL_EMOJIS]))
return interaction.reply({content: `I require the permissions: \`View Channel\`, \`Use external emojis\`.\n\nMake sure to check all the other roles I have for that permission and remember to check channel-specific permissions.
Thank you.`, ephemeral: true});
       
//Premium Work Below

const premrow = new MessageActionRow()
     .addComponents(new MessageButton()
     .setLabel("Premium")
     .setStyle("LINK")
     .setURL("https://discord.gg/CdCfgSC3qy"));

  let uprem = await client.db.get(`uprem_${interaction.user.id}`);
  
  let upremend = await client.db.get(`upremend_${interaction.user.id}`);
//user premiums scopes ^^
  
  let sprem = await client.db.get(`sprem_${interaction.guild.id}`);

  let spremend = await client.db.get(`spremend_${interaction.guild.id}`);
//server premium scopes interaction ^^

  let scot = 0;
  let slink = "https://discord.gg/CdCfgSC3qy";
//Working & Checking Below 

  if(upremend && Date.now() >= upremend) 
  {
    let upremcount = await client.db.get(`upremcount_${interaction.user.id}`) ? await client.db.get(`upremcount_${interaction.user.id}`) : 0;

  let upremserver = await client.db.get(`upremserver_${interaction.user.id}`) ? await client.db.get(`upremserver_${interaction.user.id}`) : [];

  let spremown = await client.db.get(`spremown_${interaction.guild.id}`);
    
   await client.db.delete(`upremcount_${interaction.user.id}`)
    await client.db.delete(`uprem_${interaction.user.id}`)
    await client.db.delete(`upremend_${interaction.user.id}`)
    if(upremserver.length > 0){
      for(let i = 0; i < upremserver.length; i++){
        scot += 1;
        await client.db.delete(`sprem_${upremserver[i]}`)
        await client.db.delete(`spremend_${upremserver[i]}`)
        await client.db.delete(`spremown_${upremserver[i]}`)
      }
    }
   await client.db.delete(`upremserver_${interaction.user.id}`)
    interaction.user.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scot}\`** Servers [Premium](https://discord.gg/CdCfgSC3qy) was removed.\nClick [here](https://discord.gg/CdCfgSC3qy) To Buy [Premium](https://discord.gg/CdCfgSC3qy).`)], components: [premrow]}).catch((err) => { });
  }
//User Prem Check Above ^^^

  if(spremend && Date.now() >= spremend)
  { 
    let scount = 0;
    
    let us = await client.db.get(`spremown_${interaction.guild.id}`);
    
    let upremserver = await client.db.get(`upremserver_${us}`) ? await client.db.get(`upremserver_${us}`) : [];
    
    let upremcount = await client.db.get(`upremcount_${us}`) ? await client.db.get(`upremcount_${us}`) : 0;
    
    let spremown = await client.db.get(`spremown_${interaction.guild.id}`).then(r => client.db.get(`upremend_${r}`));
    
    await client.db.delete(`sprem_${interaction.guild.id}`)
    await client.db.delete(`spremend_${interaction.guild.id}`)
    
    if(spremown && Date.now() > spremown){
      await client.db.delete(`upremcount_${us}`)
      await client.db.delete(`uprem_${us}`)
      await client.db.delete(`upremend_${us}`)
      
      for(let i = 0; i < upremserver.length; i++){
        scount += 1;
        await client.db.delete(`sprem_${upremserver[i]}`)
        await client.db.delete(`spremend_${upremserver[i]}`)
        await client.db.delete(`spremown_${upremserver[i]}`)
      }
    try{
    await client.users.cache.get(`${us}`).send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`Your Premium Has Got Expired.\nTotal **\`${scount}\`** Servers [Premium](https://discord.gg/CdCfgSC3qy) was removed.\nClick [here](https://discord.gg/CdCfgSC3qy) To Buy [Premium](https://discord.gg/CdCfgSC3qy).`)], components: [premrow]}).catch((er) => { })
    }catch(errors) {
      
    }
    }
    await client.db.delete(`upremserver_${us}`)
    await client.db.delete(`spremown_${interaction.guild.id}`)
    interaction.channel.send({embeds: [new MessageEmbed().setColor(`#2F3136`).setDescription(`The Premium Of This Server Has Got Expired.\nClick [here](https://discord.gg/CdCfgSC3qy) To Buy [Premium](https://discord.gg/CdCfgSC3qy).`)], components: [premrow]}).catch((err) => { });
  
  }
//Server Premium Check Above ^^^
       
  if(SlashCommands.premium)
  { let voted = await topgg.hasVoted(interaction.user.id);
    if(!'1044596050859663401'.includes(interaction.user.id) && !voted && !uprem){
    const row = new MessageActionRow()
    .addComponents(new MessageButton()
    .setLabel("Vote Me")
    .setStyle("LINK")
    .setURL("https://top.gg/bot/1044596050859663401/vote"), 
    new MessageButton()
    .setLabel("Premium")
    .setStyle("LINK")
    .setURL("https://discord.gg/CdCfgSC3qy")
			);
      const embed = new MessageEmbed()
      embed.setDescription("You must [vote](https://top.gg/bot/1044596050859663401/vote) me to use this command. If you want to disable this then [click here](https://discord.gg/CdCfgSC3qy) to buy [premium](https://discord.gg/CdCfgSC3qy) to listen interruption free **music**!")
      .setColor("#f6ff00")
    return await interaction.reply({embeds: [embed], components: [row]})
    }
  }
    const err = new MessageEmbed()
      .setColor("#000000")
        const player = interaction.client.manager.get(interaction.guildId);

        if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) { 
          return await interaction.reply({
          embeds: [err.setDescription(`You Must Be **Connected** To A Voice Channel First.`)]
        , ephemeral: true}).catch(() => {}); 
        }

        if (SlashCommands.player && !player) {
          return await interaction.reply({
                embeds: [err.setDescription(`There is nothing Playing!`)]
                , ephemeral: true}).catch(() => {}); 
        }

        if (SlashCommands.sameVoiceChannel && interaction.member.voice.channel !== interaction.guild.me.voice.channel) {
          if(interaction.guild.me.voice.channel)
          {
           return await interaction.reply({
             embeds: [err.setDescription(`You Must Be **Connected** In ${interaction.guild.me.voice.channel} To Use This Command!`)]
                , ephemeral: true}).catch(() => {}); 
          }
        }
      try {
            await SlashCommands.run(client, interaction, prefix);
        } catch (error) {
            if(interaction.replied) {
                await interaction.editReply({
                    content: `An unexcepted error occured.`
                , ephemeral: true}).catch(() => {});
            } else {
                await interaction.followUp({
                    ephemeral: true,
                    content: `An unexcepted error occured.`
                , ephemeral: true}).catch(() => {});
            }
            console.error(error);
        };
    } else return;
        
}