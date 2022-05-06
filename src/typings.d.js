const {Collection, Snowflake} = require('discord.js');
// noinspection JSAnnotator,JSUnresolvedVariable
/**
 * @class
 */
class myClient extends Client {
    constructor() {
        /**
         * Tüm komutları içeren bir koleksiyon.
         * @type {Collection<Snowflake, Command>}
         */
        this.commands;
    }
}

/**
 * @callback ExecuteFunction
 * @param {ExecuteFunctionParameters}
 */

/**
 * @typedef ExecuteFunctionParameters
 * @property {myClient} ExecuteFunctionParameters.client - Botun clienti.
 * @property {import('discord.js').Message} ExecuteFunctionParameters.message - Kullanıcı tarafından gönderilen mesaj.
 * @property {string[]} ExecuteFunctionParameters.args - Mesaj içerisinde kullanıcı tarafından gönderilen argümanlar.
 */

/**
 * @typedef Command
 * @type {object}
 * @property {string} name - Komutun adı.
 * @property {ExecuteFunction} execute - Komutun çalıştırılacağı fonksiyon.
 */

module.exports = { myClient, Co };