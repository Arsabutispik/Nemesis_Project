//@ts-check

const { log } = require("../utils/utils.js");
const config = require("../config.json");
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * message event
 * @param {import('../typings.d').myClient} client
 * @param {import('discord.js').Message} message
 */
module.exports = async (client, message) => {
    try {
        if (message.author.bot || message.channel.type !== 'GUILD_TEXT' || message.webhookId) return;

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(config.PREFIX)})\\s*`);
        if (!prefixRegex.test(message.content)) return;

        const [, matchedPrefix] = message.content.match(prefixRegex);
        let msgargs = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        let cmdName = msgargs.shift().toLowerCase();

        if (message.mentions.has(client.user) && !cmdName) {
            await message.reply(`Beni prefixim (\`${config.PREFIX}\`) ile veya <@${client.user.id}> ile kullanabilirsin.`);
            return;
        }

        const command = client.commands.get(cmdName)
        if (!command) return;
        command.execute({ client: client, message: message, args: msgargs });
    } catch (e) {
        log("ERROR", "src/eventHandlers/message.js", e.message)
    }
};