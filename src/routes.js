const express = require('express');
const router = express.Router();

router.use('/api', require('./v1/routes'));

module.exports = router;
