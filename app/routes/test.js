const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile('test.html', {root: './public'});
});

module.exports = router;