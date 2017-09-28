const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/users/from/:startDay/to/:finishDay', controller.users);

module.exports = router;