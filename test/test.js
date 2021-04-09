const path = require('path')
const { TYPES } = require("../src/constants");
const { countWordPromise } = require("../src/counter/counter");
const { getWordCount } = require("../src/statistics/statistics");

const WORD_TO_CHECK = 'abc'
const FILE_PATH = path.resolve(__dirname, 'sampleFile.txt')
const URL_PATH = 'http://www.lipsum.com/'

const test = {
    testSimple: async () => {
        const wordCount = await getWordCount(WORD_TO_CHECK)
        countWordPromise(TYPES.STRING, WORD_TO_CHECK).then(() => {
            console.log("simple " + wordCount)
            // process.exit(0)
        })
    },
    testFile: async () => {
        const wordCount = await getWordCount(WORD_TO_CHECK)
        countWordPromise(TYPES.FILE, FILE_PATH).then(() => {
            console.log("file " + wordCount)
            // process.exit(0)
        })
    },
    testUrl: async () => {
        const wordCount = await getWordCount(WORD_TO_CHECK)
        countWordPromise(TYPES.URL, URL_PATH).then(() => {
            console.log("url " + wordCount)
            process.exit(0)
        })
    }
}

test.testSimple()
test.testFile()
test.testUrl()
