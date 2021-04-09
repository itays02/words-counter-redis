const express = require("express");
const { countWords } = require("./counter");

const router = express.Router();

router.post('/', (req, res) => {
    const { type, param } = req.body
    const response = countWords(type, param)
    if(!response){
        res.status(500).send('Error in counting words')
    } else{
        res.sendStatus(200)
    }
});

module.exports = router;
