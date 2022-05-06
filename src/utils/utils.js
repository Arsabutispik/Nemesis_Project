const consoleColors = {
    "SUCCESS": "\u001b[32m",
    "WARNING": "\u001b[33m",
    "ERROR": "\u001b[31m"
};

/**
 * console.log kısalmak için bir fonksiyon
 * @param {('SUCCESS'|'WARNING'|'ERROR')} type - Girdinin türü (SUCCESS, WARNING, ERROR)
 * @param {string} path - Girdinin yolu
 * @param {string} text - Girdinin metni
 */
function log(type, path, text) {
    console.log(`\u001b[36;1m<bot-prefab>\u001b[0m\u001b[34m [${path}]\u001b[0m - ${consoleColors[type]}${text}\u001b[0m`);
}

module.exports = { log };