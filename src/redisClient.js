const redis = require("redis");
const { promisify } = require('util');

const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on("error", error => {
    console.error(error);
});

const getValueAsync = async (key) => {
    let value
    try {
        value = await getAsync(key)
    } catch (err) {
        console.log('error in getting redis value', err)
    }
    return value
}

const setValueAsync = async (key, value) => {
    try {
        const oldValue = await getAsync(key) || '0'
        await setAsync(key, parseInt(oldValue) + value)
    } catch (err) {
        console.log('error in setting redis key', err)
    }
}

module.exports = {
    getValueAsync,
    setValueAsync
}
