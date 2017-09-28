const users  = require('../database');
const _ = require('lodash');

module.exports = {
  users: (req, res) => {
    const startDay = req.params.startDay;
    const finishDay = req.params.finishDay;
    const startDayTS = new Date(startDay).getTime();
    const finishDayTS = new Date(finishDay).getTime();
    const period = user => user.date >= startDayTS && user.date <= finishDayTS;
    const filteredUsers = _(users).filter(period);
    res.send(filteredUsers);
  }
};
