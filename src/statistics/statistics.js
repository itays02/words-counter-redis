const { getValueAsync } = require("../redisClient");

const getWordCount = async (word) => {
    if (!word || typeof word !== 'string' || !word.length) {
        return 0;
    }
    return (await getValueAsync(word) || 0)
}

module.exports = {
    getWordCount
}
