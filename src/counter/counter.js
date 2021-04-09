const fs = require('fs');
const http = require('http');

const { MAX_CHUNK_BYTES, TYPES } = require("../constants");
const { setValueAsync } = require("../redisClient");
const { removeSpecialChars } = require("../utils");

let wordsCounter = {}

const addToWordsMap = word => {
    const cleanWord = removeSpecialChars(word)
    wordsCounter[cleanWord] = (wordsCounter[cleanWord] || 0) + 1
}

const saveWordsCount = async () => {
    const updateWordsPromises = []
    for (let [word, count] of Object.entries(wordsCounter)) {
        updateWordsPromises.push(setValueAsync(word, count))
    }
    return Promise.all(updateWordsPromises)
}

const processChunks = (stream) => new Promise(resolve => {
    const chunksPromises = []
    let offsetWord = ''
    stream.on('data', chunk => {
        chunk = chunk.toString().replace(/[\n]/g, " ")
        const lastEmptyCharIndex = chunk.lastIndexOf(' ')
        const countSimplePromise = countSimple(offsetWord.concat(chunk.substring(0, lastEmptyCharIndex)))
        chunksPromises.push(countSimplePromise)
        offsetWord = chunk.substring(lastEmptyCharIndex)
    }).on('end', async () => {
        chunksPromises.push(countSimple(offsetWord))
        await Promise.all(chunksPromises)
        resolve()
    }).on('error', () => {
        console.error('error in getting stream chunk')
    });
})

const countSimple = async simpleString => {
    const words = simpleString.trim().split(' ')
    words.forEach(word => addToWordsMap(word))
}

const countByFile = async (filePath) => {
    const readStream = fs.createReadStream(filePath, { highWaterMark: MAX_CHUNK_BYTES, encoding: 'utf8' });
    await processChunks(readStream)
}

const countByUrl = async (url) => new Promise(resolve =>
    http.get(url, async readStream => {
        await processChunks(readStream)
        resolve()
    })
)

const countWordPromise = async (type, param) => {
    switch (type) {
        case(TYPES.STRING): {
            await countSimple(param)
            break
        }
        case(TYPES.FILE): {
            await countByFile(param)
            break
        }
        case(TYPES.URL): {
            await countByUrl(param)
            break
        }
    }

    await saveWordsCount()
    wordsCounter = {}
}

const countWords = (type, param) => {
    if (!param || typeof param !== 'string' || !param.length) {
        console.error(`param is not in format`)
        return
    }
    if(type !== TYPES.STRING && type !== TYPES.FILE && type !== TYPES.URL){
        console.error(`type ${type} is not exists`)
        return
    }

    countWordPromise(type, param)
    return true
}

module.exports = {
    countWordPromise,
    countWords
}
