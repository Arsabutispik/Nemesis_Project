const { Util } = require("discord.js")
const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z\d+&@#\/%?=~_|!:,.;]*[-A-Z\d+&@#\/%=~_|])/ig
module.exports = {
    "name": "emoji",
    /**
     *
     * @param client {myClient}
     * @param message {import("discord.js").Message}
     * @param args {string[]}
     * @returns {*}
     */
    execute({client, message, args}) {
        if(!message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) return message.reply("Bunu yapmak için gerekli izinlere sahip değilsin!")
        if(!args[0] && !message.attachments.first()) return message.reply("Emoji, url veya fotoğraf girmelisin!")
        if(message.attachments.first()){
            message.guild.emojis.create(message.attachments.first().url, args[0])
                .then(emoji => message.reply(`Emoji oluşturuldu: ${emoji}`))
                .catch(err => message.reply(`Emoji oluşturulamadı: ${err}`))
        } else if(urlRegex.test(args[0])){
            console.log(args[0])
            const name = args.slice(1).join(" ")
            if(!name) return  message.reply("Emoji ismi girmelisin!")
            message.guild.emojis.create(args[0], name)
                .then(emoji => message.reply(`Emoji oluşturuldu: ${emoji}`))
                .catch(err => message.reply(`Emoji oluşturulamadı: ${err}`))
        } else {
            const emoji = Util.parseEmoji(args[0])
            if(!emoji.id) return message.reply("Emoji girmelisin!")
            const name = args.slice(1).join(" ")
            if(!name) return  message.reply("Emoji ismi girmelisin!")
            let emojiUrl;
            if(emoji.animated){
                emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.gif`
            } else {
                emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.png`
            }
            message.guild.emojis.create(emojiUrl, name)
                .then(emoji => message.reply(`Emoji oluşturuldu: ${emoji}`))
                .catch(err => message.reply(`Emoji oluşturulamadı: ${err}`))
        }
    }
}