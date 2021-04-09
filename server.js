const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./index');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', indexRouter);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
