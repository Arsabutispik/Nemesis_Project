const discord = require("discord.js");
const config = require("./config.json");
const { registerCommands, registerEvents } = require('./utils/registry');
const { log } = require('./utils/utils')

const client = new discord.Client({intents: 32767});

(async () => {
    client.commands = new discord.Collection();

    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');


    try {
        await client.login(config.TOKEN);
        log("SUCCESS", "src/main.js", `${client.user.tag} Olarak giriş yapıldı.`);
    } catch (e) {
        log("ERROR", "src/main.js", `Giriş yaparken hata: ${e.message}`);
    }

    log("SUCCESS", "src/main.js","Bot başarıyla başlatıldı.");
})();