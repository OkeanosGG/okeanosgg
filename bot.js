const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('guildBanAdd' , (guild, user) => {
  let hosgeldingörüşürüz = guild.channels.find('name', 'hosgeldin-görüşürüz');
  if (!hosgeldingörüşürüz) return;
  hosgeldingörüşürüz.send('https://media.giphy.com/media/8njotXALXXNrW/giphy.gif **Adalet dağıtma zamanı gelmiş!** '+ user.username +'**Bakıyorum da suç işlemiş,Yargı dağıtmaya devam** :fist: :writing_hand:  :spy:' );
});

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on("message", message => {
    const dmchannel = client.channels.find("name", "dm-log");
    if (message.channel.type === "dm") {
        if (message.author.bot) return;
        dmchannel.sendMessage("", {embed: {
            color: 3447003,
            title: `Gönderen: ${message.author.tag}`,
            description: `Bota Özelden Gönderilen DM: ${message.content}`
        }})
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.channel.sendMessage('Aleyküm Selam Güzel Kardeşim!');
  }
  if (msg.content.toLowerCase() === 'selam') {
    msg.channel.sendMessage('Aleyküm Selam Bro!');
  }
  if (msg.content.toLowerCase() === 'emir') {
    msg.channel.sendMessage('**Başarılarını gizlemek, en büyük başarıdır.** ```-Emir```https://gph.is/g/Zxd0V6Z');
  }
  if (msg.content.toLowerCase() === 'whitemocha') {
    msg.channel.sendMessage('**Afiyet Olsun!** https://gph.is/g/Zy52neZ');
  }
  if (msg.content.toLowerCase() === 'soğuksuiç') {
    msg.channel.sendMessage('**Afiyet Olsun!** https://gph.is/g/EGk9PlE');
  }
  if (msg.content.toLowerCase() === 'highliôre') {
    msg.channel.sendMessage('**Medeniyet, insan olmak ile alakalıdır. Öldürmek ise insani bir dürtü** ```-Highliôre``` https://gph.is/g/E1Redqa');
  }
if (!msg.content.startsWith(prefix)) {
 return;
}
if (msg.content.toLowerCase() === prefix + 'nasılsın' ) { msg.channel.sendMessage('https://giphy.com/gifs/2YekIxL017LaJ9zbVX')
}
if (msg.content.toLowerCase() === prefix + 'çayiç' ) { msg.channel.sendMessage('https://gph.is/g/aR957OE')
}
if (msg.content.toLowerCase() === prefix + 'benimleevlenirmisineren' ) { msg.channel.sendMessage('https://gph.is/g/ajbGQpa')
}

});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    
    let args = message.content.split(" ").slice(1);
      
  
   if (command === "duyuru") {
       if (message.member.hasPermission("ADMINISTRATOR")) {
           const color = args[0]
           const text = args.slice(1).join(" ");
           if (text.length < 1) return message.channel.send("?duyuru #kanal Deneme");
 //const colour = args.slice(2).join("");
           const embed = new Discord.RichEmbed()
           .setColor("0x" + color)
           .setTitle("DUYURU")
           .setDescription(text);
           message.channel.send("@everyone")
           message.channel.send({embed})
       }
   };
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.BOT_TOKEN);
