const express = require("express");
const { getWordCount } = require("./statistics");

const router = express.Router();

router.get('/', async (req, res) => {
    const { word } = req.query
    const count = await getWordCount(word)
    res.send({ word, count })
});

module.exports = router;
