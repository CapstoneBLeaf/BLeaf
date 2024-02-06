const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/goals', require('./goals'));

router.use('/habits', require('./habits'));

router.use('/journals', require('./journals'));

router.use('/plants', require('./plants'));

router.use('/users', require('./users'));


module.exports = router;