const Discord = require('discord.js');

exports.run = (client, message) => {
      const random = Math.floor(Math.random() * 1000) + 1
      message.channel.send(`Sağlam Bir Yumruk Uuu.. **${random}** Yavaş Ol  Makine Kırılacak! 🥊 `)
   } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
}

exports.help = {
 name: 'boksmakinesi',
 description: 'Bok Makinesi ',
 usage: 'boksmakinesi'
};
