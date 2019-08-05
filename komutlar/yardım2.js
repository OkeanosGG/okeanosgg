const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» Komut Grupları')
.setTimestamp()
.addField('» Eğlence Komutları', '?eğlence')
.addField('» Moderatör Komutları', '?moderatör')
.addField('» Genel Komutlar', '?genel')
.addField('» Ekstra Komutlar', '?ekstra')
.addField('» Nsfw Komutları', '?nsfw')
.setFooter('© 2019 Okeanos', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım2',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım2'
};
