//@ts-check

const fs = require('fs/promises');
const path = require('path');
const { log } = require('./utils.js');

/**
 *
 * @param {import("../typings.d").myClient} client
 * @param  {...string} dirs
 */
async function registerCommands(client, ...dirs) {
    for (const dir of dirs) {
        let files = await fs.readdir(path.join(__dirname, dir));
        // Loop through each file.
        for(let file of files) {
            let stat = await fs.lstat(path.join(__dirname, dir, file));
            if(stat.isDirectory()) // If file is a directory, recursive call recurDir
                await registerCommands(client, path.join(dir, file));
            else {
                // Check if file is a .js file.
                if(file.endsWith(".js")) {
                    try {
                        /**
                         * @type {Command}
                         */
                        let cmdModule = require(path.join(__dirname, dir, file));
                        let { name, execute } = cmdModule;

                        if (!name) {
                            log("WARNING", "src/registry.js", `The command '${path.join(__dirname, dir, file)}' doesn't have a name`);
                            continue;
                        }

                        if (!execute) {
                            log("WARNING", "src/registry.js", `The command '${name}' doesn't have an execute function`);
                            continue;
                        }

                        if (client.commands.has(name)) {
                            log("WARNING", "src/registry.js", `The command name '${name}' has already been added.`);
                            continue;
                        }

                        // noinspection JSCheckFunctionSignatures
                        await client.commands.set(name, cmdModule);

                    } catch (e) {
                        log("ERROR", "src/registry.js", `Error loading commands: ${e.message}`);
                    }
                }
            }
        }
    }
}

/**
 *
 * @param {import('../typings.d').myClient} client
 * @param {...string} dirs
 */
async function registerEvents(client, ...dirs) {
    for (const dir of dirs) {
        let files = await fs.readdir(path.join(__dirname, dir));
        // Loop through each file.
        for(let file of files) {
            let stat = await fs.lstat(path.join(__dirname, dir, file));
            if(stat.isDirectory()) // If file is a directory, recursive call recurDir
                await registerEvents(client, path.join(dir, file));
            else {
                // Check if file is a .js file.
                if(file.endsWith(".js")) {
                    let eventName = file.substring(0, file.indexOf(".js"));
                    try {
                        let eventModule = require(path.join(__dirname, dir, file));
                        client.on(eventName, eventModule.bind(null, client));
                    } catch(e) {
                        log("ERROR", "src/registry.js", `Error loading events: ${e.message}`);
                    }
                }
            }
        }
    }
}

module.exports = {
    registerEvents,
    registerCommands
};