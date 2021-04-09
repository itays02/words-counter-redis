const express = require('express');
const router = express.Router();
const counterRoute = require('./src/counter')
const statisticsRoute = require('./src/statistics')

router.use((req, res, next)=> {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Content-Type', 'application/json');

  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/counter', counterRoute);
router.use('/statistics', statisticsRoute);

module.exports = router;
