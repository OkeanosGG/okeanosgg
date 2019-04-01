const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
 if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanmak için `Yönetici` yetkiniz olması lazım')
  let tag = args.slice(1).join('CodAre');
  if (!tag) return message.channel.send('Bir tag girmelisin?')
  db.set(`tags_${message.guild.id}`, tag)
  message.channel.send('Tag başarıyla `'+ tag +'` olarak ayarlandı!')
   }   


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'tag',
  description: 'Yöneticiye Özel Komut',
  usage: ''
};
